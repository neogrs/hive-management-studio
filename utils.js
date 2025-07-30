/**
 * Modern utility functions for the Alliance Hive Builder
 */

/**
 * Calculate optimal hexagon size based on player count
 * @param {number} playerCount - Number of players in the alliance
 * @returns {Object} Object containing hexSize and spacing
 */
const calculateOptimalHexSize = (playerCount) => {
  if (!playerCount || playerCount < 0) {
    throw new Error('Player count must be a positive number');
  }

  const { HEX_SCALING } = window.ALLIANCE_CONFIG;

  if (playerCount <= 1) return { ...HEX_SCALING[1] };
  if (playerCount <= 7) return { ...HEX_SCALING[7] };
  if (playerCount <= 19) return { ...HEX_SCALING[19] };
  if (playerCount <= 37) return { ...HEX_SCALING[37] };
  if (playerCount <= 61) return { ...HEX_SCALING[61] };
  if (playerCount <= 91) return { ...HEX_SCALING[91] };
  return { ...HEX_SCALING.default };
};

/**
 * Generate hexagonal positions in a grid pattern
 * @param {number} count - Number of positions to generate
 * @param {Object} config - Canvas configuration
 * @returns {Array} Array of position objects with x, y coordinates
 */
const generateHexPositions = (count, config = window.ALLIANCE_CONFIG.CANVAS) => {
  if (!count || count < 0) {
    throw new Error('Count must be a positive number');
  }

  if (count === 0) return [];

  // Use grid-based positioning like in the working version
  const hexRadius = 80; // Base hexagon radius
  const padding = 5;  // Controls space between hexagons
  const rowHeight = hexRadius * Math.sqrt(3);
  const canvasWidth = config.width || 800;
  const canvasHeight = config.height || 600;

  const colsPerRow = Math.floor((canvasWidth - hexRadius) / (hexRadius * 2 + padding));

  return Array.from({ length: count }, (_, index) => {
    const col = index % colsPerRow;
    const row = Math.floor(index / colsPerRow);
    const x = hexRadius + col * (hexRadius * 2 + padding); // Safe distance from left
    const y = hexRadius + row * (rowHeight + padding);
    return { x, y };
  });
};

/**
 * Create SVG path for a hexagon
 * @param {number} size - Size of the hexagon
 * @returns {string} SVG path string
 */
const createHexPath = (size) => {
  if (!size || size <= 0) {
    throw new Error('Size must be a positive number');
  }

  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 - 90) * (Math.PI / 180);
    const x = size * Math.cos(angle);
    const y = size * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return `M ${points.join(' L ')} Z`;
};

/**
 * Validate player data
 * @param {Object} player - Player object to validate
 * @returns {Object} Validation result with isValid boolean and errors object
 */
const validatePlayer = (player) => {
  const errors = {};
  const { VALIDATION } = window.ALLIANCE_CONFIG;

  // Name validation
  if (!player.name || player.name.trim() === '') {
    errors.name = 'Name is required';
  } else if (player.name.length < VALIDATION.name.minLength || player.name.length > VALIDATION.name.maxLength) {
    errors.name = `Name must be between ${VALIDATION.name.minLength} and ${VALIDATION.name.maxLength} characters`;
  }

  // HQ Level validation
  const hqLevel = parseInt(player.hqLevel);
  if (isNaN(hqLevel) || hqLevel < VALIDATION.hqLevel.min || hqLevel > VALIDATION.hqLevel.max) {
    errors.hqLevel = `HQ level must be between ${VALIDATION.hqLevel.min} and ${VALIDATION.hqLevel.max}`;
  }

  // Role validation
  if (!player.role || !window.ALLIANCE_CONFIG.ROLES[player.role]) {
    errors.role = 'Valid role is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Generate a unique ID for new players
 * @param {Array} players - Existing players array
 * @returns {number} New unique ID
 */
const generateUniqueId = (players) => {
  if (!Array.isArray(players)) {
    throw new Error('Players must be an array');
  }

  const existingIds = players.map(p => p.id).filter(id => id != null);
  return existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
};

/**
 * Calculate distance between two points
 * @param {Object} point1 - First point with x, y coordinates
 * @param {Object} point2 - Second point with x, y coordinates
 * @returns {number} Distance between points
 */
const calculateDistance = (point1, point2) => {
  if (!point1 || !point2 || typeof point1.x !== 'number' || typeof point1.y !== 'number' ||
    typeof point2.x !== 'number' || typeof point2.y !== 'number') {
    throw new Error('Both points must have valid x and y coordinates');
  }

  return Math.sqrt(
    Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
  );
};

/**
 * Format player name for display
 * @param {string} name - Player name
 * @param {number} maxLength - Maximum length for display
 * @returns {string} Formatted name
 */
const formatPlayerName = (name, maxLength = 12) => {
  if (!name || typeof name !== 'string') {
    return 'Unknown Player';
  }

  if (name.length <= maxLength) {
    return name;
  }

  return name.substring(0, maxLength - 3) + '...';
};

/**
 * Get role configuration
 * @param {string} role - Role key
 * @returns {Object} Role configuration object
 */
const getRoleConfig = (role) => {
  const roles = window.ALLIANCE_CONFIG.ROLES;

  if (!role || !roles[role]) {
    console.warn(`Invalid role: ${role}, defaulting to member`);
    return roles.member;
  }

  return roles[role];
};

/**
 * Deep clone an object
 * @param {any} obj - Object to clone
 * @returns {any} Cloned object
 */
const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }

  if (typeof obj === 'object') {
    const cloned = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }

  return obj;
};

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Make available globally
window.calculateOptimalHexSize = calculateOptimalHexSize;
window.generateHexPositions = generateHexPositions;
window.createHexPath = createHexPath;
window.validatePlayer = validatePlayer;
window.generateUniqueId = generateUniqueId;
window.calculateDistance = calculateDistance;
window.formatPlayerName = formatPlayerName;
window.getRoleConfig = getRoleConfig;
window.deepClone = deepClone;
window.debounce = debounce;
window.throttle = throttle; 
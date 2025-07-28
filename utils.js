/**
 * Utility functions for the Alliance Hive Builder
 */

/**
 * Calculate optimal hexagon size based on player count
 * @param {number} playerCount - Number of players in the alliance
 * @returns {Object} Object containing hexSize and spacing
 */
const calculateOptimalHexSize = (playerCount) => {
  const { HEX_SCALING } = window.ALLIANCE_CONFIG;

  if (playerCount <= 1) return HEX_SCALING[1];
  if (playerCount <= 7) return HEX_SCALING[7];
  if (playerCount <= 19) return HEX_SCALING[19];
  if (playerCount <= 37) return HEX_SCALING[37];
  if (playerCount <= 61) return HEX_SCALING[61];
  if (playerCount <= 91) return HEX_SCALING[91];
  return HEX_SCALING.default;
};

/**
 * Generate hexagonal positions in a spiral pattern
 * @param {number} count - Number of positions to generate
 * @param {Object} config - Canvas configuration
 * @returns {Array} Array of position objects with x, y coordinates
 */
const generateHexPositions = (count, config = window.ALLIANCE_CONFIG.CANVAS) => {
  if (count === 0) return [];
  if (count === 1) return [{ x: config.centerX, y: config.centerY }];

  const positions = [{ x: config.centerX, y: config.centerY }];
  let ring = 1;
  let currentIndex = 1;

  const gridSize = Math.min(config.centerX, config.centerY) * 0.6;
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    positions.push({
      x: config.centerX + (col - cols / 3) * gridSize,
      y: config.centerY + (row - rows / 2) * gridSize
    });
  }

  return positions;
};

/**
 * Create SVG path for a hexagon
 * @param {number} size - Size of the hexagon
 * @returns {string} SVG path string
 */
const createHexPath = (size) => {
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
 * @returns {Object} Validation result with isValid and errors
 */
const validatePlayer = (player) => {
  const { VALIDATION } = window.ALLIANCE_CONFIG;
  const errors = {};

  // Validate name
  if (VALIDATION.name.required && (!player.name || player.name.trim() === '')) {
    errors.name = 'Name is required';
  } else if (player.name && player.name.length > VALIDATION.name.maxLength) {
    errors.name = `Name must be ${VALIDATION.name.maxLength} characters or less`;
  }

  // Validate HQ level
  const hqLevel = parseInt(player.hqLevel);
  if (VALIDATION.hqLevel.required && (!hqLevel || isNaN(hqLevel))) {
    errors.hqLevel = 'HQ level is required';
  } else if (hqLevel < VALIDATION.hqLevel.min || hqLevel > VALIDATION.hqLevel.max) {
    errors.hqLevel = `HQ level must be between ${VALIDATION.hqLevel.min} and ${VALIDATION.hqLevel.max}`;
  }

  // Validate role
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
  return Math.max(...players.map(p => p.id), 0) + 1;
};

/**
 * Calculate distance between two points
 * @param {Object} point1 - First point with x, y coordinates
 * @param {Object} point2 - Second point with x, y coordinates
 * @returns {number} Distance between points
 */
const calculateDistance = (point1, point2) => {
  return Math.sqrt(
    Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
  );
};

/**
 * Format player name for display (truncate if too long)
 * @param {string} name - Player name
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Formatted name
 */
const formatPlayerName = (name, maxLength = 12) => {
  return name.length > maxLength ? name.substring(0, maxLength) + '...' : name;
};

/**
 * Get role configuration by role key
 * @param {string} role - Role key (leader, officer, member)
 * @returns {Object} Role configuration object
 */
const getRoleConfig = (role) => {
  return window.ALLIANCE_CONFIG.ROLES[role] || window.ALLIANCE_CONFIG.ROLES.member;
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
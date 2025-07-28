// Configuration constants for the Alliance Hive Builder
const ALLIANCE_CONFIG = {
  // Role definitions with their visual properties
  ROLES: {
    leader: {
      name: 'Leader',
      bg: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      border: 'border-yellow-500',
      icon: '👑',
      color: '#f59e0b'
    },
    officer: {
      name: 'Officer',
      bg: 'bg-gradient-to-r from-purple-500 to-indigo-600',
      border: 'border-purple-500',
      icon: '🛡️',
      color: '#8b5cf6'
    },
    member: {
      name: 'Member',
      bg: 'bg-gradient-to-r from-blue-500 to-cyan-600',
      border: 'border-blue-500',
      icon: '⚔️',
      color: '#06b6d4'
    }
  },

  // Hexagon scaling configuration
  HEX_SCALING: {
    1: { hexSize: 80, spacing: 1.8 },
    7: { hexSize: 70, spacing: 1.6 },
    19: { hexSize: 60, spacing: 1.5 },
    37: { hexSize: 50, spacing: 1.4 },
    61: { hexSize: 40, spacing: 1.3 },
    91: { hexSize: 35, spacing: 1.25 },
    default: { hexSize: 30, spacing: 1.2 }
  },

  // Canvas configuration
  CANVAS: {
    width: 800,
    height: 600,
    centerX: 400,
    centerY: 300
  },

  // Validation rules
  VALIDATION: {
    name: {
      minLength: 1,
      maxLength: 50,
      required: true
    },
    hqLevel: {
      min: 1,
      max: 30,
      required: true
    }
  },

  // Default player data
  DEFAULT_PLAYER: {
    name: '',
    hqLevel: 1,
    role: 'member'
  },

  // Sample data for development
  SAMPLE_PLAYERS: [
    { id: 1, name: "Commander Alpha", hqLevel: 25, role: "leader" },
    { id: 2, name: "Beta Warrior", hqLevel: 22, role: "officer" },
    { id: 3, name: "Gamma Scout", hqLevel: 18, role: "member" },
    { id: 4, name: "Delta Support", hqLevel: 20, role: "member" },
    { id: 5, name: "Echo Sniper", hqLevel: 16, role: "member" }
  ]
};

// Icon components
const ICONS = {
  Plus: ({ className }) => React.createElement('span', { className }, '➕'),
  Users: ({ className }) => React.createElement('span', { className }, '👥'),
  Crown: ({ className }) => React.createElement('span', { className }, '👑'),
  Shield: ({ className }) => React.createElement('span', { className }, '🛡️'),
  Sword: ({ className }) => React.createElement('span', { className }, '⚔️'),
  Trash2: ({ className }) => React.createElement('span', { className }, '🗑️'),
  Edit3: ({ className }) => React.createElement('span', { className }, '✏️'),
  Save: ({ className }) => React.createElement('span', { className }, '💾'),
  X: ({ className }) => React.createElement('span', { className }, '❌')
};

// Make available globally
window.ALLIANCE_CONFIG = ALLIANCE_CONFIG;
window.ICONS = ICONS; 
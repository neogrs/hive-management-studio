/**
 * Modern configuration constants for the Alliance Hive Builder
 */

// Main configuration object
const ALLIANCE_CONFIG = {
  // Role definitions with their visual properties
  ROLES: {
    leader: {
      name: 'Leader',
      bg: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      border: 'border-yellow-500',
      icon: '👑',
      color: '#f59e0b',
      description: 'Alliance leader with full permissions'
    },
    officer: {
      name: 'Officer',
      bg: 'bg-gradient-to-r from-purple-500 to-indigo-600',
      border: 'border-purple-500',
      icon: '🛡️',
      color: '#8b5cf6',
      description: 'Alliance officer with management permissions'
    },
    member: {
      name: 'Member',
      bg: 'bg-gradient-to-r from-blue-500 to-cyan-600',
      border: 'border-blue-500',
      icon: '⚔️',
      color: '#06b6d4',
      description: 'Regular alliance member'
    }
  },

  // Hexagon scaling configuration with performance optimizations
  HEX_SCALING: {
    1: { hexSize: 80, spacing: 1.8, maxPlayers: 1 },
    7: { hexSize: 70, spacing: 1.6, maxPlayers: 7 },
    19: { hexSize: 60, spacing: 1.5, maxPlayers: 19 },
    37: { hexSize: 50, spacing: 1.4, maxPlayers: 37 },
    61: { hexSize: 40, spacing: 1.3, maxPlayers: 61 },
    91: { hexSize: 35, spacing: 1.25, maxPlayers: 91 },
    default: { hexSize: 30, spacing: 1.2, maxPlayers: Infinity }
  },

  // Canvas configuration with responsive design
  CANVAS: {
    width: 1200,
    height: 600,
    centerX: 600,
    centerY: 300,
    minWidth: 800,
    minHeight: 400,
    aspectRatio: 2 / 1
  },

  // 3 Dots Menu Button Configuration
  MENU_BUTTON: {
    // Working version uses fixed offsets
    offsetX: -13,  // Same as working version
    offsetY: 77,   // Same as working version
    // Button appearance
    size: 28,
    fontSize: '14px',
    borderRadius: '50%'
  },

  // Enhanced validation rules with better error messages
  VALIDATION: {
    name: {
      minLength: 1,
      maxLength: 50,
      required: true,
      pattern: /^[a-zA-Z0-9\s\-_]+$/,
      message: 'Name must be 1-50 characters, alphanumeric only'
    },
    hqLevel: {
      min: 1,
      max: 30,
      required: true,
      message: 'HQ level must be between 1 and 30'
    },
    role: {
      required: true,
      allowedValues: ['leader', 'officer', 'member'],
      message: 'Please select a valid role'
    }
  },

  // Default player data with validation
  DEFAULT_PLAYER: {
    name: '',
    hqLevel: 1,
    role: 'member',
    joinDate: null,
    lastActive: null
  },

  // Sample data for development and testing
  SAMPLE_PLAYERS: [
    {
      id: 1,
      name: "Commander Alpha",
      hqLevel: 25,
      role: "leader",
      joinDate: new Date('2024-01-15'),
      lastActive: new Date()
    },
    {
      id: 2,
      name: "Beta Warrior",
      hqLevel: 22,
      role: "officer",
      joinDate: new Date('2024-01-20'),
      lastActive: new Date()
    },
    {
      id: 3,
      name: "Gamma Scout",
      hqLevel: 18,
      role: "member",
      joinDate: new Date('2024-02-01'),
      lastActive: new Date()
    },
    {
      id: 4,
      name: "Delta Support",
      hqLevel: 20,
      role: "member",
      joinDate: new Date('2024-02-10'),
      lastActive: new Date()
    },
    {
      id: 5,
      name: "Echo Sniper",
      hqLevel: 16,
      role: "member",
      joinDate: new Date('2024-02-15'),
      lastActive: new Date()
    }
  ],

  // Performance settings
  PERFORMANCE: {
    debounceDelay: 300,
    throttleDelay: 100,
    maxRenderPlayers: 100,
    connectionLineThreshold: 1.1,
    animationDuration: 200
  },

  // UI settings
  UI: {
    theme: {
      primary: '#f97316',
      secondary: '#06b6d4',
      accent: '#8b5cf6',
      background: '#111827',
      surface: '#1f2937',
      text: '#ffffff',
      textSecondary: '#9ca3af'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem'
    }
  },

  // Feature flags for progressive enhancement
  FEATURES: {
    animations: true,
    dragAndDrop: false,
    realTimeUpdates: false,
    exportData: true,
    importData: false,
    analytics: false
  }
};

// Enhanced icon components with better accessibility
const ICONS = {
  Plus: ({ className, ...props }) => React.createElement('span', {
    className,
    role: 'img',
    'aria-label': 'Add',
    ...props
  }, '➕'),

  Users: ({ className, ...props }) => React.createElement('span', {
    className,
    role: 'img',
    'aria-label': 'Users',
    ...props
  }, '👥'),

  Crown: ({ className, ...props }) => React.createElement('span', {
    className,
    role: 'img',
    'aria-label': 'Leader',
    ...props
  }, '👑'),

  Shield: ({ className, ...props }) => React.createElement('span', {
    className,
    role: 'img',
    'aria-label': 'Officer',
    ...props
  }, '🛡️'),

  Sword: ({ className, ...props }) => React.createElement('span', {
    className,
    role: 'img',
    'aria-label': 'Member',
    ...props
  }, '⚔️'),

  Trash2: ({ className, ...props }) => React.createElement('span', {
    className,
    role: 'img',
    'aria-label': 'Delete',
    ...props
  }, '🗑️'),

  Edit3: ({ className, ...props }) => React.createElement('span', {
    className,
    role: 'img',
    'aria-label': 'Edit',
    ...props
  }, '✏️'),

  Save: ({ className, ...props }) => React.createElement('span', {
    className,
    role: 'img',
    'aria-label': 'Save',
    ...props
  }, '💾'),

  X: ({ className, ...props }) => React.createElement('span', {
    className,
    role: 'img',
    'aria-label': 'Close',
    ...props
  }, '❌'),

  Settings: ({ className, ...props }) => React.createElement('span', {
    className,
    role: 'img',
    'aria-label': 'Settings',
    ...props
  }, '⚙️'),

  Export: ({ className, ...props }) => React.createElement('span', {
    className,
    role: 'img',
    'aria-label': 'Export',
    ...props
  }, '📤'),

  Import: ({ className, ...props }) => React.createElement('span', {
    className,
    role: 'img',
    'aria-label': 'Import',
    ...props
  }, '📥'),

  Analytics: ({ className, ...props }) => React.createElement('span', {
    className,
    role: 'img',
    'aria-label': 'Analytics',
    ...props
  }, '📊'),

  Game: ({ className, ...props }) => React.createElement('span', {
    className,
    role: 'img',
    'aria-label': 'Game',
    ...props
  }, '🎮')
};

// Error messages for better user experience
const ERROR_MESSAGES = {
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_FORMAT: 'Invalid format',
    TOO_SHORT: 'Too short',
    TOO_LONG: 'Too long',
    INVALID_RANGE: 'Value out of range',
    INVALID_ROLE: 'Invalid role selected'
  },
  NETWORK: {
    FETCH_FAILED: 'Failed to fetch data',
    SAVE_FAILED: 'Failed to save changes',
    DELETE_FAILED: 'Failed to delete item',
    CONNECTION_LOST: 'Connection lost'
  },
  GENERAL: {
    UNEXPECTED_ERROR: 'An unexpected error occurred',
    PERMISSION_DENIED: 'Permission denied',
    NOT_FOUND: 'Item not found'
  }
};

// Success messages for user feedback
const SUCCESS_MESSAGES = {
  PLAYER_ADDED: 'Player added successfully',
  PLAYER_UPDATED: 'Player updated successfully',
  PLAYER_DELETED: 'Player deleted successfully',
  DATA_EXPORTED: 'Data exported successfully',
  SETTINGS_SAVED: 'Settings saved successfully'
};

// Make available globally
window.ALLIANCE_CONFIG = ALLIANCE_CONFIG;
window.ICONS = ICONS;
window.ERROR_MESSAGES = ERROR_MESSAGES;
window.SUCCESS_MESSAGES = SUCCESS_MESSAGES; 
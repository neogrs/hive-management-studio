const { Plus, Save, X } = window.ICONS;

/**
 * Modal component for adding/editing players
 */
const PlayerModal = ({
  isOpen,
  mode, // 'add' or 'edit'
  player,
  onSave,
  onCancel,
  onChange
}) => {
  if (!isOpen) return null;

  const validation = window.validatePlayer(player);
  const title = mode === 'add' ? 'Add New Alliance Member' : 'Edit Player';
  const buttonText = mode === 'add' ? 'Add Player' : 'Save Changes';

  const handleSave = () => {
    if (validation.isValid) {
      onSave(player);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-red-500/30 rounded-xl p-6 w-full max-w-md modal-content">
        <h3 className="text-xl font-bold mb-4 text-orange-400">{title}</h3>

        <div className="space-y-4">
          {/* Player Name Field */}
          <div>
            <label className="block text-sm font-medium mb-2">Player Name</label>
            <input
              type="text"
              value={player.name}
              onChange={(e) => onChange({ ...player, name: e.target.value })}
              className={`w-full px-4 py-2 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${validation.errors.name ? 'border-red-500' : 'border-gray-600'
                }`}
              placeholder="Enter player name"
            />
            {validation.errors.name && (
              <p className="text-red-400 text-sm mt-1">{validation.errors.name}</p>
            )}
          </div>

          {/* HQ Level Field */}
          <div>
            <label className="block text-sm font-medium mb-2">HQ Level</label>
            <input
              type="number"
              min={window.ALLIANCE_CONFIG.VALIDATION.hqLevel.min}
              max={window.ALLIANCE_CONFIG.VALIDATION.hqLevel.max}
              value={player.hqLevel}
              onChange={(e) => onChange({ ...player, hqLevel: e.target.value })}
              className={`w-full px-4 py-2 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${validation.errors.hqLevel ? 'border-red-500' : 'border-gray-600'
                }`}
            />
            {validation.errors.hqLevel && (
              <p className="text-red-400 text-sm mt-1">{validation.errors.hqLevel}</p>
            )}
          </div>

          {/* Role Field */}
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <select
              value={player.role}
              onChange={(e) => onChange({ ...player, role: e.target.value })}
              className={`w-full px-4 py-2 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${validation.errors.role ? 'border-red-500' : 'border-gray-600'
                }`}
            >
              {Object.entries(window.ALLIANCE_CONFIG.ROLES).map(([key, role]) => (
                <option key={key} value={key}>
                  {role.name}
                </option>
              ))}
            </select>
            {validation.errors.role && (
              <p className="text-red-400 text-sm mt-1">{validation.errors.role}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleSave}
              disabled={!validation.isValid}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${validation.isValid
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500'
                : 'bg-gray-600 cursor-not-allowed opacity-50'
                }`}
            >
              {mode === 'add' ? <Plus className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{buttonText}</span>
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-600 hover:bg-gray-500 py-2 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Make available globally
window.PlayerModal = PlayerModal; 
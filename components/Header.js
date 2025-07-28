const { Plus, Users } = window.ICONS;

/**
 * Header component for the Alliance Hive Builder
 */
const Header = ({ playerCount, onAddPlayer }) => {
  return (
    <div className="bg-black/50 backdrop-blur-sm border-b border-red-500/30 p-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Alliance Hive Builder
            </h1>
            <p className="text-gray-400">Organize your Last Z survival alliance</p>
          </div>
        </div>

        {/* Stats and Add Button */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-gray-400">Alliance Members</div>
            <div className="text-2xl font-bold text-orange-400">{playerCount}</div>
          </div>
          <button
            onClick={onAddPlayer}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>Add Player</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Make available globally
window.Header = Header; 


/**
 * Header component with modern React patterns
 */
const Header = ({ title, subtitle, icon, onBack, stats, actionButton }) => {
  const handleBackClick = () => {
    onBack?.();
  };

  const handleActionClick = () => {
    actionButton?.onClick?.();
  };

  return (
    <div className="bg-black/50 backdrop-blur-sm border-b border-red-500/30 p-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Back button and title */}
        <div className="flex items-center space-x-4">
          {onBack && (
            <button
              onClick={handleBackClick}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold transition-all flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back to Main</span>
            </button>
          )}

          {icon && (
            <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">{icon}</span>
            </div>
          )}

          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              {title}
            </h1>
            {subtitle && (
              <p className="text-gray-400">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right side - Stats and action button */}
        <div className="flex items-center space-x-4">
          {stats && (
            <div className="text-right">
              <div className="text-sm text-gray-400">{stats.label}</div>
              <div className="text-2xl font-bold text-orange-400">{stats.value}</div>
            </div>
          )}

          {actionButton && (
            <button
              onClick={handleActionClick}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all transform hover:scale-105"
            >
              <span>{actionButton.icon}</span>
              <span>{actionButton.text}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Make available globally
window.Header = Header; 
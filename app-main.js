// Modern React Alliance Hive Builder
const { useState, useEffect, useCallback, useRef } = React;

/**
 * Main Alliance Hive Builder Application
 */
const AllianceHiveBuilder = () => {
  const [currentPage, setCurrentPage] = useState('main');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  }, []);

  const renderMainPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="text-8xl mb-6">👥</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">
            Alliance Hive Builder
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Ultimate management tool for Last Z survival alliances
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon="👥"
            title="Manage Players"
            description="Organize your alliance members with our hexagonal hive layout. Add, edit, and manage player roles and HQ levels."
            buttonText="Manage Players"
            onClick={() => handlePageChange('manage')}
            gradient="from-green-600 to-emerald-600"
            hoverGradient="from-green-500 to-emerald-500"
          />

          <FeatureCard
            icon="🎮"
            title="Simulate"
            description="Test different alliance configurations and strategies. Simulate battles and optimize your hive layout."
            buttonText="Simulate"
            onClick={() => handlePageChange('simulate')}
            gradient="from-blue-600 to-cyan-600"
            hoverGradient="from-blue-500 to-cyan-500"
          />

          <FeatureCard
            icon="📊"
            title="Analytics"
            description="View detailed analytics and statistics about your alliance performance and member contributions."
            buttonText="Analytics"
            onClick={() => handlePageChange('analytics')}
            gradient="from-purple-600 to-indigo-600"
            hoverGradient="from-purple-500 to-indigo-500"
          />
        </div>

        <div className="mt-16 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-6">About Alliance Hive Builder</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            The Alliance Hive Builder is a comprehensive management tool designed specifically for Last Z survival alliances.
            Our hexagonal hive layout provides an intuitive way to visualize and organize your alliance members,
            while powerful features help you optimize your strategy and improve coordination.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <NavigationMenu
        isOpen={isMenuOpen}
        onToggle={handleMenuToggle}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {currentPage === 'main' && renderMainPage()}
      {currentPage === 'manage' && <ManagePlayersPage onBack={() => handlePageChange('main')} />}
      {currentPage === 'simulate' && <SimulatePage onBack={() => handlePageChange('main')} />}
      {currentPage === 'analytics' && <AnalyticsPage onBack={() => handlePageChange('main')} />}
    </div>
  );
};

/**
 * Feature Card Component
 */
const FeatureCard = ({ icon, title, description, buttonText, onClick, gradient, hoverGradient }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm border border-red-500/30 rounded-xl p-6 hover:border-red-400/50 transition-all">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-orange-400 mb-2">{title}</h3>
    <p className="text-gray-300 mb-4">{description}</p>
    <button
      onClick={onClick}
      className={`bg-gradient-to-r ${gradient} hover:${hoverGradient} px-4 py-2 rounded-lg font-semibold transition-all`}
    >
      {buttonText}
    </button>
  </div>
);

/**
 * Navigation Menu Component
 */
const NavigationMenu = ({ isOpen, onToggle, currentPage, onPageChange }) => (
  <>
    <div className="fixed top-6 left-6 z-50">
      <button
        onClick={onToggle}
        className="bg-black/50 backdrop-blur-sm border border-red-500/30 p-3 rounded-lg hover:border-red-400/50 transition-all"
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <div className={`w-full h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-full h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-full h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </div>
      </button>
    </div>

    {isOpen && (
      <div className="fixed inset-0 z-40">
        <div className="absolute inset-0 bg-black/50" onClick={onToggle}></div>
        <div className="absolute left-6 top-20 bg-gray-800/95 backdrop-blur-sm border border-red-500/30 rounded-xl p-4 min-w-64">
          <div className="space-y-2">
            {[
              { key: 'main', label: 'Main', icon: '🏠' },
              { key: 'manage', label: 'Manage Players', icon: '👥' },
              { key: 'simulate', label: 'Simulate', icon: '🎮' },
              { key: 'analytics', label: 'Analytics', icon: '📊' }
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => onPageChange(key)}
                className={`w-full text-left p-3 rounded-lg transition-all ${currentPage === key ? 'bg-red-500/20 border border-red-500/30' : 'hover:bg-gray-700/50'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{icon}</span>
                  <span className="font-semibold">{label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )}
  </>
);

/**
 * Manage Players Page Component
 */
const ManagePlayersPage = ({ onBack }) => {
  const [players, setPlayers] = useState(window.ALLIANCE_CONFIG.SAMPLE_PLAYERS);
  const [newPlayer, setNewPlayer] = useState(window.ALLIANCE_CONFIG.DEFAULT_PLAYER);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activePlayerDropdown, setActivePlayerDropdown] = useState(null);
  const svgContainerRef = useRef(null);

  const { hexSize, spacing } = window.calculateOptimalHexSize(players.length);
  const hexPositions = window.generateHexPositions(players.length, window.ALLIANCE_CONFIG.CANVAS);

  const addPlayer = useCallback((playerData) => {
    const newId = window.generateUniqueId(players);
    const newPlayerData = {
      ...playerData,
      id: newId,
      hqLevel: parseInt(playerData.hqLevel)
    };

    // Check if the new player would fit within the canvas bounds
    const newPlayers = [...players, newPlayerData];
    const newHexPositions = window.generateHexPositions(newPlayers.length, window.ALLIANCE_CONFIG.CANVAS);
    const lastPosition = newHexPositions[newPlayers.length - 1];

    // Check if the last hexagon would be outside the canvas bounds
    if (lastPosition && lastPosition.y + hexSize <= window.ALLIANCE_CONFIG.CANVAS.height) {
      setPlayers(newPlayers);
      setNewPlayer(window.ALLIANCE_CONFIG.DEFAULT_PLAYER);
      setShowAddForm(false);
    } else {
      alert("No more space to add hexagons.");
    }
  }, [players, hexSize]);

  const updatePlayer = useCallback((id, updates) => {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deletePlayer = useCallback((id) => {
    setPlayers(prev => prev.filter(p => p.id !== id));
    setActivePlayerDropdown(null);
  }, []);

  const startEdit = useCallback((player) => {
    setEditingPlayer({ ...player });
  }, []);

  const saveEdit = useCallback((playerData) => {
    if (editingPlayer) {
      updatePlayer(editingPlayer.id, {
        name: playerData.name,
        hqLevel: parseInt(playerData.hqLevel),
        role: playerData.role
      });
      setEditingPlayer(null);
    }
  }, [editingPlayer, updatePlayer]);

  const cancelEdit = useCallback(() => {
    setEditingPlayer(null);
  }, []);

  const handleEdit = useCallback((player) => {
    startEdit(player);
    setActivePlayerDropdown(null);
  }, [startEdit]);

  const handleDelete = useCallback((playerId) => {
    deletePlayer(playerId);
  }, [deletePlayer]);

  const handlePlayerDropdownToggle = useCallback((playerId) => {
    setActivePlayerDropdown(prev => prev === playerId ? null : playerId);
  }, []);

  // Global click handler to close dropdowns
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const isClickOutside = !e.target.closest('.dropdown-container') &&
        !e.target.closest('button[onClick*="handlePlayerDropdownToggle"]') &&
        !e.target.closest('circle[onClick*="onDropdownToggle"]');

      if (isClickOutside) {
        setActivePlayerDropdown(null);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);



  const renderConnectionLines = useCallback(() => {
    return hexPositions.map((pos, index) =>
      hexPositions.slice(index + 1).map((otherPos, otherIndex) => {
        const distance = window.calculateDistance(pos, otherPos);
        const connectionDistance = hexSize * 2 * spacing * 1.1;

        if (distance < connectionDistance) {
          return (
            <line
              key={`${index}-${otherIndex}`}
              x1={pos.x}
              y1={pos.y}
              x2={otherPos.x}
              y2={otherPos.y}
              stroke="rgba(255, 165, 0, 0.4)"
              strokeWidth={Math.max(1, hexSize / 40)}
              strokeDasharray="3,3"
            />
          );
        }
        return null;
      })
    );
  }, [hexPositions, hexSize, spacing]);

  const renderHexagons = useCallback(() => {
    return players.map((player, index) => {
      const position = hexPositions[index];
      if (!position) return null;

      return (
        <window.Hexagon
          key={player.id}
          player={player}
          position={position}
          hexSize={hexSize}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDropdownActive={activePlayerDropdown === player.id}
          onDropdownToggle={handlePlayerDropdownToggle}
        />
      );
    });
  }, [players, hexPositions, hexSize, handleEdit, handleDelete, activePlayerDropdown, handlePlayerDropdownToggle]);

  const renderMenuButtons = useCallback(() => {
    return players.map((player, index) => {
      const position = hexPositions[index];
      if (!position) return null;

      // Calculate menu button position (top-right corner of hexagon, like in the working version)
      // Get actual container dimensions
      const container = svgContainerRef.current;
      if (!container) return null;

      const containerRect = container.getBoundingClientRect();
      const svgWidth = window.ALLIANCE_CONFIG.CANVAS.width;
      const svgHeight = window.ALLIANCE_CONFIG.CANVAS.height;

      const scaleX = containerRect.width / svgWidth;
      const scaleY = containerRect.height / svgHeight;

      // Use fixed positioning like the working version
      const menuButtonX = (position.x + window.ALLIANCE_CONFIG.MENU_BUTTON.offsetX) * scaleX;
      const menuButtonY = (position.y + window.ALLIANCE_CONFIG.MENU_BUTTON.offsetY) * scaleY;

      return (
        <div key={`menu-${player.id}`}>
          {/* Menu Button (3 dots) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePlayerDropdownToggle(player.id);
            }}
            style={{
              position: 'absolute',
              top: menuButtonY,
              left: menuButtonX,
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: activePlayerDropdown === player.id ? 'rgba(249, 115, 22, 0.9)' : 'rgba(0, 0, 0, 0.8)',
              border: '2px solid rgba(249, 115, 22, 0.8)',
              color: activePlayerDropdown === player.id ? 'white' : '#f97316',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              zIndex: 10,
              transition: 'all 0.2s ease'
            }}
          >
            ⋮
          </button>

          {/* Dropdown Menu */}
          {activePlayerDropdown === player.id && (
            <div
              style={{
                position: 'absolute',
                top: menuButtonY + 28,
                left: menuButtonX - 90,
                background: 'rgba(31, 41, 55, 0.95)',
                border: '2px solid rgba(249, 115, 22, 0.5)',
                borderRadius: '8px',
                padding: '8px',
                zIndex: 20,
                minWidth: '120px'
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(player);
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '4px 8px',
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '12px',
                  borderRadius: '4px',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                ✏️ Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(player.id);
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '4px 8px',
                  background: 'transparent',
                  border: 'none',
                  color: '#f87171',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '12px',
                  borderRadius: '4px',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(239, 68, 68, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
      );
    });
  }, [players, hexPositions, hexSize, activePlayerDropdown, handlePlayerDropdownToggle, handleEdit, handleDelete]);


  const renderEmptyState = useCallback(() => {
    if (players.length > 0) return null;

    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <span className="text-6xl mb-4 block">👥</span>
          <h3 className="text-xl font-semibold mb-2">No Alliance Members Yet</h3>
          <p>Click "Add Player" to start building your hexagonal hive</p>
        </div>
      </div>
    );
  }, [players.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <PageHeader
        title="Manage Players"
        subtitle="Organize your alliance members"
        icon="👥"
        onBack={onBack}
        stats={{ label: "Alliance Members", value: players.length }}
        actionButton={{
          text: "Add Player",
          icon: "➕",
          onClick: () => setShowAddForm(true)
        }}
      />

      <window.PlayerModal
        isOpen={showAddForm}
        mode="add"
        player={newPlayer}
        onSave={addPlayer}
        onCancel={() => setShowAddForm(false)}
        onChange={setNewPlayer}
      />

      <window.PlayerModal
        isOpen={!!editingPlayer}
        mode="edit"
        player={editingPlayer || window.ALLIANCE_CONFIG.DEFAULT_PLAYER}
        onSave={saveEdit}
        onCancel={cancelEdit}
        onChange={setEditingPlayer}
      />

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div
            ref={svgContainerRef}
            className="relative w-full h-[600px] bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 border-red-500/30 rounded-xl overflow-hidden backdrop-blur-sm flex items-center justify-center"
          >
            <BackgroundPattern />

            <svg
              width={window.ALLIANCE_CONFIG.CANVAS.width}
              height={window.ALLIANCE_CONFIG.CANVAS.height}
              viewBox={`0 0 ${window.ALLIANCE_CONFIG.CANVAS.width} ${window.ALLIANCE_CONFIG.CANVAS.height}`}
              className="w-full h-full"
              style={{ pointerEvents: 'all' }}
            >
              {renderConnectionLines()}
              {renderHexagons()}

              <defs>
                <radialGradient id="hexGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(55, 65, 81, 0.9)" />
                  <stop offset="100%" stopColor="rgba(17, 24, 39, 0.9)" />
                </radialGradient>
              </defs>
            </svg>


            {renderEmptyState()}
          </div>

          <window.Legend />
        </div>
      </div>
    </div>
  );
};

/**
 * Page Header Component
 */
const PageHeader = ({ title, subtitle, icon, onBack, stats, actionButton }) => (
  <div className="bg-black/50 backdrop-blur-sm border-b border-red-500/30 p-6">
    <div className="flex items-center justify-between max-w-7xl mx-auto">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold transition-all flex items-center space-x-2"
        >
          <span>←</span>
          <span>Back to Main</span>
        </button>
        <div className={`w-12 h-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center`}>
          <span className="text-white text-xl">{icon}</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-gray-400">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {stats && (
          <div className="text-right">
            <div className="text-sm text-gray-400">{stats.label}</div>
            <div className="text-2xl font-bold text-orange-400">{stats.value}</div>
          </div>
        )}
        {actionButton && (
          <button
            onClick={actionButton.onClick}
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

/**
 * Background Pattern Component
 */
const BackgroundPattern = () => (
  <div className="absolute inset-0 opacity-10 pointer-events-none">
    <div className="w-full h-full" style={{
      backgroundImage: `
        radial-gradient(circle at 25% 25%, rgba(255, 0, 0, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(255, 165, 0, 0.3) 0%, transparent 50%)
      `
    }}></div>
  </div>
);

/**
 * Simulate Page Component
 */
const SimulatePage = ({ onBack }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
    <PageHeader
      title="Simulate"
      subtitle="Test alliance configurations"
      icon="🎮"
      onBack={onBack}
    />

    <div className="container mx-auto px-6 py-12">
      <div className="text-center">
        <div className="text-8xl mb-6">🎮</div>
        <h2 className="text-4xl font-bold text-blue-400 mb-4">Simulation Mode</h2>
        <p className="text-xl text-gray-300 mb-8">
          This feature is coming soon! Test different alliance configurations and strategies.
        </p>
        <div className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-blue-400 mb-4">Planned Features</h3>
          <ul className="text-left text-gray-300 space-y-2">
            <li>• Battle simulation with different enemy types</li>
            <li>• Alliance strength calculations</li>
            <li>• Optimal positioning recommendations</li>
            <li>• Strategy testing and optimization</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Analytics Page Component
 */
const AnalyticsPage = ({ onBack }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
    <PageHeader
      title="Analytics"
      subtitle="View alliance statistics"
      icon="📊"
      onBack={onBack}
    />

    <div className="container mx-auto px-6 py-12">
      <div className="text-center">
        <div className="text-8xl mb-6">📊</div>
        <h2 className="text-4xl font-bold text-purple-400 mb-4">Analytics Dashboard</h2>
        <p className="text-xl text-gray-300 mb-8">
          This feature is coming soon! View detailed analytics and statistics.
        </p>
        <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-purple-400 mb-4">Planned Features</h3>
          <ul className="text-left text-gray-300 space-y-2">
            <li>• Member activity tracking</li>
            <li>• Alliance performance metrics</li>
            <li>• Contribution statistics</li>
            <li>• Growth and progress charts</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// Render the application
console.log('🎯 Rendering modern Alliance Hive Builder...');
ReactDOM.render(<AllianceHiveBuilder />, document.getElementById('root'));
console.log('✅ Modern Alliance Hive Builder rendered successfully!');

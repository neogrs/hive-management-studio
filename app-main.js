// Destructure React hooks
const { useState } = React;

/**
 * Manage Players Page Component with Full Hexagonal Hive Functionality
 */
const ManagePlayersPage = ({ onBack }) => {
  // State management using React hooks
  const [players, setPlayers] = useState(window.ALLIANCE_CONFIG.SAMPLE_PLAYERS);
  const [newPlayer, setNewPlayer] = useState(window.ALLIANCE_CONFIG.DEFAULT_PLAYER);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activePlayerDropdown, setActivePlayerDropdown] = useState(null);

  // Calculate hexagon layout
  const { hexSize, spacing } = window.calculateOptimalHexSize(players.length);
  const hexPositions = window.generateHexPositions(players.length, window.ALLIANCE_CONFIG.CANVAS);

  /**
   * Player management functions
   */
  const addPlayer = (playerData) => {
    const newId = window.generateUniqueId(players);
    const newPlayerData = {
      ...playerData,
      id: newId,
      hqLevel: parseInt(playerData.hqLevel)
    };

    setPlayers(prevPlayers => [...prevPlayers, newPlayerData]);
    setNewPlayer(window.ALLIANCE_CONFIG.DEFAULT_PLAYER);
    setShowAddForm(false);
  };

  const updatePlayer = (id, updates) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(p => p.id === id ? { ...p, ...updates } : p)
    );
  };

  const deletePlayer = (id) => {
    setPlayers(prevPlayers => prevPlayers.filter(p => p.id !== id));
  };

  const startEdit = (player) => {
    console.log('🎯 startEdit called with player:', player);
    setEditingPlayer({ ...player });
  };

  const saveEdit = (playerData) => {
    if (editingPlayer) {
      updatePlayer(editingPlayer.id, {
        name: playerData.name,
        hqLevel: parseInt(playerData.hqLevel),
        role: playerData.role
      });
      setEditingPlayer(null);
    }
  };

  const cancelEdit = () => {
    setEditingPlayer(null);
  };

  /**
   * Event handlers
   */
  const handleAddPlayer = () => {
    setShowAddForm(true);
  };

  const handleEdit = (player) => {
    console.log('🎯 handleEdit called in app-main.js with player:', player);
    startEdit(player);
  };

  const handleDelete = (playerId) => {
    console.log('🎯 handleDelete called in app-main.js with playerId:', playerId);
    deletePlayer(playerId);
    setActivePlayerDropdown(null);
  };

  const handlePlayerDropdownToggle = (playerId) => {
    console.log('🎯 Toggle dropdown for player:', playerId);
    setActivePlayerDropdown(activePlayerDropdown === playerId ? null : playerId);
  };

  // Add global click handler to close dropdowns when clicking outside
  React.useEffect(() => {
    const handleGlobalClick = (e) => {
      // Check if click is outside the dropdown area
      const isClickOutside = !e.target.closest('.dropdown-container') &&
        !e.target.closest('button[onClick*="handlePlayerDropdownToggle"]') &&
        !e.target.closest('button[onClick*="setShowDropdown"]');

      if (isClickOutside) {
        setActivePlayerDropdown(null);
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  /**
   * Render connection lines between nearby hexagons
   */
  const renderConnectionLines = () => {
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
  };

  /**
   * Render individual hexagon players
   */
  const renderHexagonPlayers = () => {
    return players.map((player, index) => {
      const position = hexPositions[index];
      if (!position) return null;

      return (
        <window.HexagonPlayer
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
  };



  /**
   * Render empty state when no players exist
   */
  const renderEmptyState = () => {
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header with Back Button */}
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
            <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">👥</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Manage Players
              </h1>
              <p className="text-gray-400">Organize your alliance members</p>
            </div>
          </div>

          {/* Stats and Add Button */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-400">Alliance Members</div>
              <div className="text-2xl font-bold text-orange-400">{players.length}</div>
            </div>
            <button
              onClick={handleAddPlayer}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all transform hover:scale-105"
            >
              <span>➕</span>
              <span>Add Player</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Player Modal */}
      <window.PlayerModal
        isOpen={showAddForm}
        mode="add"
        player={newPlayer}
        onSave={addPlayer}
        onCancel={() => setShowAddForm(false)}
        onChange={setNewPlayer}
      />

      {/* Edit Player Modal */}
      <window.PlayerModal
        isOpen={!!editingPlayer}
        mode="edit"
        player={editingPlayer || window.ALLIANCE_CONFIG.DEFAULT_PLAYER}
        onSave={saveEdit}
        onCancel={cancelEdit}
        onChange={setEditingPlayer}
      />

      {/* Main Canvas */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative w-full h-[600px] bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 border-red-500/30 rounded-xl overflow-hidden backdrop-blur-sm flex items-center justify-center"
            onClick={(e) => {
              // Close dropdowns when clicking on the background
              if (e.target === e.currentTarget) {
                setActivePlayerDropdown(null);
                setShowDropdown(false);
              }
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(255, 0, 0, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 75% 75%, rgba(255, 165, 0, 0.3) 0%, transparent 50%)
                `
              }}></div>
            </div>

            {/* Standalone Action Icon - Outside SVG */}
            <button
              onClick={(e) => {
                console.log('🎯 HTML Button clicked!');
                setShowDropdown(!showDropdown);
                e.stopPropagation();
              }}
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: '3px solid rgba(249, 115, 22, 0.8)',
                background: showDropdown ? 'rgba(249, 115, 22, 0.9)' : 'rgba(0, 0, 0, 0.8)',
                color: showDropdown ? 'white' : '#f97316',
                fontSize: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                zIndex: 1000
              }}
              onMouseEnter={(e) => {
                if (!showDropdown) {
                  e.target.style.background = 'rgba(249, 115, 22, 0.9)';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'scale(1.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!showDropdown) {
                  e.target.style.background = 'rgba(0, 0, 0, 0.8)';
                  e.target.style.color = '#f97316';
                  e.target.style.transform = 'scale(1)';
                }
              }}
            >
              ⚙️
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div
                className="dropdown-container"
                style={{
                  position: 'absolute',
                  top: '90px',
                  left: '20px',
                  background: 'rgba(31, 41, 55, 0.95)',
                  border: '2px solid rgba(249, 115, 22, 0.5)',
                  borderRadius: '8px',
                  padding: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  zIndex: 1001,
                  minWidth: '160px'
                }}
              >
                <button
                  onClick={(e) => {
                    console.log('🎯 Edit All clicked!');
                    setShowDropdown(false);
                    // Add logic to edit all players
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '14px',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  <span>✏️</span>
                  <span>Edit All Players</span>
                </button>
                <button
                  onClick={(e) => {
                    console.log('🎯 Delete All clicked!');
                    setShowDropdown(false);
                    // Add logic to delete all players
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'transparent',
                    border: 'none',
                    color: '#ef4444',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '14px',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(239, 68, 68, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  <span>🗑️</span>
                  <span>Delete All Players</span>
                </button>
                <button
                  onClick={(e) => {
                    console.log('🎯 Export clicked!');
                    setShowDropdown(false);
                    // Add logic to export data
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '14px',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(34, 197, 94, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  <span>📤</span>
                  <span>Export Data</span>
                </button>
              </div>
            )}

            {/* SVG Container for Hexagonal Hive */}
            <svg
              width={window.ALLIANCE_CONFIG.CANVAS.width}
              height={window.ALLIANCE_CONFIG.CANVAS.height}
              viewBox={`0 0 ${window.ALLIANCE_CONFIG.CANVAS.width} ${window.ALLIANCE_CONFIG.CANVAS.height}`}
              className="w-full h-full"
              style={{ pointerEvents: 'all' }}
              onClick={(e) => {
                console.log('🎯 SVG container clicked at:', e.clientX, e.clientY);
                // Close dropdowns when clicking outside
                setActivePlayerDropdown(null);
                setShowDropdown(false);
              }}
            >
              {/* Connection Lines */}
              {renderConnectionLines()}

              {/* Hexagonal Player Nodes */}
              {renderHexagonPlayers()}



              {/* Gradient Definitions */}
              <defs>
                <radialGradient id="hexGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(55, 65, 81, 0.9)" />
                  <stop offset="100%" stopColor="rgba(17, 24, 39, 0.9)" />
                </radialGradient>
              </defs>
            </svg>



            {/* Empty State */}
            {renderEmptyState()}
          </div>

          {/* Legend Component */}
          <window.Legend />
        </div>
      </div>
    </div>
  );
};

/**
 * Main Alliance Hive Builder Application with Navigation
 */
const AllianceHiveBuilder = () => {
  const [currentPage, setCurrentPage] = useState('main');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const renderMainPage = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        {/* Main Content */}
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

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-red-500/30 rounded-xl p-6 hover:border-red-400/50 transition-all">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-orange-400 mb-2">Manage Players</h3>
              <p className="text-gray-300 mb-4">
                Organize your alliance members with our hexagonal hive layout. Add, edit, and manage player roles and HQ levels.
              </p>
              <button
                onClick={() => handlePageChange('manage')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 px-4 py-2 rounded-lg font-semibold transition-all"
              >
                Manage Players
              </button>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-red-500/30 rounded-xl p-6 hover:border-red-400/50 transition-all">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl font-bold text-orange-400 mb-2">Simulate</h3>
              <p className="text-gray-300 mb-4">
                Test different alliance configurations and strategies. Simulate battles and optimize your hive layout.
              </p>
              <button
                onClick={() => handlePageChange('simulate')}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-4 py-2 rounded-lg font-semibold transition-all"
              >
                Simulate
              </button>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-red-500/30 rounded-xl p-6 hover:border-red-400/50 transition-all">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-orange-400 mb-2">Analytics</h3>
              <p className="text-gray-300 mb-4">
                View detailed analytics and statistics about your alliance performance and member contributions.
              </p>
              <button
                onClick={() => handlePageChange('analytics')}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-4 py-2 rounded-lg font-semibold transition-all"
              >
                Analytics
              </button>
            </div>
          </div>

          {/* About Section */}
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
  };

  const renderManagePage = () => {
    return <ManagePlayersPage onBack={() => handlePageChange('main')} />;
  };

  const renderSimulatePage = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        {/* Header with Back Button */}
        <div className="bg-black/50 backdrop-blur-sm border-b border-red-500/30 p-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handlePageChange('main')}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold transition-all flex items-center space-x-2"
              >
                <span>←</span>
                <span>Back to Main</span>
              </button>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🎮</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Simulate
                </h1>
                <p className="text-gray-400">Test alliance configurations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Simulate Content */}
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
  };

  const renderAnalyticsPage = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        {/* Header with Back Button */}
        <div className="bg-black/50 backdrop-blur-sm border-b border-red-500/30 p-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handlePageChange('main')}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold transition-all flex items-center space-x-2"
              >
                <span>←</span>
                <span>Back to Main</span>
              </button>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Analytics
                </h1>
                <p className="text-gray-400">View alliance statistics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Content */}
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hamburger Menu Button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={handleMenuToggle}
          className="bg-black/50 backdrop-blur-sm border border-red-500/30 p-3 rounded-lg hover:border-red-400/50 transition-all"
        >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <div className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </div>
        </button>
      </div>

      {/* Sidebar Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={handleMenuToggle}></div>
          <div className="absolute left-6 top-20 bg-gray-800/95 backdrop-blur-sm border border-red-500/30 rounded-xl p-4 min-w-64">
            <div className="space-y-2">
              <button
                onClick={() => handlePageChange('main')}
                className={`w-full text-left p-3 rounded-lg transition-all ${currentPage === 'main' ? 'bg-red-500/20 border border-red-500/30' : 'hover:bg-gray-700/50'}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🏠</span>
                  <span className="font-semibold">Main</span>
                </div>
              </button>
              <button
                onClick={() => handlePageChange('manage')}
                className={`w-full text-left p-3 rounded-lg transition-all ${currentPage === 'manage' ? 'bg-red-500/20 border border-red-500/30' : 'hover:bg-gray-700/50'}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">👥</span>
                  <span className="font-semibold">Manage Players</span>
                </div>
              </button>
              <button
                onClick={() => handlePageChange('simulate')}
                className={`w-full text-left p-3 rounded-lg transition-all ${currentPage === 'simulate' ? 'bg-red-500/20 border border-red-500/30' : 'hover:bg-gray-700/50'}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🎮</span>
                  <span className="font-semibold">Simulate</span>
                </div>
              </button>
              <button
                onClick={() => handlePageChange('analytics')}
                className={`w-full text-left p-3 rounded-lg transition-all ${currentPage === 'analytics' ? 'bg-red-500/20 border border-red-500/30' : 'hover:bg-gray-700/50'}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">📊</span>
                  <span className="font-semibold">Analytics</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Content */}
      {currentPage === 'main' && renderMainPage()}
      {currentPage === 'manage' && renderManagePage()}
      {currentPage === 'simulate' && renderSimulatePage()}
      {currentPage === 'analytics' && renderAnalyticsPage()}
    </div>
  );
};

// Render the application
console.log('🎯 Rendering main Alliance Hive Builder...');
ReactDOM.render(<AllianceHiveBuilder />, document.getElementById('root'));
console.log('✅ Main Alliance Hive Builder rendered successfully!'); 
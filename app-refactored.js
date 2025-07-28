/**
 * Main Alliance Hive Builder Application
 * 
 * This refactored version follows React best practices:
 * - Separation of concerns
 * - Modular components
 * - Proper state management
 * - Error handling
 * - Reusable utilities
 * - Configuration-driven design
 */

// Destructure React hooks
const { useState } = React;
const AllianceHiveBuilder = () => {
  // State management using React hooks
  const [players, setPlayers] = useState(window.ALLIANCE_CONFIG.SAMPLE_PLAYERS);
  const [newPlayer, setNewPlayer] = useState(window.ALLIANCE_CONFIG.DEFAULT_PLAYER);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Calculate hexagon layout - recalculate when players change
  const { hexSize, spacing } = window.calculateOptimalHexSize(players.length);
  const hexPositions = window.generateHexPositions(players.length, window.ALLIANCE_CONFIG.CANVAS);

  /**
   * Player management functions
   */
  const addPlayer = (playerData) => {
    console.log('Adding player:', playerData);
    const newId = window.generateUniqueId(players);
    const newPlayerData = {
      ...playerData,
      id: newId,
      hqLevel: parseInt(playerData.hqLevel)
    };
    console.log('New player data:', newPlayerData);

    setPlayers(prevPlayers => {
      const updatedPlayers = [...prevPlayers, newPlayerData];
      console.log('Updated players:', updatedPlayers);
      return updatedPlayers;
    });
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
    startEdit(player);
  };

  const handleDelete = (playerId) => {
    deletePlayer(playerId);
  };

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
    console.log('Rendering hexagon players:', players.length, 'players');
    console.log('Hex positions:', hexPositions.length, 'positions');
    return players.map((player, index) => {
      const position = hexPositions[index];
      console.log(`Player ${index}:`, player.name, 'at position:', position);
      if (!position) {
        console.log(`No position for player ${index}:`, player.name);
        return null;
      }

      return (
        <window.HexagonPlayer
          key={player.id}
          player={player}
          position={position}
          hexSize={hexSize}
          onEdit={handleEdit}
          onDelete={handleDelete}
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
      {/* Header Component */}
      <window.Header
        playerCount={players.length}
        onAddPlayer={handleAddPlayer}
      />

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
      <div className="p-6" onClick={handleCanvasClick}>
        <div className="max-w-7xl mx-auto">
          <div
            className="relative w-full h-[600px] bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 border-red-500/30 rounded-xl overflow-hidden backdrop-blur-sm flex items-center justify-center"
            onClick={handleCanvasClick}
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

            {/* SVG Container for Hexagonal Hive */}
            <svg
              width={window.ALLIANCE_CONFIG.CANVAS.width}
              height={window.ALLIANCE_CONFIG.CANVAS.height}
              viewBox={`0 0 ${window.ALLIANCE_CONFIG.CANVAS.width} ${window.ALLIANCE_CONFIG.CANVAS.height}`}
              className="w-full h-full"
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

// Render the application
console.log('🎯 Rendering refactored Alliance Hive Builder...');
ReactDOM.render(<AllianceHiveBuilder />, document.getElementById('root'));
console.log('✅ Refactored Alliance Hive Builder rendered successfully!'); 
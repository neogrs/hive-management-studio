const { Edit3, Trash2 } = window.ICONS;

/**
 * Individual hexagon player component
 */
const HexagonPlayer = ({
  player,
  position,
  hexSize,
  onEdit,
  onDelete,
  isDropdownActive,
  onDropdownToggle
}) => {
  console.log('HexagonPlayer render:', player.name, 'playerId:', player.id, 'onEdit:', typeof onEdit, 'onDelete:', typeof onDelete);
  const roleConfig = window.getRoleConfig(player.role);
  const hexWidth = hexSize * 2;
  const formattedName = window.formatPlayerName(player.name, hexSize > 50 ? 12 : 8);

  // Create hexagon path
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

  const hexPath = createHexPath(hexSize);

  // Calculate menu button position (top-left corner of hexagon)
  const menuButtonX = position.x - hexSize * 0.8;
  const menuButtonY = position.y - hexSize * 0.8;

  // Debug: Log the positioning
  console.log('📍 Hexagon positioning for', player.name, ':', {
    x: position.x,
    y: position.y,
    hexSize: hexSize,
    menuButtonX: menuButtonX,
    menuButtonY: menuButtonY
  });

  return (
    <g
      className="hex-group group cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      {/* Hexagon Background - Visual only */}
      <path
        d={hexPath}
        transform={`translate(${position.x}, ${position.y})`}
        fill="url(#hexGradient)"
        stroke={roleConfig.color}
        strokeWidth="3"
        className="hex-path hex-element hover:stroke-orange-400 transition-all duration-200"
        filter="drop-shadow(0 4px 20px rgba(0, 0, 0, 0.5))"
        style={{ pointerEvents: 'none' }}
      />

      {/* Role Background Circle */}
      <circle
        cx={position.x}
        cy={position.y - hexSize * 0.1}
        r={Math.max(15, hexSize * 0.3)}
        fill={roleConfig.color}
        className="opacity-90 hex-element"
        style={{ pointerEvents: 'none' }}
      />

      {/* Role Icon */}
      <foreignObject
        x={position.x - Math.max(8, hexSize * 0.15)}
        y={position.y - hexSize * 0.25}
        width={Math.max(16, hexSize * 0.3)}
        height={Math.max(16, hexSize * 0.3)}
        className="pointer-events-none"
        style={{ pointerEvents: 'none' }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%'
        }}>
          <span style={{ fontSize: `${Math.max(12, hexSize * 0.2)}px` }}>
            {roleConfig.icon}
          </span>
        </div>
      </foreignObject>

      {/* HQ Level Badge */}
      <circle
        cx={position.x + hexSize * 0.5}
        cy={position.y - hexSize * 0.5}
        r={Math.max(12, hexSize * 0.25)}
        fill="#f97316"
        stroke="#ffffff"
        strokeWidth={Math.max(1, hexSize / 40)}
        className="hex-element"
        style={{ pointerEvents: 'none' }}
      />
      <text
        x={position.x + hexSize * 0.5}
        y={position.y - hexSize * 0.4}
        textAnchor="middle"
        className="fill-white font-bold"
        style={{ fontSize: `${Math.max(8, hexSize * 0.2)}px`, pointerEvents: 'none' }}
      >
        {player.hqLevel}
      </text>

      {/* Player Name */}
      <text
        x={position.x}
        y={position.y + hexSize * 0.4}
        textAnchor="middle"
        className="fill-orange-300 font-semibold"
        style={{ fontSize: `${Math.max(10, hexSize * 0.18)}px`, pointerEvents: 'none' }}
      >
        {formattedName}
      </text>

      {/* Role Text */}
      <text
        x={position.x}
        y={position.y + hexSize * 0.6}
        textAnchor="middle"
        className="fill-gray-400 capitalize"
        style={{ fontSize: `${Math.max(8, hexSize * 0.15)}px`, pointerEvents: 'none' }}
      >
        {player.role}
      </text>

      {/* Menu Button (3 dots) */}
      <button
        cx={menuButtonX + 14}
        cy={menuButtonY + 14}
        r={14}
        fill={isDropdownActive ? 'rgba(249, 115, 22, 0.9)' : 'rgba(0, 0, 0, 0.8)'}
        stroke="rgba(249, 115, 22, 0.8)"
        strokeWidth="2"
        style={{ cursor: 'pointer', pointerEvents: 'all' }}
        onClick={(e) => {
          e.stopPropagation();
          onDropdownToggle && onDropdownToggle(player.id);
        }}
      />
      <text
        x={menuButtonX + 14}
        y={menuButtonY + 18}
        textAnchor="middle"
        className="fill-current"
        style={{
          fontSize: '14px',
          pointerEvents: 'none',
          color: isDropdownActive ? 'white' : '#f97316'
        }}
      >
        ⋮
      </text>

      {/* Dropdown Menu */}
      {isDropdownActive && (
        <g>
          {/* Dropdown Background */}
          <rect
            x={menuButtonX + 30}
            y={menuButtonY}
            width="120"
            height="60"
            rx="8"
            fill="rgba(31, 41, 55, 0.95)"
            stroke="rgba(249, 115, 22, 0.5)"
            strokeWidth="2"
            style={{ pointerEvents: 'all' }}
          />

          {/* Edit Button */}
          <rect
            x={menuButtonX + 35}
            y={menuButtonY + 8}
            width="110"
            height="20"
            rx="4"
            fill="transparent"
            style={{ cursor: 'pointer', pointerEvents: 'all' }}
            onClick={(e) => {
              e.stopPropagation();
              onEdit && onEdit(player);
            }}
            onMouseEnter={(e) => {
              e.target.setAttribute('fill', 'rgba(59, 130, 246, 0.2)');
            }}
            onMouseLeave={(e) => {
              e.target.setAttribute('fill', 'transparent');
            }}
          />
          <text
            x={menuButtonX + 40}
            y={menuButtonY + 20}
            className="fill-white"
            style={{ fontSize: '12px', pointerEvents: 'none' }}
          >
            ✏️ Edit
          </text>

          {/* Delete Button */}
          <rect
            x={menuButtonX + 35}
            y={menuButtonY + 32}
            width="110"
            height="20"
            rx="4"
            fill="transparent"
            style={{ cursor: 'pointer', pointerEvents: 'all' }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete && onDelete(player.id);
            }}
            onMouseEnter={(e) => {
              e.target.setAttribute('fill', 'rgba(239, 68, 68, 0.2)');
            }}
            onMouseLeave={(e) => {
              e.target.setAttribute('fill', 'transparent');
            }}
          />
          <text
            x={menuButtonX + 40}
            y={menuButtonY + 44}
            className="fill-red-400"
            style={{ fontSize: '12px', pointerEvents: 'none' }}
          >
            🗑️ Delete
          </text>
        </g>
      )}
    </g>
  );
};

// Make available globally
window.HexagonPlayer = HexagonPlayer; 
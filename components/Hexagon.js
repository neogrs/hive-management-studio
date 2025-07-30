const { Edit3, Trash2 } = window.ICONS;

/**
 * Unified hexagon component with integrated edit button
 * Contains hexagon shape, player info, and 3 dots edit button
 */
const Hexagon = ({
  player,
  position,
  hexSize,
  onEdit,
  onDelete,
  isDropdownActive,
  onDropdownToggle
}) => {
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

  // 3 dots button position (fixed relative to hexagon)
  const dotsX = position.x + window.ALLIANCE_CONFIG.MENU_BUTTON.offsetX;
  const dotsY = position.y + window.ALLIANCE_CONFIG.MENU_BUTTON.offsetY;

  return (
    <g
      className="hex-group group cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      {/* Hexagon Background */}
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

      {/* 3 Dots Edit Button */}
      <circle
        cx={dotsX}
        cy={dotsY}
        r={14}
        fill={isDropdownActive ? "rgba(249, 115, 22, 0.9)" : "rgba(0, 0, 0, 0.8)"}
        stroke="rgba(249, 115, 22, 0.8)"
        strokeWidth="2"
        className="cursor-pointer transition-all duration-200 hover:fill-orange-500"
        onClick={(e) => {
          e.stopPropagation();
          onDropdownToggle(player.id);
        }}
        style={{ pointerEvents: 'all' }}
      />
      <text
        x={dotsX}
        y={dotsY + 4}
        textAnchor="middle"
        className="font-bold"
        fill={isDropdownActive ? "white" : "#f97316"}
        style={{ fontSize: '14px', pointerEvents: 'none' }}
      >
        ⋮
      </text>

      {/* Dropdown Menu */}
      {isDropdownActive && (
        <g>
          {/* Dropdown Background */}
          <rect
            x={dotsX - 90}
            y={dotsY + 20}
            width={120}
            height={60}
            rx={8}
            fill="rgba(31, 41, 55, 0.95)"
            stroke="rgba(249, 115, 22, 0.5)"
            strokeWidth="2"
            style={{ pointerEvents: 'all' }}
          />

          {/* Edit Button */}
          <rect
            x={dotsX - 85}
            y={dotsY + 25}
            width={110}
            height={20}
            rx={4}
            fill="transparent"
            className="cursor-pointer hover:fill-blue-500/20"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(player);
            }}
            style={{ pointerEvents: 'all' }}
          />
          <text
            x={dotsX - 30}
            y={dotsY + 38}
            textAnchor="middle"
            className="fill-white cursor-pointer"
            style={{ fontSize: '12px', pointerEvents: 'none' }}
          >
            ✏️ Edit
          </text>

          {/* Delete Button */}
          <rect
            x={dotsX - 85}
            y={dotsY + 45}
            width={110}
            height={20}
            rx={4}
            fill="transparent"
            className="cursor-pointer hover:fill-red-500/20"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(player.id);
            }}
            style={{ pointerEvents: 'all' }}
          />
          <text
            x={dotsX - 30}
            y={dotsY + 58}
            textAnchor="middle"
            className="fill-red-400 cursor-pointer"
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
window.Hexagon = Hexagon; 
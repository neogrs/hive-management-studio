// App.jsx
import React, { useRef, useEffect, useState } from "react";

const HEX_RADIUS = 30;
const PADDING = 10;
const ROW_HEIGHT = HEX_RADIUS * Math.sqrt(3);
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = window.innerHeight * 0.6;

function App() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [hexagons, setHexagons] = useState([]);
  const [dropdown, setDropdown] = useState(null); // { x, y, index }
  const [isEditMode, setIsEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    hqLevel: 15,
    playerType: "R1",
    commander: false,
  });

  const drawHexagon = (ctx, x, y, data) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = Math.PI / 3 * i;
      const hx = x + HEX_RADIUS * Math.cos(angle);
      const hy = y + HEX_RADIUS * Math.sin(angle);
      ctx.lineTo(hx, hy);
    }
    ctx.closePath();
    ctx.fillStyle = "#3F51B5";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.stroke();

    // Draw text
    ctx.fillStyle = "#fff";
    ctx.font = "bold 10px sans-serif";
    ctx.textAlign = "center";
    if (data?.name) ctx.fillText(data.name, x, y - 5);
    if (data?.hqLevel) ctx.fillText(`HQ ${data.hqLevel}`, x, y + 10);
    if (data?.playerType) ctx.fillText(data.playerType, x, y + 25);
    if (data?.commander) ctx.fillText("🎖 Commander", x, y + 40);
  };

  const drawAll = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hexagons.forEach(({ x, y, ...data }) => drawHexagon(ctx, x, y, data));
  };

  useEffect(() => {
    drawAll();
  }, [hexagons]);

  const handleEditClick = (x, y, index) => {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const dropdownX = canvasRect.left - containerRect.left + x;
    const dropdownY = canvasRect.top - containerRect.top + y;
    setDropdown({ x: dropdownX, y: dropdownY, index });
  };

  const recalculateHexPositions = (hexList) => {
    const colsPerRow = Math.floor((CANVAS_WIDTH - HEX_RADIUS) / (HEX_RADIUS * 2 + PADDING));
    return hexList.map((hex, index) => {
      const col = index % colsPerRow;
      const row = Math.floor(index / colsPerRow);
      const x = HEX_RADIUS + col * (HEX_RADIUS * 2 + PADDING);
      const y = HEX_RADIUS + row * (ROW_HEIGHT + PADDING);
      return { ...hex, x, y };
    });
  };

  const addPlayer = () => {
    setShowForm(true);
  };

  const submitPlayer = () => {
    const newHexagons = [...hexagons, { ...formData }];
    const updated = recalculateHexPositions(newHexagons);
    if (updated[updated.length - 1].y + HEX_RADIUS <= CANVAS_HEIGHT) {
      setHexagons(updated);
      setShowForm(false);
      setFormData({ name: "", hqLevel: 15, playerType: "R1", commander: false });
    } else {
      alert("No more space to add hexagons.");
    }
  };

  const handleEdit = () => {
    alert("Edit clicked on hexagon " + dropdown.index);
    setDropdown(null);
  };

  const handleDelete = () => {
    const updated = hexagons.filter((_, i) => i !== dropdown.index);
    setHexagons(recalculateHexPositions(updated));
    setDropdown(null);
  };

  const handleSave = () => {
    setIsEditMode(false);
    setDropdown(null);
  };

  return (
    <div ref={containerRef} style={{ position: "relative", padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={addPlayer}>New Player</button>
        {!isEditMode ? (
          <button
            onClick={() => setIsEditMode(true)}
            style={{ fontSize: "14px", fontWeight: "bold", padding: "6px 12px", display: "flex", alignItems: "center", gap: 6 }}
          >
            ✏️ Edit Mode
          </button>
        ) : (
          <button
            onClick={handleSave}
            style={{ fontSize: "14px", fontWeight: "bold", padding: "6px 12px", display: "flex", alignItems: "center", gap: 6 }}
          >
            💾 Save
          </button>
        )}
      </div>

      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ border: "1px solid #ccc", marginTop: 10 }}
      />

      {isEditMode &&
        hexagons.map(({ x, y }, index) => (
          <button
            key={index}
            onClick={() => handleEditClick(x + HEX_RADIUS - 10, y - HEX_RADIUS + 10, index)}
            style={{
              position: "absolute",
              top: y - HEX_RADIUS + 77,
              left: x + HEX_RADIUS - 13,
              fontSize: "10px",
              padding: "2px 4px",
              borderRadius: "50%",
              border: "1px solid #999",
              background: "#fff",
              cursor: "pointer",
              zIndex: 5,
            }}
          >
            ✏️
          </button>
        ))}

      {dropdown && (
        <div
          style={{
            position: "absolute",
            top: dropdown.y,
            left: dropdown.x,
            background: "white",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            border: "1px solid #ccc",
            borderRadius: 4,
            padding: 8,
            zIndex: 10,
          }}
        >
          <button
            onClick={handleEdit}
            style={{
              display: "block",
              fontWeight: "bold",
              fontSize: "12px",
              padding: "4px 8px",
              marginBottom: "4px",
            }}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            style={{
              display: "block",
              fontWeight: "bold",
              fontSize: "12px",
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            🗑 Delete
          </button>
        </div>
      )}

      {showForm && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          padding: 20,
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          zIndex: 1000,
          width: 320
        }}>
          <h3 style={{ margin: "0 0 10px" }}>New Player</h3>
          <div style={{ marginBottom: 8 }}>
            <label>Player Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: "100%", padding: 4 }}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label>HQ Level: {formData.hqLevel}</label>
            <input
              type="range"
              min="1"
              max="30"
              value={formData.hqLevel}
              onChange={(e) => setFormData({ ...formData, hqLevel: parseInt(e.target.value) })}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label>Player Type:</label>
            <select
              value={formData.playerType}
              onChange={(e) => setFormData({ ...formData, playerType: e.target.value })}
              style={{ width: "100%", padding: 4 }}
            >
              <option value="R1">R1</option>
              <option value="R2">R2</option>
              <option value="R3">R3</option>
              <option value="R4">R4</option>
              <option value="R5">R5</option>
            </select>
          </div>
          <div style={{ marginBottom: 8 }}>
            <label>
              <input
                type="checkbox"
                checked={formData.commander}
                onChange={(e) => setFormData({ ...formData, commander: e.target.checked })}
              />
              Commander
            </label>
          </div>
          <button onClick={submitPlayer} style={{ fontWeight: "bold", padding: "6px 12px" }}>Add Player</button>
        </div>
      )}
    </div>
  );
}

export default App;

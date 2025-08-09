import React, { useState } from "react";

function App() {
  // Start with some sample data, but could be from API
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault(); // Needed for drop
    if (draggedIndex === index) return;

    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(index, 0, movedItem);

    setDraggedIndex(index);
    setItems(updatedItems);
  };

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem("");
    }
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Dynamic Drag & Drop List</h2>

      {/* Add new item */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          style={{ padding: "5px", marginRight: "5px" }}
        />
        <button onClick={addItem} style={{ padding: "5px 10px" }}>
          Add
        </button>
      </div>

      {/* Draggable items */}
      {items.length === 0 ? (
        <p style={{ color: "gray" }}>No items yet. Add some!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((item, index) => (
            <li
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              style={{
                padding: "10px",
                margin: "5px 0",
                background: "#f5f5f5",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "grab",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {item}
              <button
                onClick={() => removeItem(index)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "3px 7px",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

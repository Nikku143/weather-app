import React, { useState } from "react";

export default function App() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handleLike = () => {
    if (liked) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
    setLiked(!liked);

    // Trigger animation
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300); // matches animation duration
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "18px",
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    backgroundColor: liked ? "#e74c3c" : "#3498db",
    color: "#fff",
    transition: "transform 0.3s ease, background-color 0.3s ease",
    transform: animating ? "scale(1.2)" : "scale(1)",
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleLike} style={buttonStyle}>
        {liked ? "❤️ Liked" : "🤍 Like"}
      </button>
      <p style={{ marginTop: "10px", fontSize: "18px" }}>Likes: {count}</p>
    </div>
  );
}

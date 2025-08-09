import React, { useState, useEffect } from "react";

export default function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress < 100) {
      const timer = setInterval(() => {
        setProgress((prev) => prev + 10);
      }, 500);
      return () => clearInterval(timer);
    }
  }, [progress]);

  const containerStyle = {
    width: "80%",
    backgroundColor: "#ddd",
    borderRadius: "10px",
    margin: "50px auto",
    padding: "3px",
  };

  const barStyle = {
    width: `${progress}%`,
    height: "30px",
    backgroundColor: progress < 100 ? "#4caf50" : "orange",
    borderRadius: "10px",
    textAlign: "center",
    color: "white",
    lineHeight: "30px",
    transition: "width 0.5s ease",
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>React Progress Bar</h2>
      <div style={containerStyle}>
        <div style={barStyle}>{progress}%</div>
      </div>
      <button onClick={() => setProgress(0)}>Reset</button>
    </div>
  );
}

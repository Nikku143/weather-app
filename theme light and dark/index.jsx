import React, { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const appStyle = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: darkMode ? "#222" : "#fff",
    color: darkMode ? "#fff" : "#000",
    transition: "all 0.3s ease",
  };

  const buttonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: darkMode ? "#444" : "#ddd",
    color: darkMode ? "#fff" : "#000",
  };

  return (
    <div style={appStyle}>
      <h1>{darkMode ? "Dark Mode" : "Light Mode"}</h1>
      <button onClick={toggleTheme} style={buttonStyle}>
        Toggle Theme
      </button>
    </div>
  );
}

export default App;

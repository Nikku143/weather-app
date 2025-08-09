// App.js
import React from "react";

export default function App() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    margin: 0,
  };

  const headerFooterStyle = {
    backgroundColor: "#333",
    color: "white",
    padding: "15px",
    textAlign: "center",
  };

  const mainStyle = {
    display: "flex",
    flex: 1,
    flexWrap: "wrap", // Makes it responsive
  };

  const sidebarStyle = {
    backgroundColor: "#f4f4f4",
    padding: "15px",
    flex: "1 1 250px", // min 250px, grows if needed
    boxSizing: "border-box",
  };

  const contentStyle = {
    flex: "3 1 500px", // min 500px, grows if needed
    padding: "15px",
    boxSizing: "border-box",
  };

  return (
    <div style={containerStyle}>
      <header style={headerFooterStyle}>Header</header>
      <div style={mainStyle}>
        <aside style={sidebarStyle}>Sidebar</aside>
        <section style={contentStyle}>Main Content</section>
      </div>
      <footer style={headerFooterStyle}>Footer</footer>
    </div>
  );
}

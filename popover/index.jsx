import React, { useState, useRef, useEffect } from "react";

export default function App() {
  const [show, setShow] = useState(false);
  const popoverRef = useRef();

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ padding: "50px" }}>
      <button
        onClick={() => setShow(!show)}
        style={{
          padding: "10px 15px",
          cursor: "pointer",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Toggle Popover
      </button>

      {show && (
        <div
          ref={popoverRef}
          style={{
            position: "absolute",
            top: "90px",
            left: "50px",
            background: "#fff",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
            zIndex: 100,
          }}
        >
          <strong>Hello!</strong>
          <p>This is a simple popover content.</p>
          <button
            onClick={() => setShow(false)}
            style={{
              padding: "5px 10px",
              background: "red",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

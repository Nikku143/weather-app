import React, { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleCalculate = () => {
    try {
      setInput(eval(input).toString()); // Note: eval is for demo only
    } catch {
      setInput("Error");
    }
  };

  return (
    <div style={styles.container}>
      <h2>React Calculator</h2>
      <input type="text" value={input} style={styles.input} readOnly />
      <div style={styles.buttonContainer}>
        {[
          "7",
          "8",
          "9",
          "/",
          "4",
          "5",
          "6",
          "*",
          "1",
          "2",
          "3",
          "-",
          "0",
          ".",
          "+",
          "=",
        ].map((btn) =>
          btn === "=" ? (
            <button key={btn} style={styles.button} onClick={handleCalculate}>
              {btn}
            </button>
          ) : (
            <button
              key={btn}
              style={styles.button}
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          )
        )}
        <button
          style={{ ...styles.button, background: "red", color: "white" }}
          onClick={handleClear}
        >
          C
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "250px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "10px",
    background: "#f4f4f4",
  },
  input: {
    width: "100%",
    height: "40px",
    fontSize: "18px",
    marginBottom: "10px",
    textAlign: "right",
    padding: "5px",
  },
  buttonContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "5px",
  },
  button: {
    padding: "15px",
    fontSize: "18px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "1px solid #ccc",
    background: "#fff",
  },
};

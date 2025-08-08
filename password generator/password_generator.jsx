import React, { useState } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    let chars = "";
    if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+";

    if (!chars) {
      alert("Please select at least one option!");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * chars.length);
      newPassword += chars[index];
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Copied to clipboard!");
  };

  return (
    <div style={styles.container}>
      <h2>Dynamic Password Generator</h2>

      <input
        type="number"
        min="4"
        max="50"
        value={length}
        onChange={(e) => setLength(e.target.value)}
        placeholder="Password Length"
        style={styles.input}
      />

      <div>
        <label>
          <input
            type="checkbox"
            checked={includeUpper}
            onChange={() => setIncludeUpper(!includeUpper)}
            style={styles.checkbox}
          />
          Include Uppercase
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={includeLower}
            onChange={() => setIncludeLower(!includeLower)}
            style={styles.checkbox}
          />
          Include Lowercase
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
            style={styles.checkbox}
          />
          Include Numbers
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
            style={styles.checkbox}
          />
          Include Symbols
        </label>
      </div>

      <button style={styles.button} onClick={generatePassword}>
        Generate
      </button>

      {password && (
        <>
          <div style={styles.passwordBox}>{password}</div>
          <button style={styles.button} onClick={copyToClipboard}>
            Copy
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
    maxWidth: 400,
    margin: "40px auto",
    background: "#f9f9f9",
    borderRadius: 10,
    fontFamily: "Arial",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  input: {
    margin: "10px 0",
    padding: 8,
    width: "100%",
  },
  checkbox: {
    marginRight: 8,
  },
  button: {
    padding: "10px 20px",
    margin: "10px 5px",
    cursor: "pointer",
    border: "none",
    borderRadius: 5,
    backgroundColor: "#007bff",
    color: "white",
    fontSize: 16,
  },
  passwordBox: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    wordBreak: "break-all",
  },
};

export default PasswordGenerator;

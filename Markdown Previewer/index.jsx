//  npm install marked

import React, { useState } from "react";
import { marked } from "marked";

const App = () => {
  const [markdown, setMarkdown] = useState("# Hello, Markdown!");

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Markdown Previewer</h1>
      <div style={styles.editorPreviewWrapper}>
        {/* Markdown Editor */}
        <textarea
          style={styles.textarea}
          value={markdown}
          onChange={handleChange}
        />

        {/* Markdown Preview */}
        <div
          style={styles.preview}
          dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        />
      </div>
    </div>
  );
};

// Inline CSS
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  editorPreviewWrapper: {
    display: "flex",
    gap: "20px",
  },
  textarea: {
    flex: 1,
    height: "400px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  preview: {
    flex: 1,
    height: "400px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#f8f8f8",
    overflowY: "auto",
  },
};

export default App;

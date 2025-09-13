import React, { useState, useEffect } from "react";

function ChatUI() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "me", time: new Date() }]);
    setInput("");
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "20px auto",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <div
        style={{
          height: "300px",
          overflowY: "auto",
          borderBottom: "1px solid #ccc",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{ textAlign: msg.sender === "me" ? "right" : "left" }}
          >
            <p
              style={{
                margin: "5px",
                padding: "5px",
                display: "inline-block",
                background: "#f1f1f1",
                borderRadius: "5px",
              }}
            >
              {msg.text}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "75%", padding: "5px" }}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          style={{ width: "20%", marginLeft: "5px" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatUI;

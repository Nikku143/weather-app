// dummy meme generator api for free
// https://api.imgflip.com/get_memes

import React, { useState, useEffect } from "react";

export default function MemeGenerator() {
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

  // Fetch meme templates
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setMemes(data.data.memes));
  }, []);

  // Select random meme
  const generateMeme = () => {
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    setSelectedMeme(randomMeme);
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h1>Meme Generator</h1>
      <div style={{ margin: "20px" }}>
        <input
          type="text"
          placeholder="Top text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
          style={{ margin: "5px", padding: "5px" }}
        />
        <input
          type="text"
          placeholder="Bottom text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
          style={{ margin: "5px", padding: "5px" }}
        />
        <br />
        <button
          onClick={generateMeme}
          style={{ marginTop: "10px", padding: "10px 20px", cursor: "pointer" }}
        >
          Generate Meme
        </button>
      </div>

      {selectedMeme && (
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginTop: "20px",
          }}
        >
          <img
            src={selectedMeme.url}
            alt="meme"
            style={{ width: "400px", height: "auto" }}
          />
          <h2
            style={{
              position: "absolute",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              textShadow: "2px 2px 4px black",
            }}
          >
            {topText}
          </h2>
          <h2
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              textShadow: "2px 2px 4px black",
            }}
          >
            {bottomText}
          </h2>
        </div>
      )}
    </div>
  );
}

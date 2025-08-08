import React, { useState } from "react";

function App() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const starStyle = {
    fontSize: "2rem",
    cursor: "pointer",
    transition: "color 0.2s",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    padding: "20px",
  };

  return (
    <div>
      <h2 style={{ padding: "20px", fontFamily: "Arial" }}>
        Rate this product
      </h2>
      <div style={containerStyle}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              ...starStyle,
              color: star <= (hover || rating) ? "#ffc107" : "#ccc",
            }}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        ))}
      </div>
      <p style={{ paddingLeft: "20px", fontFamily: "Arial" }}>
        {rating > 0 ? `You rated this ${rating} star(s).` : "Click to rate"}
      </p>
    </div>
  );
}

export default App;

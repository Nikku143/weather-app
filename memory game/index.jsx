import React, { useState } from "react";

export default function App() {
  const emojis = ["🍎", "🍌", "🍇", "🍓"];
  const [cards, setCards] = useState(
    [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }))
  );
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);

  function handleClick(card) {
    if (card.flipped || card.matched) return;

    const flippedCard = { ...card, flipped: true };
    const newCards = cards.map((c) => (c.id === card.id ? flippedCard : c));
    setCards(newCards);

    if (!first) {
      setFirst(flippedCard);
    } else if (!second) {
      setSecond(flippedCard);
      if (first.emoji === flippedCard.emoji) {
        setCards((prev) =>
          prev.map((c) =>
            c.emoji === first.emoji ? { ...c, matched: true } : c
          )
        );
        setFirst(null);
        setSecond(null);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === flippedCard.id
                ? { ...c, flipped: false }
                : c
            )
          );
          setFirst(null);
          setSecond(null);
        }, 800);
      }
    }
  }

  function resetGame() {
    setCards(
      [...emojis, ...emojis]
        .sort(() => Math.random() - 0.5)
        .map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }))
    );
    setFirst(null);
    setSecond(null);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Memory Game</h1>
      <button onClick={resetGame}>Reset</button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 80px)",
          gap: "10px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleClick(card)}
            style={{
              width: "80px",
              height: "100px",
              background: card.flipped || card.matched ? "#fff" : "#ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2rem",
              border: "1px solid #000",
              cursor: "pointer",
            }}
          >
            {card.flipped || card.matched ? card.emoji : "❔"}
          </div>
        ))}
      </div>
    </div>
  );
}

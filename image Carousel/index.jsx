import React, { useState } from "react";

function App() {
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s",
    "https://via.placeholder.com/600x300/7fbfff/333333?text=Slide+2",
    "https://via.placeholder.com/600x300/7fff7f/333333?text=Slide+3",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div style={styles.container}>
      <button onClick={prevSlide} style={styles.button}>
        ❮
      </button>
      <img src={images[currentIndex]} alt="carousel" style={styles.image} />
      <button onClick={nextSlide} style={styles.button}>
        ❯
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    backgroundColor: "#f0f0f0",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "650px",
    margin: "50px auto",
  },
  image: {
    width: "600px",
    height: "300px",
    borderRadius: "8px",
    objectFit: "cover",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },
  button: {
    fontSize: "24px",
    background: "#333",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default App;

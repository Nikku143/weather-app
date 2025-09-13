// dummy api use example: https://dummyjson.com/products

import React, { useState, useEffect } from "react";

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100") // fetch products
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        // Convert products into image objects
        const allImages = data.products.flatMap((product) =>
          product.images.map((url) => ({
            url,
            title: product.title,
            category: product.category,
          }))
        );
        setImages(allImages);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const categories = ["All", ...new Set(images.map((img) => img.category))];

  const filteredImages = images.filter((img) => {
    const matchesCategory = filter === "All" || img.category === filter;
    const matchesSearch = img.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>React Image Gallery (DummyJSON API)</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search images..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", marginBottom: "10px", width: "200px" }}
      />

      {/* Filters */}
      <div style={{ marginBottom: "20px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: "8px 12px",
              marginRight: "10px",
              marginBottom: "10px",
              backgroundColor: filter === cat ? "#007BFF" : "#e0e0e0",
              color: filter === cat ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {filteredImages.map((img, idx) => (
          <div key={idx} style={{ cursor: "pointer" }}>
            <img
              src={img.url}
              alt={img.title}
              style={{
                width: "300px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
              onClick={() => setModalImage(img)}
            />
            <p style={{ textAlign: "center", margin: "5px 0" }}>{img.title}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div style={{ position: "relative" }}>
            <img
              src={modalImage.url}
              alt={modalImage.title}
              style={{
                maxWidth: "90vw",
                maxHeight: "80vh",
                borderRadius: "6px",
              }}
            />
            <p
              style={{ color: "white", textAlign: "center", marginTop: "10px" }}
            >
              {modalImage.title}
            </p>
            <button
              onClick={() => setModalImage(null)}
              style={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

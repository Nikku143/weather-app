import React, { useState, useEffect } from "react";

const App = () => {
  const [gifs, setGifs] = useState([]);
  const [search, setSearch] = useState("funny");
  const [loading, setLoading] = useState(false);

  const API_KEY = "yCIqeSS7a5fmHffZ4bQANJJwtYkOyzRw";

  const fetchGifs = async (query) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=12&rating=g`
      );
      const data = await res.json();
      setGifs(data.data);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGifs(search);
  }, []);

  const handleSearch = () => {
    fetchGifs(search);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#ff5a5f" }}>Giphy App</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search GIFs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#ff5a5f",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading GIFs...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {gifs.length > 0 ? (
            gifs.map((gif) => (
              <div
                key={gif.id}
                style={{
                  backgroundColor: "#fff",
                  padding: "10px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={gif.images.fixed_height.url}
                  alt={gif.title}
                  style={{ width: "100%", borderRadius: "10px" }}
                />
                <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                  {gif.title}
                </p>
              </div>
            ))
          ) : (
            <p style={{ gridColumn: "1 / -1" }}>No GIFs found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;

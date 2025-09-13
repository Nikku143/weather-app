// use dummy api for news free https://gnews.io/docs/

import React, { useEffect, useState } from "react";

const NewsAggregator = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("example"); // default search

  const API_KEY = "18fa2aa6f8b1e41ede4e252f1e7677fb";

  const fetchNews = (searchTerm) => {
    setLoading(true);
    fetch(
      `https://gnews.io/api/v4/search?q=${searchTerm}&lang=en&country=us&max=10&apikey=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) {
          setArticles(data.articles);
          setError(null);
        } else {
          setError("No articles found.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching news.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNews(query);
  }, []); // initial fetch

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      fetchNews(query);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>News Aggregator</h1>

      <form
        onSubmit={handleSearch}
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news..."
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {articles.map((article, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
            )}
            <div style={{ padding: "15px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
                {article.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#555",
                  marginBottom: "10px",
                }}
              >
                {article.description || "No description available."}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#007bff",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsAggregator;

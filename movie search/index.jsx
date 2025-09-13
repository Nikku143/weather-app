import React, { useEffect, useState } from "react";

// Movie Search App (single-file React component)
// - Uses ONLY inline styles (no external or internal CSS files)
// - Uses OMDB API. API key provided by user: 549a19d
// - Features: search, results grid, pagination, click-to-view details, loading & error states

export default function MovieSearchApp() {
  const API_KEY = "549a19d"; // from the user
  const API_BASE = "https://www.omdbapi.com/";

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null); // full movie details

  useEffect(() => {
    if (query.trim() === "") {
      setMovies([]);
      setTotalResults(0);
      setError("");
      return;
    }
    fetchMovies(query, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function fetchMovies(q, pg = 1) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${API_BASE}?apikey=${API_KEY}&s=${encodeURIComponent(q)}&page=${pg}`
      );
      const data = await res.json();
      if (data.Response === "True") {
        setMovies(data.Search || []);
        setTotalResults(parseInt(data.totalResults || "0", 10));
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error || "No results");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }

  async function fetchDetails(imdbID) {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}?apikey=${API_KEY}&i=${imdbID}&plot=full`
      );
      const data = await res.json();
      if (data.Response === "True") setSelected(data);
      else setError(data.Error || "Could not fetch details");
    } catch (err) {
      setError("Network error while fetching details.");
    } finally {
      setLoading(false);
    }
  }

  function onSearch(e) {
    e.preventDefault();
    if (query.trim() === "") return;
    setPage(1);
    fetchMovies(query, 1);
  }

  const totalPages = Math.ceil(totalResults / 10);

  // Inline styles
  const styles = {
    app: {
      fontFamily: "Arial, Helvetica, sans-serif",
      padding: 20,
      maxWidth: 1000,
      margin: "0 auto",
      color: "#111",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 18,
    },
    title: {
      fontSize: 24,
      fontWeight: 700,
      letterSpacing: 0.2,
    },
    form: {
      display: "flex",
      gap: 8,
      alignItems: "center",
    },
    input: {
      padding: "8px 12px",
      fontSize: 14,
      border: "1px solid #ccc",
      borderRadius: 6,
      outline: "none",
      width: 260,
    },
    btn: {
      padding: "8px 12px",
      fontSize: 14,
      borderRadius: 6,
      border: "none",
      cursor: "pointer",
      background: "#1e88e5",
      color: "white",
    },
    smallBtn: {
      padding: "6px 10px",
      fontSize: 13,
      borderRadius: 6,
      border: "none",
      cursor: "pointer",
      background: "#f5f5f5",
    },
    meta: { marginTop: 8, color: "#555", fontSize: 13 },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
      gap: 14,
      marginTop: 16,
    },
    card: {
      border: "1px solid #e0e0e0",
      borderRadius: 8,
      padding: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      minHeight: 260,
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    },
    poster: {
      width: 140,
      height: 190,
      objectFit: "cover",
      borderRadius: 4,
      marginBottom: 8,
      background: "#ddd",
    },
    titleCard: { fontSize: 14, fontWeight: 600, marginBottom: 6 },
    year: { fontSize: 12, color: "#666" },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 18,
    },
    pagination: { display: "flex", gap: 8, alignItems: "center" },
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: 20,
    },
    modal: {
      width: "min(900px, 97%)",
      maxHeight: "90vh",
      overflowY: "auto",
      background: "white",
      borderRadius: 10,
      padding: 18,
      boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
      display: "flex",
      gap: 16,
    },
    detailsPoster: {
      width: 220,
      height: 320,
      objectFit: "cover",
      borderRadius: 6,
    },
    detailsContent: { flex: 1 },
  };

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <div style={styles.title}>Movie Search (OMDB)</div>
        <form onSubmit={onSearch} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Search movies, e.g. Batman"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" style={styles.btn}>
            Search
          </button>
        </form>
      </div>

      <div style={styles.meta}>
        {loading
          ? "Loading..."
          : error
          ? `Error: ${error}`
          : totalResults > 0
          ? `${totalResults} results`
          : "Enter a query and press Search"}
      </div>

      <div style={styles.grid}>
        {movies.map((m) => (
          <div key={m.imdbID} style={styles.card}>
            <img
              src={
                m.Poster !== "N/A"
                  ? m.Poster
                  : `https://via.placeholder.com/140x190?text=No+Image`
              }
              alt={m.Title}
              style={styles.poster}
            />
            <div style={styles.titleCard}>{m.Title}</div>
            <div style={styles.year}>
              {m.Year} • {m.Type}
            </div>
            <div style={{ marginTop: 10 }}>
              <button
                style={styles.smallBtn}
                onClick={() => fetchDetails(m.imdbID)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div style={styles.footer}>
          <div style={styles.pagination}>
            <button
              style={{
                ...styles.smallBtn,
                opacity: page === 1 ? 0.5 : 1,
                cursor: page === 1 ? "not-allowed" : "pointer",
              }}
              onClick={() => page > 1 && setPage((p) => p - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            <div style={{ fontSize: 14 }}>{`Page ${page} / ${totalPages}`}</div>
            <button
              style={{
                ...styles.smallBtn,
                opacity: page === totalPages ? 0.5 : 1,
                cursor: page === totalPages ? "not-allowed" : "pointer",
              }}
              onClick={() => page < totalPages && setPage((p) => p + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>

          <div style={{ fontSize: 13, color: "#444" }}>
            Tip: click <span style={{ fontWeight: 700 }}>View</span> to see
            details.
          </div>
        </div>
      )}

      {selected && (
        <div style={styles.overlay} onClick={() => setSelected(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <img
              src={
                selected.Poster !== "N/A"
                  ? selected.Poster
                  : `https://via.placeholder.com/220x320?text=No+Image`
              }
              alt={selected.Title}
              style={styles.detailsPoster}
            />
            <div style={styles.detailsContent}>
              <h2 style={{ margin: "0 0 6px 0" }}>
                {selected.Title}{" "}
                <span style={{ fontSize: 14, color: "#666" }}>
                  ({selected.Year})
                </span>
              </h2>
              <div style={{ marginBottom: 8, color: "#777" }}>
                {selected.Runtime} • {selected.Genre} • {selected.Rated}
              </div>
              <div style={{ marginBottom: 12 }}>{selected.Plot}</div>

              <div style={{ fontSize: 13, color: "#444" }}>
                <div>
                  <strong>Director:</strong> {selected.Director}
                </div>
                <div>
                  <strong>Writer:</strong> {selected.Writer}
                </div>
                <div>
                  <strong>Actors:</strong> {selected.Actors}
                </div>
                <div>
                  <strong>Language:</strong> {selected.Language}
                </div>
                <div>
                  <strong>IMDB Rating:</strong> {selected.imdbRating} / 10
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <button style={styles.btn} onClick={() => setSelected(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// www.themealdb.com

import React, { useState, useEffect } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState(null);

  // Fetch recipes
  const searchRecipes = async (searchText) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    );
    const data = await res.json();
    setRecipes(data.meals || []);
    setSelected(null);
  };

  // Load Arrabiata by default
  useEffect(() => {
    searchRecipes("Arrabiata");
  }, []);

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>🍲 Recipe App</h1>

      {/* Search Bar */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={() => searchRecipes(query)}
          style={{
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "tomato",
            color: "white",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* Recipe List */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {recipes.map((meal) => (
          <div
            key={meal.idMeal}
            onClick={() => setSelected(meal)}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3>{meal.strMeal}</h3>
          </div>
        ))}
      </div>

      {/* Selected Recipe Details */}
      {selected && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            background: "#f9f9f9",
          }}
        >
          <h2>{selected.strMeal}</h2>
          <img
            src={selected.strMealThumb}
            alt={selected.strMeal}
            style={{ width: "300px", borderRadius: "10px" }}
          />
          <h3>Ingredients</h3>
          <ul>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
              const ingredient = selected[`strIngredient${i}`];
              const measure = selected[`strMeasure${i}`];
              return ingredient ? (
                <li key={i}>
                  {ingredient} - {measure}
                </li>
              ) : null;
            })}
          </ul>
          <h3>Instructions</h3>
          <p style={{ whiteSpace: "pre-line" }}>{selected.strInstructions}</p>
        </div>
      )}
    </div>
  );
}

export default App;

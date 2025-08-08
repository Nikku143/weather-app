// You’ll need a free API key from https://openweathermap.org/api

import React, { useState } from "react";

const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API key

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        setWeather(null);
        alert("City not found!");
      }
    } catch (error) {
      alert("Error fetching weather!");
    }
  };

  return (
    <div style={styles.app}>
      <h2>🌤️ Weather App</h2>
      <div style={styles.inputSection}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />
        <button onClick={fetchWeather} style={styles.button}>
          Search
        </button>
      </div>
      {weather && (
        <div style={styles.weatherBox}>
          <h3>
            {weather.name}, {weather.sys.country}
          </h3>
          <p>🌡️ {weather.main.temp} °C</p>
          <p>☁️ {weather.weather[0].main}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬️ Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  app: {
    textAlign: "center",
    padding: "2rem",
    fontFamily: "sans-serif",
    background: "#f0f8ff",
    minHeight: "100vh",
  },
  inputSection: {
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
    width: "200px",
    marginRight: "10px",
  },
  button: {
    padding: "8px 15px",
    background: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  weatherBox: {
    marginTop: "20px",
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    display: "inline-block",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
};

export default App;

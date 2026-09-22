import { useState } from "react";
import Navbar from "./components/Navbar";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Favorites from "./components/Favorites";
import Forecast from "./components/Forecast";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);

  return (
    <div className="app">
      <Navbar />

      <div
        className="auth-container"
        id="account"
      >
        <h2>🔐 Account Access</h2>

        <div className="auth-section">
          <Login />
          <Register />
        </div>
      </div>

      <main
        className="main-content"
        id="home"
      >
        <h1>AI WeatherWise</h1>

        <p>
          Weather information and AI insights
        </p>

        <div id="weather">
          <SearchBar
            setWeather={setWeather}
          />

          <WeatherCard
            weather={weather}
          />

          <Forecast
            city={weather?.city}
          />
        </div>

        <div id="favorites">
          <Favorites
            onWeatherChange={setWeather}
          />
        </div>

        <footer className="footer">
          <p>
            ©️ 2026 AI WeatherWise |
            Weather & AI Insights
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
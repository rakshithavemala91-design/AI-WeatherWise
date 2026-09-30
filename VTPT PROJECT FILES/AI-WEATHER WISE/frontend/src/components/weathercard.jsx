import API from "../api";

function WeatherCard({ weather }) {
  const handleFavorite = async () => {
    try {
      await API.post("/locations", {
        city: weather.city,
        country: weather.country,
      });

      alert("Location added to favorites ⭐");
    } catch (error) {
      console.error("Favorite error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to add location"
      );
    }
  };

  if (!weather) {
    return (
      <div className="weather-card">
        <h2>🌤️ Weather Information</h2>

        <p>
          Search for a city to see weather details.
        </p>
      </div>
    );
  }

  const aiUnavailable =
    !weather.aiInsight ||
    weather.aiInsight.includes(
      "temporarily unavailable"
    ) ||
    weather.aiInsight.includes("quota");

  const condition =
    weather.weather.toLowerCase();

  let weatherIcon = "🌤️";

  if (condition.includes("clear")) {
    weatherIcon = "☀️";
  } else if (
    condition.includes("cloud") ||
    condition.includes("overcast")
  ) {
    weatherIcon = "☁️";
  } else if (
    condition.includes("rain") ||
    condition.includes("drizzle")
  ) {
    weatherIcon = "🌧️";
  } else if (
    condition.includes("thunderstorm") ||
    condition.includes("storm")
  ) {
    weatherIcon = "⛈️";
  } else if (condition.includes("snow")) {
    weatherIcon = "❄️";
  } else if (
    condition.includes("mist") ||
    condition.includes("fog") ||
    condition.includes("haze")
  ) {
    weatherIcon = "🌫️";
  }

  const formatTime = (timestamp) => {
    if (!timestamp) {
      return "Not available";
    }

    return new Date(
      timestamp * 1000
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const lastUpdated =
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="weather-card">
      <h2>
        📍 {weather.city}, {weather.country}
      </h2>

      <div className="weather-icon">
        {weatherIcon}
      </div>

      <p className="weather-condition">
        {weather.weather}
      </p>

      <button
        className="favorite-btn"
        onClick={handleFavorite}
      >
        ⭐ Add to Favorites
      </button>

      <div className="weather-details">
        <p className="temperature">
          🌡️ {weather.temperature}°C
        </p>

        <p>
          🤗 Feels Like: {weather.feelsLike}°C
        </p>

        <p>
          💧 Humidity: {weather.humidity}%
        </p>

        <p>
          💨 Wind Speed: {weather.windSpeed} m/s
        </p>

        <p>
          🎚️ Pressure: {weather.pressure} hPa
        </p>

        <p>
          ☁️ Cloudiness: {weather.cloudiness}%
        </p>

        {weather.visibility !== null &&
          weather.visibility !== undefined && (
            <p>
              👁️ Visibility: {weather.visibility} km
            </p>
          )}

        <p>
          🌅 Sunrise: {formatTime(weather.sunrise)}
        </p>

        <p>
          🌇 Sunset: {formatTime(weather.sunset)}
        </p>
      </div>

      <p className="last-updated">
        🕒 Last updated: {lastUpdated}
      </p>

      <div className="ai-insight">
        <h3>🤖 AI Weather Insight</h3>

        {aiUnavailable ? (
          <p>
            AI insights are temporarily unavailable
            because the Gemini API free-tier quota has
            been reached.
            <br />
            Weather information is still available.
          </p>
        ) : (
          <p>{weather.aiInsight}</p>
        )}
      </div>
    </div>
  );
}

export default WeatherCard;
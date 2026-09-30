import { useEffect, useState } from "react";
import API from "../api";

function Forecast({ city }) {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!city) {
      setForecast([]);
      setErrorMessage("");
      return;
    }

    const fetchForecast = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await API.get(
          "/weather/forecast",
          {
            params: {
              city: city,
            },
          }
        );

        setForecast(response.data.forecast);
      } catch (error) {
        console.error(
          "Forecast error:",
          error
        );

        setForecast([]);

        setErrorMessage(
          error.response?.data?.message ||
            "Unable to load forecast data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  const getWeatherIcon = (weather) => {
    const condition = weather.toLowerCase();

    if (condition.includes("clear")) {
      return "☀️";
    }

    if (
      condition.includes("thunderstorm") ||
      condition.includes("storm")
    ) {
      return "⛈️";
    }

    if (
      condition.includes("rain") ||
      condition.includes("drizzle")
    ) {
      return "🌧️";
    }

    if (condition.includes("snow")) {
      return "❄️";
    }

    if (
      condition.includes("mist") ||
      condition.includes("fog") ||
      condition.includes("haze")
    ) {
      return "🌫️";
    }

    if (
      condition.includes("cloud") ||
      condition.includes("overcast")
    ) {
      return "☁️";
    }

    return "🌤️";
  };

  const formatForecastDate = (date, index) => {
    if (index === 0) {
      return "Today";
    }

    if (index === 1) {
      return "Tomorrow";
    }

    return new Date(
      `${date}T12:00:00`
    ).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
  };

  if (!city) {
    return null;
  }

  if (loading) {
    return (
      <div className="forecast">
        <h2>📅 5-Day Forecast</h2>

        <div className="forecast-loading">
          Loading forecast...
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="forecast">
        <h2>📅 5-Day Forecast</h2>

        <div className="forecast-error">
          ⚠️ {errorMessage}
        </div>
      </div>
    );
  }

  if (forecast.length === 0) {
    return null;
  }

  return (
    <div className="forecast">
      <h2>📅 5-Day Forecast</h2>

      <div className="forecast-grid">
        {forecast.map((day, index) => (
          <div
            className="forecast-card"
            key={day.date}
          >
            <h3>
              {formatForecastDate(
                day.date,
                index
              )}
            </h3>

            <p className="forecast-icon">
              {getWeatherIcon(day.weather)}
            </p>

            <p>
              {day.weather}
            </p>

            <p>
              🌡️{" "}
              {Number(day.temperature).toFixed(1)}°C
            </p>

            <p>
              💧 {day.humidity}%
            </p>

            <p>
              💨 {day.windSpeed} m/s
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
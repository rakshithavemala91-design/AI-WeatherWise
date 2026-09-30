import { useState } from "react";
import API from "../api";

function SearchBar({ setWeather }) {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      alert("Please enter a city name");
      return;
    }

    setLoading(true);

    try {
      const response = await API.get(
        `/weather?city=${encodeURIComponent(
          trimmedCity
        )}`
      );

      setWeather(response.data);
    } catch (error) {
      console.error(
        "Weather search error:",
        error
      );

      const status = error.response?.status;
      const message =
        error.response?.data?.message;

      if (status === 404) {
        alert(
          "City not found. Please enter a valid city name."
        );
      } else if (status === 400) {
        alert("Please enter a city name.");
      } else if (message) {
        alert(message);
      } else {
        alert(
          "Unable to fetch weather data"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCity("");
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) =>
          setCity(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />

      {city && (
        <button
          type="button"
          className="clear-btn"
          onClick={handleClear}
        >
          ✕
        </button>
      )}

      <button
        type="button"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? "Loading..." : "Search"}
      </button>
    </div>
  );
}

export default SearchBar;
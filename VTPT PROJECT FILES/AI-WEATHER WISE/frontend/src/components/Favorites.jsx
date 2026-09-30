import { useEffect, useState } from "react";
import API from "../api";

function Favorites({ onWeatherChange }) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFavorites = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLocations([]);
      return;
    }

    try {
      const response = await API.get(
        "/locations"
      );

      setLocations(response.data);
    } catch (error) {
      console.error(
        "Favorites error:",
        error
      );

      setLocations([]);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(
        `/locations/${id}`
      );

      alert(
        "Location removed from favorites 🗑️"
      );

      fetchFavorites();
    } catch (error) {
      console.error(
        "Delete favorite error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to remove location"
      );
    }
  };

  const handleFavoriteClick = async (
    city
  ) => {
    setLoading(true);

    try {
      const response = await API.get(
        "/weather",
        {
          params: {
            city: city,
          },
        }
      );

      onWeatherChange(response.data);
    } catch (error) {
      console.error(
        "Favorite weather error:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          "Unable to fetch weather data"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="favorites">
      <h2>⭐ Favorite Locations</h2>

      {locations.length === 0 ? (
        <div className="favorites-empty">
          <p>⭐</p>

          <p>
            No favorite locations yet.
          </p>

          <span>
            Search for a city and add it
            to your favorites.
          </span>
        </div>
      ) : (
        <div className="favorite-list">
          {locations.map((location) => (
            <div
              className="favorite-item"
              key={location._id}
            >
              <button
                type="button"
                className="favorite-city-btn"
                onClick={() =>
                  handleFavoriteClick(
                    location.city
                  )
                }
                disabled={loading}
              >
                📍 {location.city},{" "}
                {location.country}
              </button>

              <button
                type="button"
                className="delete-btn"
                onClick={() =>
                  handleDelete(
                    location._id
                  )
                }
                disabled={loading}
              >
                🗑️ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
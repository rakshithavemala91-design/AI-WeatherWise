import { useState } from "react";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleAccountClick = () => {
    scrollToSection("account");

    setLoggedIn(
      Boolean(localStorage.getItem("token"))
    );
  };

  return (
    <nav className="navbar">
      <div
        className="navbar-logo"
        onClick={() =>
          scrollToSection("home")
        }
      >
        🌤️ AI WeatherWise
      </div>

      <div className="navbar-links">
        <span
          onClick={() =>
            scrollToSection("home")
          }
        >
          🏠 Home
        </span>

        <span
          onClick={() =>
            scrollToSection("weather")
          }
        >
          🌤️ Weather
        </span>

        <span
          onClick={() =>
            scrollToSection("favorites")
          }
        >
          ⭐ Favorites
        </span>

        <span
          className="account-nav"
          onClick={handleAccountClick}
        >
          {loggedIn
            ? "✅ Account"
            : "🔐 Login"}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
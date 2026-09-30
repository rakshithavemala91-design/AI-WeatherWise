import { useState } from "react";
import API from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.token
      );

      setLoggedIn(true);

      alert("Login successful ✅");
    } catch (error) {
      console.error("Login error:", error);

      alert(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    setLoggedIn(false);

    setEmail("");
    setPassword("");
    setShowPassword(false);

    alert("Logged out successfully 👋");
  };

  return (
    <div className="login-box">
      {loggedIn ? (
        <>
          <h2>✅ Logged In</h2>

          <p>
            You are successfully logged in.
          </p>

          <p className="account-info">
            ⭐ You can now save and manage
            your favorite locations.
          </p>

          <button
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h2>Login</h2>

          <p className="account-info">
            Login to save your favorite
            weather locations.
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <div className="password-field">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>

            <button type="submit">
              Login
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Login;
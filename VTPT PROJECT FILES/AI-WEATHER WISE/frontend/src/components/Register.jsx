import { useState } from "react";
import API from "../api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful ✅");

      setName("");
      setEmail("");
      setPassword("");
      setShowPassword(false);
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="login-box">
      <h2>Register</h2>

      <p className="account-info">
        Create an account to save your
        favorite weather locations.
      </p>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

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
            placeholder="Create password"
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
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
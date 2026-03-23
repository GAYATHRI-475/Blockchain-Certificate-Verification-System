import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import "./UserLogin.css";

export default function UserLogin({ onClose }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  // ------------------ Login ------------------
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in both email and password");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user-auth/user-login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      onClose();
      navigate("/user-dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // ------------------ Register ------------------
  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/user-auth/user-register",
        { name, email, password }
      );

      alert("Registration successful! Please login.");
      setIsRegister(false);
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  // ------------------ Google Login ------------------
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/user-auth/user-google-login",
          { access_token: tokenResponse.access_token }
        );

        localStorage.setItem("token", res.data.token);
        onClose();
        navigate("/user-dashboard");
      } catch (err) {
        if (err.response?.status === 403) {
          alert("Email not registered. Register first.");
        } else {
          alert("Google login failed");
        }
      }
    },
    onError: () => alert("Google login failed"),
  });

  return (
    <div className="user-overlay">
      <div className="user-modal">
        {!isRegister ? (
          <>
            <h2 className="user-title">Sign in to your Account</h2>

            <input
              className="user-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="user-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="user-btn" onClick={handleLogin}>
              Login
            </button>

            <button
              className="user-google-btn"
              onClick={() => loginWithGoogle()}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                width="18"
              />
              Sign in with Google
            </button>

            <p className="user-link-text">
              New user?{" "}
              <span
                className="user-link"
                onClick={() => setIsRegister(true)}
              >
                Create Account
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className="user-title">Register New Account</h2>

            <input
              className="user-input"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="user-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="user-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="user-btn" onClick={handleRegister}>
              Register
            </button>

            <p className="user-link-text">
              <span
                className="user-link"
                onClick={() => setIsRegister(false)}
              >
                Back to Login
              </span>
            </p>
          </>
        )}

        <button className="user-cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
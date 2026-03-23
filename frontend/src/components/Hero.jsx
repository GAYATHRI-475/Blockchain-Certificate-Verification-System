import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import certiImg from '../assets/chatimg.png';
import LoginModal from "./Login";      // Issuer login
import UserLogin from "./UserLogin";   // User login
import "./Hero.css";

export default function Hero() {
  const [showPopup, setShowPopup] = useState(false);
  const [loginType, setLoginType] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="hero">
        <h1>Own Your Digital Identity</h1>
        <p>
          Secure, Verifiable, and Private Credentials Powered by Blockchain
        </p>

        <div className="buttons">
          {/* Login as Issuer */}
          <button
            onClick={() => {
              setLoginType("issuer");
              setShowPopup(true);
            }}
          >
            Login as Issuer
          </button>

          {/* Login as User */}
          <button
            onClick={() => {
              setLoginType("user");
              setShowPopup(true);
            }}
          >
            Login as User
          </button>

          <button
            onClick={() => navigate("/verify")}
          >
            Login as Verifier
          </button>
        </div>
      </div>

      <div className="hero-image">
        <img src={certiImg} alt="blockchain" />
      </div>

      {/* Render popups based on login type */}
      {showPopup && loginType === "issuer" && (
        <LoginModal onClose={() => setShowPopup(false)} />
      )}

      {showPopup && loginType === "user" && (
        <UserLogin onClose={() => setShowPopup(false)} />
      )}
    </>
  );
}
import { useState } from "react";
import Navbar from "./Navbar";
import certiImg from '../assets/chatimg.png';
import LoginModal from "./Login"; // ✅ import

export default function Hero() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <Navbar />

      <div className="hero">
        <h1>Own Your Digital Identity</h1>
        <p>
          Secure, Verifiable, and Private Credentials Powered by Blockchain
        </p>

        <div className="buttons">
          <button onClick={() => setShowPopup(true)}>
            Login as Issuer
          </button>

          <button onClick={() => setShowPopup(true)}>
            Login as User
          </button>

          <button>Login as Verifier</button>
        </div>
      </div>

      <div className="hero-image">
        <img src={certiImg} alt="blockchain" />
      </div>

      {/* ✅ Popup moved to separate component */}
      {showPopup && (
        <LoginModal onClose={() => setShowPopup(false)} />
      )}
    </>
  );
}
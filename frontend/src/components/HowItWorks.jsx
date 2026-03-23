import "./HowItWorks.css";

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="how-section">

      <h2>How It Works</h2>
      <p>
        Simple, secure, and transparent certificate verification using blockchain
      </p>

      <div className="how-container">

        {/* ISSUER */}
        <div className="how-card">
          <div className="icon">🏤</div>
          <h3>Issuer</h3>
          <p>
            Institutions generate and issue certificates securely. Each certificate
            is stored on the blockchain with a unique hash ensuring authenticity.
          </p>
        </div>

        {/* USER */}
        <div className="how-card">
          <div className="icon">🕵️</div>
          <h3>User</h3>
          <p>
            Users request and receive certificates. They can securely store and
            share their credentials anytime without fear of tampering.
          </p>
        </div>

        {/* VERIFIER */}
        <div className="how-card">
          <div className="icon">🔍</div>
          <h3>Verifier</h3>
          <p>
            Verifiers can instantly validate certificates using QR code or hash,
            ensuring the document is genuine and unchanged.
          </p>
        </div>

      </div>

    </div>
  );
}
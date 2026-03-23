import "./Features.css";

export default function Features() {
  return (
    <div id="features" className="features-section">
      <h2>Core Features</h2>
      <p>
        Built on cutting-edge blockchain technology for ultimate security and
        privacy
      </p>

      <div className="features-container">
        {/* CARD 1 */}
        <div className="feature-card">
          <div className="icon">🛡️</div>
          <h3>Self-Sovereign Identity</h3>
          <p>
            Complete control over your digital identity without relying on
            centralized authorities. Your identity, your rules.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="feature-card">
          <div className="icon">🎓</div>
          <h3>Verifiable Credentials</h3>
          <p>
            Store and share tamper-proof credentials including degrees,
            licenses, and certifications on the blockchain.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="feature-card">
          <div className="icon">🔐</div>
          <h3>Privacy & Zero-Knowledge</h3>
          <p>
            Share proofs without revealing sensitive data using advanced
            cryptographic techniques and zero-knowledge protocols.
          </p>
        </div>
      </div>
    </div>
  );
}
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">CertifyX</div>
      
      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#how-it-works">How it Works</a>
      </div>
    </div>
  );
}
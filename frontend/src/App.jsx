import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Success from "./pages/Success";
import IssuerDashBoard from "./pages/IssuerDashBoard";
import IssuerIssue from "./pages/IssuerIssue";
import IssuerIssued from "./pages/IssuerIssued";
import IssuerLayout from "./layouts/IssuerLayout";

function App() {
  return (
    <Router>

      <Routes>
        {/* Home page route */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Features />
              <HowItWorks />
            </>
          }
        />

        {/* Issuer Dashboard route */}
        <Route element={<IssuerLayout />}>
          <Route path="/dashboard" element={<IssuerDashBoard />} />
          <Route path="/issue" element={<IssuerIssue />} />
          <Route path="/issued" element={<IssuerIssued />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
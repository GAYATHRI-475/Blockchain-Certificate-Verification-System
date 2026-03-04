import { useEffect, useState } from "react";
import "./IssuerDashboard.css";

import issuedIcon from "../assets/icons/issued_img.png";
import revokedIcon from "../assets/icons/revoke_img.png";
import usersIcon from "../assets/icons/totaluser_img.png";

export default function IssuerDashboard() {
  const [stats, setStats] = useState({
    totalIssued: 0,
    revoked: 0,
    activeRecipients: 0,
  });

  const [recent, setRecent] = useState([]);

  useEffect(() => {
    // 🔹 Fetch stats
    fetch("http://localhost:5000/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));

    // 🔹 Fetch recent certificates
    fetch("http://localhost:5000/api/certificate/all")
      .then((res) => res.json())
      .then((data) => setRecent(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="dashboard-content">
      {/* 🔷 Header */}
      <div className="header">
        <h1>Welcome back, Test Issuer</h1>
        <p>Ready to issue some amazing credentials today?</p>
      </div>

      {/* 🔷 DID Section */}
      <div className="card">
        <h3>Your Issuer DID</h3>
        <p className="did">did:ethr:0x1234...abcd</p>
        <button
          className="button"
          onClick={() =>
            navigator.clipboard.writeText("did:ethr:0x1234...abcd")
          }
        >
          Copy DID
        </button>
      </div>

      {/* 🔷 Stats */}
      <div className="stats">
        <div className="stat-card">
          <img src={issuedIcon} alt="issued" />
          <div className="stat-text">
            <p>Total Issued</p>
            <h2>{stats.totalIssued}</h2>
          </div>
        </div>

        <div className="stat-card">
          <img src={revokedIcon} alt="revoked" />
          <div className="stat-text">
            <p>Revoked</p>
            <h2>{stats.revoked}</h2>
          </div>
        </div>

        <div className="stat-card">
          <img src={usersIcon} alt="users" />
          <div className="stat-text">
            <p>Active Recipients</p>
            <h2>{stats.activeRecipients}</h2>
          </div>
        </div>
      </div>

      {/* 🔷 Recent Issuances */}
      <div className="recent">
        <h2>Recent Issuances</h2>

        <table>
          <thead>
            <tr>
              <th>Recipient</th>
              <th>Certificate</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {recent.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data">
                  No certificates yet
                </td>
              </tr>
            ) : (
              recent.map((cert) => (
                <tr key={cert._id}>
                  <td>{cert.recipientName}</td>
                  <td>{cert.course}</td>
                  <td>
                    {new Date(cert.issueDate).toLocaleDateString()}
                  </td>
                  <td>
                    {cert.revoked ? (
                      <span className="revoked">❌ Revoked</span>
                    ) : (
                      <span className="issued">✅ Issued</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
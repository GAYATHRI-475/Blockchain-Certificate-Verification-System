import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const handleEdit = (cert) => {
    navigate(`/edit/${cert.certId}`);
  };

  useEffect(() => {

    // Fetch dashboard stats
    fetch("http://localhost:5000/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));

    // Fetch certificates (latest 10)
    fetch("http://localhost:5000/api/certificates/all")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRecent(data.data.slice(0, 10));
        }
      })
      .catch((err) => console.error(err));

  }, []);

  return (
    <div className="dashboard-content">

      {/* Header */}
      <div className="header">
        <h1>Welcome back, Test Issuer</h1>
        <p>Ready to issue some amazing credentials today?</p>
      </div>

      {/* Stats Cards */}
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

      {/* Recent Issuances */}
      <div className="recent">

        <h2>Recent Issuances</h2>

        <div className="table-container">

          <table className="dark-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Credential Type</th>
                <th>Department</th>
                <th>Issued Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {recent.length > 0 ? (

                recent.map((cert,index)=>(
                  <tr key={index}>

                    <td>{cert.studentName}</td>

                    <td>{cert.studentEmail}</td>

                    <td>{cert.credentialType}</td>

                    <td>{cert.department}</td>

                    <td>
                      {new Date(cert.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                      <span
                        className={
                          cert.status === "active"
                            ? "status-active"
                            : "status-revoked"
                        }
                      >
                        {cert.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(cert)}
                      >
                        Edit
                      </button>
                    </td>

                  </tr>
                ))

              ) : (

                <tr>
                  <td colSpan="6" className="no-data">
                    No certificates issued yet
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
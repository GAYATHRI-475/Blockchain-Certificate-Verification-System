import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IssuerIssued.css";

export default function IssuerIssued() {

  const [certificates, setCertificates] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    const fetchCertificates = async () => {

      try {
        const response = await fetch(
          "http://localhost:5000/api/certificates/all"
        );

        const result = await response.json();

        if (result.success) {
          setCertificates(result.data);
        }

      } catch (error) {
        console.error("Error fetching certificates:", error);
      }

    };

    fetchCertificates();

  }, []);


  /* -----------------------------
     EDIT CERTIFICATE
  ----------------------------- */

  const handleEdit = (cert) => {
    navigate(`/edit/${cert.certId}`);
  };


  /* -----------------------------
     FILTER CERTIFICATES
  ----------------------------- */

  const filteredCertificates = certificates.filter((cert) => {
    const searchText = search.toLowerCase();
    return (
      (cert.studentName || "").toLowerCase().includes(searchText) ||
      (cert.studentEmail || "").toLowerCase().includes(searchText) ||
      (cert.credentialType || "").toLowerCase().includes(searchText) ||
      (cert.department || "").toLowerCase().includes(searchText) ||
      (cert.status || "").toLowerCase().includes(searchText)
    );
  });


  return (

    <div className="issued-container">

      <div className="issued-header">

        <div>
          <h1 className="issued-title">Issued Credentials</h1>
          <p className="issued-subtitle">
            List of all credentials you have issued.
          </p>
        </div>

        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search credentials..."
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

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
              <th>PDF</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredCertificates.length > 0 ? (

              filteredCertificates.map((cert) => (

                <tr key={cert.certId}>

                  <td>{cert.studentName}</td>
                  <td>{cert.studentEmail}</td>
                  <td>{cert.credentialType}</td>
                  <td>{cert.department}</td>
                  <td>{new Date(cert.createdAt).toLocaleDateString()}</td>

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

                  {/* VIEW PDF BUTTON */}
                  <td>
                    {cert.certificateFile ? (
                      <a
                        href={`http://localhost:5000/${cert.certificateFile}`}
                        target="_blank"
                        rel="noreferrer"
                        className="view-pdf-btn"
                      >
                        View PDF
                      </a>
                    ) : (
                      <span>-</span>
                    )}
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
                <td colSpan="8" className="no-data">
                  No certificates found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );
}
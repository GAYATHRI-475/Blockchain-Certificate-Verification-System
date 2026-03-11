import React, { useEffect, useState } from "react";

export default function IssuerIssued() {

  const [certificates, setCertificates] = useState([]);

  /*
  -----------------------------------
  FETCH ALL CERTIFICATES
  -----------------------------------
  */
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

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>Issued Credentials</h1>
      <p>List of all credentials you have issued.</p>

      <div style={{ marginTop: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Credential Type</th>
              <th style={thStyle}>Department</th>
              <th style={thStyle}>Issued Date</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>

          <tbody>

            {certificates.map((cert) => (
              <tr key={cert.certId}>
                <td style={tdStyle}>{cert.studentName}</td>
                <td style={tdStyle}>{cert.studentEmail}</td>
                <td style={tdStyle}>{cert.credentialType}</td>
                <td style={tdStyle}>{cert.department}</td>
                <td style={tdStyle}>{new Date(cert.createdAt).toLocaleDateString()}</td>
                <td
                  style={{
                    ...tdStyle,
                    color: cert.status === "active" ? "lightgreen" : "red"
                  }}
                >
                  {cert.status}
                </td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
}

const thStyle = {
  borderBottom: "1px solid #444",
  padding: "10px",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #222",
};
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ViewCertificate.css";

export default function ViewCertificate() {

  const { certId } = useParams();
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {

    const fetchCertificate = async () => {

      try {

        const response = await fetch(
          `http://localhost:5000/api/certificates/${certId}`
        );

        const result = await response.json();

        if (result.success) {
          setCertificate(result.data);
        }

      } catch (error) {
        console.error("Error fetching certificate:", error);
      }

    };

    fetchCertificate();

  }, [certId]);


  const copyHash = () => {

    if (certificate?.certificateHash) {
      navigator.clipboard.writeText(certificate.certificateHash);
      alert("Certificate hash copied!");
    }

  };


  if (!certificate) {
    return <p className="loading">Loading certificate...</p>;
  }

  return (

    <div className="view-container">

      <div className="view-card">

        <h2 className="view-title">Certificate Details</h2>

        <div className="view-grid">

          <div>
            <label>Certificate ID</label>
            <p>{certificate.certId}</p>
          </div>

          <div>
            <label>Student Name</label>
            <p>{certificate.studentName}</p>
          </div>

          <div>
            <label>Student Email</label>
            <p>{certificate.studentEmail}</p>
          </div>

          <div>
            <label>Department</label>
            <p>{certificate.department}</p>
          </div>

          <div>
            <label>Credential Type</label>
            <p>{certificate.credentialType}</p>
          </div>

          <div>
            <label>Certificate Title</label>
            <p>{certificate.certificateTitle}</p>
          </div>

          <div>
            <label>Issue Date</label>
            <p>{new Date(certificate.issueDate).toLocaleDateString()}</p>
          </div>

          <div>
            <label>Expiry Date</label>
            <p>{certificate.expiryDate || "-"}</p>
          </div>

          <div>
            <label>Grade</label>
            <p>{certificate.grade || "-"}</p>
          </div>

          <div>
            <label>Status</label>
            <p className={certificate.status === "active" ? "status-active" : "status-revoked"}>
              {certificate.status}
            </p>
          </div>

        </div>

        {/* IPFS Hash */}

        <div className="hash-section">

            <label>IPFS Hash</label>

            <div className="hash-box">

                <input
                    type="text"
                    value={certificate.ipfsHash || "-"}
                    readOnly
                />

                <button
                    className="copy-btn"
                    onClick={() => {
                        navigator.clipboard.writeText(certificate.ipfsHash);
                        alert("IPFS hash copied!");
                    }}
                >
                    Copy
                </button>

            </div>

        </div>

        {/* Transaction Hash */}

        <div className="hash-section">

            <label>Blockchain Transaction</label>

            <div className="hash-box">

                <input
                    type="text"
                    value={certificate.txHash || "-"}
                    readOnly
                />

                <button
                    className="copy-btn"
                    onClick={() => {
                        navigator.clipboard.writeText(certificate.txHash);
                        alert("Transaction hash copied!");
                    }}
                >
                    Copy
                </button>

            </div>

        </div>

        {/* Certificate PDF */}

        {certificate.certificateFile && (

          <div className="pdf-section">

            <a
              href={`http://localhost:5000/${certificate.certificateFile}`}
              target="_blank"
              rel="noreferrer"
              className="pdf-link"
            >
              View Certificate PDF
            </a>

          </div>

        )}

      </div>

    </div>

  );

}
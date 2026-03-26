import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ViewCertificate.css";
import copyIcon from "../assets/icons/copy.png";
import tickIcon from "../assets/icons/tick.png";
import QRCodeGenerator from "../components/QRCodeGenerator";

export default function ViewCertificate() {

  const { certId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [copiedField, setCopiedField] = useState("");

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

  const handleCopy = (value, field) => {
    if (!value) return;

    navigator.clipboard.writeText(value);
    setCopiedField(field);

    setTimeout(() => {
      setCopiedField("");
    }, 2000);
  };

  if (!certificate) {
    return <p className="view-loading">Loading certificate...</p>;
  }

  return (

    <div className="view-container">

      <div className="view-card">

        <h2 className="view-title">Certificate Details</h2>

        <div className="view-form">

          {/* Student Info */}
          <div className="view-group">
            <label>Student Name</label>
            <input type="text" value={certificate.studentName || ""} disabled />
          </div>

          <div className="view-group">
            <label>Student Email</label>
            <input type="text" value={certificate.studentEmail || ""} disabled />
          </div>

          {/* 🔥 NEW: Issuer Info */}
          <div className="view-group">
            <label>Issuer Email</label>
            <input type="text" value={certificate.issuerEmail || "-"} disabled />
          </div>

          <div className="view-group">
            <label>College Name</label>
            <input type="text" value={certificate.collegeName || "-"} disabled />
          </div>

          {/* Certificate Details */}
          <div className="view-group">
            <label>Department</label>
            <input type="text" value={certificate.department || ""} disabled />
          </div>

          <div className="view-group">
            <label>Grade</label>
            <input type="text" value={certificate.grade || ""} disabled />
          </div>

          <div className="view-group">
            <label>Credential Type</label>
            <input type="text" value={certificate.credentialType || ""} disabled />
          </div>

          <div className="view-group">
            <label>Certificate Title</label>
            <input type="text" value={certificate.certificateTitle || ""} disabled />
          </div>

          <div className="view-group">
            <label>Issue Date</label>
            <input type="date" value={certificate.issueDate || ""} disabled />
          </div>

          <div className="view-group">
            <label>Expiry Date</label>
            <input type="date" value={certificate.expiryDate || ""} disabled />
          </div>

          <div className="view-group">
            <label>Status</label>
            <input type="text" value={certificate.status || ""} disabled />
          </div>

          <div className="view-group">
            <label>IPFS Hash</label>
            <input type="text" value={certificate.ipfsHash || "-"} disabled />
          </div>

          {/* Certificate Hash with Copy + QR */}
          <div className="view-group">
            <label>Certificate Hash</label>

            <div className="view-input-icon">
              <input
                type="text"
                value={certificate.certificateHash || "-"}
                disabled
              />

              <div
                className="view-icon-box"
                onClick={() =>
                  handleCopy(certificate.certificateHash, "hash")
                }
              >
                <img
                  src={copiedField === "hash" ? tickIcon : copyIcon}
                  alt="copy"
                />
              </div>
            </div>

            <QRCodeGenerator certificateHash={certificate.certificateHash} />
          </div>

          {/* PDF */}
          <div className="view-group">
            <label>Certificate File</label>

            {certificate.certificateFile ? (
              <a
                href={`http://localhost:5000/${certificate.certificateFile}`}
                target="_blank"
                rel="noreferrer"
                className="view-pdf-link"
              >
                View Certificate PDF
              </a>
            ) : (
              <input type="text" value="-" disabled />
            )}
          </div>

        </div>

      </div>

    </div>

  );
}
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EditCertificate.css";
import copyIcon from "../assets/icons/copy.png";
import tickIcon from "../assets/icons/tick.png";
import QRCodeGenerator from "../components/QRCodeGenerator";

export default function EditCertificate() {

  const { certId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
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


  const handleChange = (e) => {
    setCertificate({
      ...certificate,
      status: e.target.value
    });
  };

  const handleCopy = (value, field) => {
    if (!value) return;

    navigator.clipboard.writeText(value);
    setCopiedField(field);

    setTimeout(() => {
      setCopiedField("");
    }, 2000);
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!certificate) return;

    setLoading(true);

    try {

      const response = await fetch(
        `http://localhost:5000/api/certificates/${certId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            status: certificate.status
          })
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Certificate status updated successfully!");
      } else {
        alert("Failed to update certificate status");
      }

    } catch (error) {c

      console.error("Error updating certificate:", error);
      alert("Error updating certificate status");

    }

    setLoading(false);

  };


  if (!certificate) {
    return <p className="loading">Loading certificate...</p>;
  }

  return (

    <div className="edit-container">

      <div className="edit-card">

        <h2 className="edit-title">Edit Certificate</h2>

        <form className="edit-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Certificate ID</label>
            <input type="text" value={certificate.certId || "-"} disabled />
          </div>

          <div className="form-group">
            <label>Student Name</label>
            <input type="text" value={certificate.studentName || ""} disabled />
          </div>

          <div className="form-group">
            <label>Student Email</label>
            <input type="text" value={certificate.studentEmail || ""} disabled />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input type="text" value={certificate.department || ""} disabled />
          </div>

          <div className="form-group">
            <label>Credential Type</label>
            <input type="text" value={certificate.credentialType || ""} disabled />
          </div>

          <div className="form-group">
            <label>Certificate Title</label>
            <input type="text" value={certificate.certificateTitle || ""} disabled />
          </div>

          <div className="form-group">
            <label>Issue Date</label>
            <input type="date" value={certificate.issueDate || ""} disabled />
          </div>

          <div className="form-group">
            <label>Expiry Date</label>
            <input type="date" value={certificate.expiryDate || ""} disabled />
          </div>

          <div className="form-group">
            <label>Grade</label>
            <input type="text" value={certificate.grade || ""} disabled />
          </div>

          <div className="form-group">
            <label>IPFS Hash</label>
            <input
              type="text"
              value={certificate.ipfsHash || "-"}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Created At</label>
            <input
              type="text"
              value={
                certificate.createdAt
                  ? new Date(certificate.createdAt).toLocaleString()
                  : "-"
              }
              disabled
            />
          </div>

          <div className="form-group">
            <label>Certificate File</label>

            {certificate.certificateFile ? (
              <a
                href={`http://localhost:5000/${certificate.certificateFile}`}
                target="_blank"
                rel="noreferrer"
                className="pdf-link"
              >
                View Certificate PDF
              </a>
            ) : (
              <input type="text" value="-" disabled />
            )}
          </div>

          <div className="form-group">
            <label>Certificate Hash</label>

            <div className="input-with-icon">
              <input
                type="text"
                value={certificate.certificateHash || "-"}
                disabled
              />

              <div
                className="edit-icon-box"
                onClick={() => handleCopy(certificate.certificateHash, "hash")}
              >
                <img
                  src={copiedField === "hash" ? tickIcon : copyIcon}
                  alt="copy"
                />
              </div>
            </div>
            <QRCodeGenerator certificateHash={certificate.certificateHash} />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={certificate.status || "active"}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="revoked">Revoked</option>
            </select>
          </div>

          <div className="edit-actions">
            <button
              type="submit"
              className="update-btn"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Status"}
            </button>
          </div>

          

        </form>

      </div>

    </div>

  );

}
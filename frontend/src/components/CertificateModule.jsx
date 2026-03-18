import React from "react";
import styles from "./CertificateModal.module.css";

export default function CertificateModal({ cert, onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{cert.certificateTitle}</h2>
        <p><strong>Student:</strong> {cert.studentName}</p>
        <p><strong>Email:</strong> {cert.studentEmail}</p>
        <p><strong>Department:</strong> {cert.department}</p>
        <p><strong>Credential Type:</strong> {cert.credentialType}</p>
        <p><strong>Issued Date:</strong> {cert.issueDate}</p>
        {cert.expiryDate && <p><strong>Expiry Date:</strong> {cert.expiryDate}</p>}
        {cert.grade && <p><strong>Grade:</strong> {cert.grade}</p>}
        <p><strong>Status:</strong> {cert.status}</p>
        <p>
          <strong>Certificate File:</strong>{" "}
          <a href={`http://localhost:5000/${cert.certificateFile}`} target="_blank" rel="noopener noreferrer">
            View / Download
          </a>
        </p>
        <button onClick={onClose} className={styles.closeBtn}>Close</button>
      </div>
    </div>
  );
}
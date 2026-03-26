import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../pages/Verifier.css"; // reuse your existing styles

export default function VerifyByQR() {
  const { certificateHash } = useParams();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyCertificate = async () => {
      try {
        // const res = await axios.post("http://localhost:5000/api/verify", {
        //   certificateHash,
        // });

        const res = await axios.post("http://192.168.137.1:5000/api/verify", {
            certificateHash,
        });

        setResult(res.data);
      } catch (err) {
        setResult(
          err.response?.data || {
            success: false,
            message: "Verification failed",
          }
        );
      } finally {
        setLoading(false);
      }
    };

    if (certificateHash) {
      verifyCertificate();
    }
  }, [certificateHash]);

  if (loading) {
    return (
      <div className="verifier-container">
        <h2 className="verifier-title">Verifying certificate...</h2>
      </div>
    );
  }

  return (
    <div className="verifier-container">
      <h1 className="verifier-main-title">QR Certificate Verification</h1>

      {result && (
        <div className="verifier-card">
          <h2 className="verifier-title">{result.message}</h2>

          {result.success && result.data && (
            <div className="verifier-grid">

              <div className="group">
                <label>Student Name</label>
                <input value={result.data.studentName || "N/A"} disabled />
              </div>

              <div className="group">
                <label>Certificate Title</label>
                <input value={result.data.certificateTitle || "N/A"} disabled />
              </div>

              <div className="group">
                <label>Department</label>
                <input value={result.data.department || "N/A"} disabled />
              </div>

              <div className="group">
                <label>Issue Date</label>
                <input value={result.data.issueDate || "N/A"} disabled />
              </div>

              <div className="group">
                <label>Expiry Date</label>
                <input value={result.data.expiryDate || "N/A"} disabled />
              </div>

              <div className="group">
                <label>Status</label>
                <input
                  className={
                    result.data.status === "active"
                      ? "input-active"
                      : "input-revoked"
                  }
                  value={
                    result.data.status === "active"
                      ? "Certificate Verified"
                      : result.data.status === "revoked"
                      ? "Certificate Revoked"
                      : "N/A"
                  }
                  disabled
                />
              </div>

              <div className="group">
                <label>Issuer</label>
                <input value={result.data.issuerEmail || "N/A"} disabled />
              </div>

              <div className="group">
                <label>Certificate Hash</label>
                <input value={result.data.certificateHash || "N/A"} disabled />
              </div>

              {/* FILE VIEW */}
              <div className="group">
                <label>Certificate File</label>

                {result.data.certificateFile ? (
                  <a
                    href={`http://localhost:5000/${result.data.certificateFile.replace(/\\/g, "/")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="pdf-link"
                  >
                    View Certificate
                  </a>
                ) : result.data.ipfsHash ? (
                  <a
                    href={`https://gateway.pinata.cloud/ipfs/${result.data.ipfsHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="pdf-link"
                  >
                    View from IPFS
                  </a>
                ) : (
                  <span>Not available</span>
                )}
              </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
}
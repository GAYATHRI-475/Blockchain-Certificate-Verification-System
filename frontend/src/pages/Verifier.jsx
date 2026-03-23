// // import { useState } from "react";
// // import axios from "axios";
// // import "./Verifier.css";

// // export default function Verifier() {
// //   const [hash, setHash] = useState("");
// //   const [result, setResult] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const handleVerify = async () => {
// //     setError("");
// //     setResult(null);

// //     if (!hash.trim()) {
// //       setError("Please enter a certificate hash.");
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const res = await axios.post("http://localhost:5000/api/verify", {
// //         certificateHash: hash,
// //       });

// //       setResult(res.data);
// //     } catch (err) {
// //       setResult(
// //         err.response?.data || {
// //           success: false,
// //           message: "Server error. Could not verify certificate.",
// //         }
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="verifier-page">
// //       <h1>Certificate Verifier</h1>

// //       {/* Input field */}
// //       <div className="verifier-input">
// //         <input
// //           type="text"
// //           placeholder="Paste Certificate Hash here"
// //           value={hash}
// //           onChange={(e) => setHash(e.target.value)}
// //           disabled={loading}
// //         />
// //         <button onClick={handleVerify} disabled={loading}>
// //           {loading ? "Verifying..." : "Verify"}
// //         </button>
// //       </div>

// //       {/* Error message */}
// //       {error && <p className="error">{error}</p>}

// //       {/* Verification Result */}
// //       {result && (
// //         <div className={`verifier-result ${result.success ? "success" : "error"}`}>
// //           <h2>{result.message}</h2>
// //           {result.success && result.data && (
// //             <div className="details">
// //               <p><strong>Student Name:</strong> {result.data.studentName}</p>
// //               <p><strong>Email:</strong> {result.data.studentEmail}</p>
// //               <p><strong>Department:</strong> {result.data.department}</p>

// //               <p><strong>Credential Type:</strong> {result.data.credentialType}</p>
// //               <p><strong>Certificate Title:</strong> {result.data.certificateTitle}</p>

// //               <p><strong>Issue Date:</strong> {result.data.issueDate}</p>
// //               <p><strong>Expiry Date:</strong> {result.data.expiryDate}</p>

// //               <p><strong>Grade:</strong> {result.data.grade}</p>
// //               <p><strong>Status:</strong> {result.data.status}</p>

// //               <p><strong>Issuer Email:</strong> {result.data.issuerEmail}</p>
// //               <p><strong>Issuer Wallet:</strong> {result.data.issuerWallet}</p>

// //               <p><strong>Certificate Hash:</strong> {result.data.certificateHash}</p>
// //               <p><strong>IPFS Hash:</strong> {result.data.ipfsHash}</p>

// //               {/* View Certificate File */}
// //               {result.data.certificateFile && (
// //                 <p>
// //                   <strong>Certificate File:</strong>{" "}
// //                   <a
// //                     href={`http://localhost:5000/${result.data.certificateFile}`}
// //                     target="_blank"
// //                     rel="noreferrer"
// //                   >
// //                     View Certificate
// //                   </a>
// //                 </p>
// //               )}

// //               <button
// //                 className="copy-btn"
// //                 onClick={() => navigator.clipboard.writeText(result.data.certificateHash)}
// //               >
// //                 Copy Hash
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import axios from "axios";
// import "./Verifier.css";

// export default function Verifier() {
//   const [hash, setHash] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleVerify = async () => {
//     setError("");
//     setResult(null);

//     if (!hash.trim()) {
//       setError("Please enter a certificate hash.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await axios.post("http://localhost:5000/api/verify", {
//         certificateHash: hash,
//       });

//       setResult(res.data);

//     } catch (err) {
//       setResult(
//         err.response?.data || {
//           success: false,
//           message: "Server error. Could not verify certificate.",
//         }
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="verifier-page">
//       <h1>Certificate Verifier</h1>

//       {/* Input */}
//       <div className="verifier-input">
//         <input
//           type="text"
//           placeholder="Paste Certificate Hash here"
//           value={hash}
//           onChange={(e) => setHash(e.target.value)}
//           disabled={loading}
//         />
//         <button onClick={handleVerify} disabled={loading}>
//           {loading ? "Verifying..." : "Verify"}
//         </button>
//       </div>

//       {/* Error */}
//       {error && <p className="error">{error}</p>}

//       {/* Result */}
//       {result && (
//         <div className={`verifier-result ${result.success ? "success" : "error"}`}>
//           <h2>{result.message}</h2>

//           {result.success && result.data && (
//             <div className="details">

//               <p><strong>Student Name:</strong> {result.data.studentName || "N/A"}</p>
//               <p><strong>Email:</strong> {result.data.studentEmail || "N/A"}</p>
//               <p><strong>Department:</strong> {result.data.department || "N/A"}</p>

//               <p><strong>Credential Type:</strong> {result.data.credentialType || "N/A"}</p>
//               <p><strong>Certificate Title:</strong> {result.data.certificateTitle || "N/A"}</p>

//               <p><strong>Issue Date:</strong> {result.data.issueDate || "N/A"}</p>
//               <p><strong>Expiry Date:</strong> {result.data.expiryDate || "N/A"}</p>

//               <p><strong>Grade:</strong> {result.data.grade || "N/A"}</p>
//               <p><strong>Status:</strong> {result.data.status || "N/A"}</p>

//               <p><strong>Issuer Email:</strong> {result.data.issuerEmail || "N/A"}</p>
//               <p><strong>Issuer Wallet:</strong> {result.data.issuerWallet || "N/A"}</p>

//               {/* ✅ FIXED TIMESTAMP */}
//               <p>
//                 <strong>Issued At:</strong>{" "}
//                 {result.data.issuedTimestamp
//                   ? new Date(Number(result.data.issuedTimestamp) * 1000).toLocaleString()
//                   : "N/A"}
//               </p>

//               <p><strong>Certificate Hash:</strong> {result.data.certificateHash}</p>
//               <p><strong>IPFS Hash:</strong> {result.data.ipfsHash}</p>

//               {/* ✅ FILE VIEW (LOCAL + IPFS FALLBACK) */}
//               <p>
//                 <strong>Certificate File:</strong>{" "}
//                 {result.data.certificateFile ? (
//                   <a
//                     href={`http://localhost:5000/${result.data.certificateFile.replace(/\\/g, "/")}`}
//                     target="_blank"
//                     rel="noreferrer"
//                   >
//                     View Certificate
//                   </a>
//                 ) : result.data.ipfsHash ? (
//                   <a
//                     href={`https://gateway.pinata.cloud/ipfs/${result.data.ipfsHash}`}
//                     target="_blank"
//                     rel="noreferrer"
//                   >
//                     View from IPFS
//                   </a>
//                 ) : (
//                   "Not available"
//                 )}
//               </p>

//               {/* Copy Button */}
//               <button
//                 className="copy-btn"
//                 onClick={() =>
//                   navigator.clipboard.writeText(result.data.certificateHash)
//                 }
//               >
//                 Copy Hash
//               </button>

//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";
import "./Verifier.css";

import copyIcon from "../assets/icons/copy.png";
import tickIcon from "../assets/icons/tick.png";

export default function Verifier() {
  const [hash, setHash] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleVerify = async () => {
    setError("");
    setResult(null);

    if (!hash.trim()) {
      setError("Please enter a certificate hash.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/verify", {
        certificateHash: hash,
      });

      setResult(res.data);
    } catch (err) {
      setResult(
        err.response?.data || {
          success: false,
          message: "Server error. Could not verify certificate.",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result?.data?.certificateHash) return;

    navigator.clipboard.writeText(result.data.certificateHash);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="verifier-container">
      <h1 className="verifier-main-title">Certificate Verifier</h1>

      {/* INPUT */}
      <div className="verifier-card">
        <div className="verify-box">
          <input
            type="text"
            placeholder="Paste Certificate Hash here"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            disabled={loading}
          />

          <button onClick={handleVerify} disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>

        {error && <p className="error">{error}</p>}
      </div>

      {/* RESULT */}
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
                <label>Email</label>
                <input value={result.data.studentEmail || "N/A"} disabled />
              </div>

              <div className="group">
                <label>Department</label>
                <input value={result.data.department || "N/A"} disabled />
              </div>

              <div className="group">
                <label>Grade</label>
                <input value={result.data.grade || "N/A"} disabled />
              </div>

              <div className="group">
                <label>Credential Type</label>
                <input value={result.data.credentialType || "N/A"} disabled />
              </div>

              <div className="group">
                <label>Certificate Title</label>
                <input value={result.data.certificateTitle || "N/A"} disabled />
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
                <input value={result.data.status || "N/A"} disabled />
              </div>

              

              <div className="group">
                <label>Issuer Email</label>
                <input value={result.data.issuerEmail || "N/A"} disabled />
              </div>

              <div className="group">
                <label>Issuer Wallet</label>
                <input value={result.data.issuerWallet || "N/A"} disabled />
              </div>

              <div className="group">
                <label>IPFS Hash</label>
                <input value={result.data.ipfsHash || "N/A"} disabled />
              </div>

              {/* HASH WITH COPY */}
              <div className="group">
                <label>Certificate Hash</label>

                <div className="input-with-icon">
                  <input value={result.data.certificateHash || "N/A"} disabled />

                  <div className="icon-box" onClick={handleCopy}>
                    <img
                      src={copied ? tickIcon : copyIcon}
                      alt="copy"
                    />
                  </div>
                </div>
              </div>

              {/* FILE */}
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
import React, { useState } from "react";
import "./IssuerIssue.css";
import { connectWallet } from "../utils/connectWallet";
import { v4 as uuidv4 } from "uuid";
import { ethers } from "ethers";

// ✅ IMPORT ABI (adjust path if needed)
import CONTRACT_ABI from "../contract/Certificate.json";

const IssuerIssue = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);

  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    department: "",
    credentialType: "University Degree",
    certificateTitle: "",
    issueDate: "",
    expiryDate: "",
    grade: "",
  });

  // Connect Wallet
  const handleConnectWallet = async () => {
    const wallet = await connectWallet();
    if (wallet) {
      setWalletAddress(wallet.address);
      console.log("Issuer Wallet:", wallet.address);
    }
  };

  // Handle form input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Issue certificate
  const handleIssueCertificate = async (e) => {
    e.preventDefault();

    if (!walletAddress) return alert("Please connect wallet first");
    if (!certificateFile) return alert("Please upload PDF certificate");

    try {
      const certId = uuidv4();

      // -----------------------------
      // STEP 1: Send to backend
      // -----------------------------
      const uploadData = new FormData();
      uploadData.append("certId", certId);
      uploadData.append("studentName", formData.studentName);
      uploadData.append("studentEmail", formData.studentEmail);
      uploadData.append("department", formData.department);
      uploadData.append("credentialType", formData.credentialType);
      uploadData.append("certificateTitle", formData.certificateTitle);
      uploadData.append("issueDate", formData.issueDate);
      uploadData.append("expiryDate", formData.expiryDate);
      uploadData.append("grade", formData.grade);
      uploadData.append("certificate", certificateFile);
      uploadData.append("issuerEmail", localStorage.getItem("email"));

      const response = await fetch("http://localhost:5000/api/certificates/issue", {
        method: "POST",
        body: uploadData,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error("Backend failed");
      }

      const { certificateHash, ipfsHash } = result.certificate;

      console.log("Certificate Hash:", certificateHash);
      console.log("IPFS Hash:", ipfsHash);

      // -----------------------------
      // STEP 2: MetaMask connection
      // -----------------------------
      if (!window.ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // -----------------------------
      // STEP 3: Contract instance
      // -----------------------------
      const contract = new ethers.Contract(
        import.meta.env.VITE_CONTRACT_ADDRESS,
        CONTRACT_ABI.abi, // ✅ important fix
        signer
      );

      // -----------------------------
      // STEP 4: Send transaction
      // -----------------------------
      const tx = await contract.issueCertificate(
        certId,
        certificateHash,
        ipfsHash
      );

      console.log("Transaction sent:", tx.hash);

      // -----------------------------
      // STEP 5: Wait for confirmation
      // -----------------------------
      await tx.wait();

      console.log("Transaction confirmed ✅");

      alert("✅ Certificate issued successfully!");

      // Reset form
      setFormData({
        studentName: "",
        studentEmail: "",
        department: "",
        credentialType: "University Degree",
        certificateTitle: "",
        issueDate: "",
        expiryDate: "",
        grade: "",
      });

      setCertificateFile(null);

    } catch (error) {
      console.error("Error issuing certificate:", error);

      if (error.code === 4001) {
        alert("❌ Transaction rejected in MetaMask");
      } else {
        alert("❌ Transaction failed");
      }
    }
  };

  return (
    <div className="issue-container">
      <h2 className="issue-title">Issue Certificate</h2>
      <p className="issue-subtitle">Fill the form below to issue a blockchain credential</p>

      <div className="card wallet-card">
        <div className="wallet-info">
          <h3>Your Issuer DID</h3>
          <p className="did">{walletAddress ? `did:ethr:${walletAddress}` : "Not connected"}</p>
        </div>
        <div className="wallet-actions buttons">
          <button onClick={handleConnectWallet}>
            {walletAddress ? "Connected" : "Connect Wallet"}
          </button>
        </div>
      </div>

      <div className="issue-card">
        <form id="issueForm" className="issue-form" onSubmit={handleIssueCertificate}>
          <div>
            <label>Student Name <span className="required">*</span></label>
            <input type="text" name="studentName" placeholder="Enter student name"
              value={formData.studentName} onChange={handleChange} required />
          </div>

          <div>
            <label>Student Email <span className="required">*</span></label>
            <input type="email" name="studentEmail" placeholder="Enter student email"
              value={formData.studentEmail} onChange={handleChange} required />
          </div>

          <div>
            <label>Department <span className="required">*</span></label>
            <input type="text" name="department" placeholder="Enter department"
              value={formData.department} onChange={handleChange} required />
          </div>

          <div>
            <label>Credential Type <span className="required">*</span></label>
            <select name="credentialType" value={formData.credentialType} onChange={handleChange}>
              <option>University Degree</option>
              <option>Professional Certificate</option>
              <option>Employment Verification</option>
              <option>Training Certificate</option>
              <option>Achievement Awards</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label>Certificate Title <span className="required">*</span></label>
            <input type="text" name="certificateTitle" placeholder="Enter certificate title"
              value={formData.certificateTitle} onChange={handleChange} required />
          </div>

          <div>
            <label>Issue Date <span className="required">*</span></label>
            <input type="date" name="issueDate" value={formData.issueDate}
              onChange={handleChange} required />
          </div>

          <div>
            <label>Expiry Date</label>
            <input type="date" name="expiryDate"
              value={formData.expiryDate} onChange={handleChange} />
          </div>

          <div>
            <label>Grade / Score</label>
            <input type="text" name="grade" placeholder="Enter grade or score"
              value={formData.grade} onChange={handleChange} />
          </div>

          <div className="file-input">
            <label>Upload Certificate (PDF) <span className="required">*</span></label>
            <input type="file" accept="application/pdf"
              onChange={(e) => setCertificateFile(e.target.files[0])} required />
          </div>
        </form>

        <div className="submit-container">
          <button
            type="submit"
            form="issueForm"
            className="submit-btn"
          >
            Issue Certificate
          </button>
        </div>

      </div>
    </div>
  );
};

export default IssuerIssue;
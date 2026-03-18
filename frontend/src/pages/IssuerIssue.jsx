// import React, { useState } from "react";
// import "./IssuerIssue.css";
// import { connectWallet } from "../utils/connectWallet";
// import { getContract } from "../utils/contract";
// import { v4 as uuidv4 } from "uuid";

// const IssuerIssue = () => {

//   const [walletAddress, setWalletAddress] = useState("");
//   const [certificateFile, setCertificateFile] = useState(null);

//   const [formData, setFormData] = useState({
//     studentName: "",
//     studentEmail: "",
//     department: "",
//     credentialType: "University Degree",
//     certificateTitle: "",
//     issueDate: "",
//     expiryDate: "",
//     grade: ""
//   });

//   /*
//   -----------------------------------
//   CONNECT METAMASK
//   -----------------------------------
//   */
//   const handleConnectWallet = async () => {

//     const wallet = await connectWallet();

//     if (wallet) {
//       setWalletAddress(wallet.address);
//       console.log("Issuer Wallet:", wallet.address);
//     }

//   };


//   /*
//   -----------------------------------
//   HANDLE FORM INPUT
//   -----------------------------------
//   */
//   const handleChange = (e) => {

//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });

//   };


//   /*
//   -----------------------------------
//   ISSUE CERTIFICATE
//   -----------------------------------
//   */
//   const handleIssueCertificate = async (e) => {

//     e.preventDefault();

//     if (!walletAddress) {
//       alert("Please connect MetaMask first");
//       return;
//     }

//     if (!certificateFile) {
//       alert("Please upload a certificate PDF");
//       return;
//     }

//     try {

//       const certId = uuidv4();
//       const ipfsHash = "QmDummyHash"; // Replace later with real IPFS hash


//       /*
//       -----------------------------------
//       SEND DATA TO BACKEND
//       -----------------------------------
//       */

//       const uploadData = new FormData();

//       uploadData.append("certId", certId);
//       uploadData.append("studentName", formData.studentName);
//       uploadData.append("studentEmail", formData.studentEmail);
//       uploadData.append("department", formData.department);
//       uploadData.append("credentialType", formData.credentialType);
//       uploadData.append("certificateTitle", formData.certificateTitle);
//       uploadData.append("issueDate", formData.issueDate);
//       uploadData.append("expiryDate", formData.expiryDate);
//       uploadData.append("grade", formData.grade);
//       uploadData.append("certificate", certificateFile);


//       const response = await fetch(
//         "http://localhost:5000/api/certificates/issue",
//         {
//           method: "POST",
//           body: uploadData
//         }
//       );

//       const result = await response.json();

//       if (!result.success) {
//         alert("Certificate upload failed");
//         return;
//       }


//       /*
//       -----------------------------------
//       BLOCKCHAIN TRANSACTION
//       -----------------------------------
//       */

//       const contract = await getContract();

//       const tx = await contract.issueCertificate(
//         certId,
//         formData.studentName,
//         formData.certificateTitle,
//         ipfsHash
//       );

//       console.log("Transaction:", tx);

//       await tx.wait();

//       alert("Certificate Issued Successfully!");

//     } catch (error) {

//       console.error("Error issuing certificate:", error);
//       alert("Error issuing certificate");

//     }

//   };


//   return (

//     <div className="issue-container">

//       <h2 className="issue-title">Issue Certificate</h2>

//       <p className="issue-subtitle">
//         Fill the form below to issue a blockchain credential
//       </p>

//       <div className="card wallet-card">
//         <div className="wallet-info">
//           <h3>Your Issuer DID</h3>
//           <p className="did">
//             {walletAddress ? `did:ethr:${walletAddress}` : "Not connected"}
//           </p>
//         </div>

//         <div className="wallet-actions buttons">
//           <button onClick={handleConnectWallet}>
//             {walletAddress ? "Connected" : "Connect Wallet"}
//           </button>
//         </div>
//       </div>

//       <div className="issue-card">

//         <form
//           className="issue-form"
//           onSubmit={handleIssueCertificate}
//         >

//           <div>
//             <label>
//               Student Name <span className="required">*</span>
//             </label>
//             <input
//               type="text"
//               name="studentName"
//               placeholder="Enter student name"
//               value={formData.studentName}
//               onChange={handleChange}
//               required
//             />
//           </div>


//           <div>
//             <label>
//               Student Email <span className="required">*</span>
//             </label>
//             <input
//               type="email"
//               name="studentEmail"
//               placeholder="Enter student email"
//               value={formData.studentEmail}
//               onChange={handleChange}
//               required
//             />
//           </div>


//           <div>
//             <label>
//               Department <span className="required">*</span>
//             </label>
//             <input
//               type="text"
//               name="department"
//               placeholder="Enter department"
//               value={formData.department}
//               onChange={handleChange}
//               required
//             />
//           </div>


//           <div>
//             <label>
//               Credential Type <span className="required">*</span>
//             </label>
//             <select
//               name="credentialType"
//               value={formData.credentialType}
//               onChange={handleChange}
//             >
//               <option>University Degree</option>
//               <option>Professional Certificate</option>
//               <option>Employment Verification</option>
//               <option>Training Certificate</option>
//               <option>Achievement Awards</option>
//               <option>Other</option>
//             </select>
//           </div>


//           <div>
//             <label>
//               Certificate Title <span className="required">*</span>
//             </label>
//             <input
//               type="text"
//               name="certificateTitle"
//               placeholder="Enter certificate title"
//               value={formData.certificateTitle}
//               onChange={handleChange}
//               required
//             />
//           </div>


//           <div>
//             <label>
//               Issue Date <span className="required">*</span>
//             </label>
//             <input
//               type="date"
//               name="issueDate"
//               value={formData.issueDate}
//               onChange={handleChange}
//               required
//             />
//           </div>


//           <div>
//             <label>
//               Expiry Date
//             </label>
//             <input
//               type="date"
//               name="expiryDate"
//               value={formData.expiryDate}
//               onChange={handleChange}
//             />
//           </div>


//           <div>
//             <label>
//               Grade / Score
//             </label>
//             <input
//               type="text"
//               name="grade"
//               placeholder="Enter grade or score"
//               value={formData.grade}
//               onChange={handleChange}
//             />
//           </div>


//           <div className="file-input">

//             <label>
//               Upload Certificate (PDF) <span className="required">*</span>
//             </label>

//             <input
//               type="file"
//               accept="application/pdf"
//               onChange={(e) =>
//                 setCertificateFile(e.target.files[0])
//               }
//               required
//             />

//           </div>

//         </form>

//         <div className="submit-container">
//           <button
//             type="submit"
//             className="submit-btn"
//             onClick={handleIssueCertificate}
//           >
//             Issue Certificate
//           </button>
//         </div>

//       </div>

//     </div>

//   );

// };

// export default IssuerIssue;

import React, { useState } from "react";
import "./IssuerIssue.css";
import { connectWallet } from "../utils/connectWallet";
import { getContract } from "../utils/contract";
import { v4 as uuidv4 } from "uuid";

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

      // Prepare data for backend
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

      // Send to backend
      const response = await fetch("http://localhost:5000/api/certificates/issue", {
        method: "POST",
        body: uploadData,
      });

      const result = await response.json();
      if (!result.success) throw new Error("Certificate upload failed");

      const { certificateHash, ipfsHash } = result.certificate;

      console.log("Certificate Hash:", certificateHash);
      console.log("IPFS Hash:", ipfsHash);

      // Blockchain transaction
      const contract = await getContract();
      const tx = await contract.issueCertificate(certId, certificateHash, ipfsHash);
      await tx.wait();

      alert("Certificate issued successfully on blockchain!");

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
      alert("Error issuing certificate");
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
        <form className="issue-form" onSubmit={handleIssueCertificate}>
          <div>
            <label>Student Name <span className="required">*</span></label>
            <input
              type="text"
              name="studentName"
              placeholder="Enter student name"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Student Email <span className="required">*</span></label>
            <input
              type="email"
              name="studentEmail"
              placeholder="Enter student email"
              value={formData.studentEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Department <span className="required">*</span></label>
            <input
              type="text"
              name="department"
              placeholder="Enter department"
              value={formData.department}
              onChange={handleChange}
              required
            />
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
            <input
              type="text"
              name="certificateTitle"
              placeholder="Enter certificate title"
              value={formData.certificateTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Issue Date <span className="required">*</span></label>
            <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} required />
          </div>

          <div>
            <label>Expiry Date</label>
            <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />
          </div>

          <div>
            <label>Grade / Score</label>
            <input type="text" name="grade" placeholder="Enter grade or score" value={formData.grade} onChange={handleChange} />
          </div>

          <div className="file-input">
            <label>Upload Certificate (PDF) <span className="required">*</span></label>
            <input type="file" accept="application/pdf" onChange={(e) => setCertificateFile(e.target.files[0])} required />
          </div>

          <div className="submit-container">
            <button type="submit" className="submit-btn">
              Issue Certificate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssuerIssue;
// // File: frontend/pages/IssuerIssue.jsx
// import { useState } from "react";

// export default function IssuerIssue() {
//   const [formData, setFormData] = useState({
//     studentName: "",
//     studentEmail: "",
//     courseName: "",
//     certificateFile: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "certificateFile") {
//       setFormData({ ...formData, certificateFile: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formData.studentName || !formData.studentEmail || !formData.courseName || !formData.certificateFile) {
//       alert("All fields are required");
//       return;
//     }

//     const data = new FormData();
//     data.append("studentName", formData.studentName);
//     data.append("studentEmail", formData.studentEmail);
//     data.append("courseName", formData.courseName);
//     data.append("certificateFile", formData.certificateFile);

//     try {
//       const res = await fetch("http://localhost:5000/api/certificates/issue", {
//         method: "POST",
//         body: data, // send as multipart/form-data
//       });

//       const result = await res.json();
//       if (result.success) {
//         alert("Certificate issued successfully!");
//         // Reset form
//         setFormData({ studentName: "", studentEmail: "", courseName: "", certificateFile: null });
//       } else {
//         alert(result.message);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Error issuing certificate");
//     }
//   };

//   return (
//     <div style={{ padding: "30px", color: "white" }}>
//       <h1>Issue Certificate</h1>
//       <div style={{ marginTop: "20px" }}>
//         <input
//           name="studentName"
//           placeholder="Student Name"
//           style={inputStyle}
//           value={formData.studentName}
//           onChange={handleChange}
//         />

//         <input
//           name="studentEmail"
//           placeholder="Student Email"
//           style={inputStyle}
//           value={formData.studentEmail}
//           onChange={handleChange}
//         />

//         <input
//           name="courseName"
//           placeholder="Course Name"
//           style={inputStyle}
//           value={formData.courseName}
//           onChange={handleChange}
//         />

//         <input
//           type="file"
//           name="certificateFile"
//           style={inputStyle}
//           onChange={handleChange}
//         />

//         <button style={buttonStyle} onClick={handleSubmit}>
//           Issue Certificate
//         </button>
//       </div>
//     </div>
//   );
// }

// const inputStyle = {
//   display: "block",
//   marginBottom: "12px",
//   padding: "10px",
//   width: "300px",
//   borderRadius: "8px",
//   border: "none",
//   outline: "none",
//   backgroundColor: "#222",
//   color: "white",
// };

// const buttonStyle = {
//   padding: "10px 16px",
//   borderRadius: "10px",
//   border: "none",
//   background: "linear-gradient(90deg, #7b61ff, #5ac8fa)",
//   color: "white",
//   cursor: "pointer",
// };

// import React, { useState } from "react";
// import { connectWallet } from "../utils/connectWallet";
// import { getContract } from "../utils/contract";
// import { v4 as uuidv4 } from "uuid";

// const IssuerIssue = () => {

//   const [walletAddress, setWalletAddress] = useState("");

//   const [formData, setFormData] = useState({
//     studentName: "",
//     studentEmail: "",
//     credentialType: "University Degree",
//     certificateTitle: "",
//     issueDate: "",
//     expiryDate: "",
//     grade: ""
//   });

//   // Connect Wallet
//   const handleConnectWallet = async () => {
//     const wallet = await connectWallet();

//     if (wallet) {
//       setWalletAddress(wallet.address);
//       console.log("Issuer Wallet:", wallet.address);
//     }
//   };

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Issue Certificate
//   const handleIssueCertificate = async (e) => {
//     e.preventDefault();

//     if (!walletAddress) {
//       alert("Please connect MetaMask first");
//       return;
//     }

//     try {

//       const contract = await getContract();

//       const certId = uuidv4();

//       const studentName = formData.studentName;
//       const course = formData.certificateTitle;

//       const ipfsHash = "QmDummyHash";

//       const tx = await contract.issueCertificate(
//         certId,
//         studentName,
//         course,
//         ipfsHash
//       );

//       console.log("Transaction:", tx);

//       await tx.wait();

//       alert("Certificate Issued Successfully!");

//     } catch (error) {
//       console.error("Error issuing certificate:", error);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>

//       <h2>Issue Certificate</h2>

//       {/* Connect Wallet */}
//       <button onClick={handleConnectWallet}>
//         Connect MetaMask
//       </button>

//       {walletAddress && (
//         <p>
//           Connected Wallet: <b>{walletAddress}</b>
//         </p>
//       )}

//       <hr />

//       {/* Certificate Form */}
//       <form onSubmit={handleIssueCertificate}>

//         <div>
//           <label>Student Name</label>
//           <input
//             type="text"
//             name="studentName"
//             placeholder="Enter student name"
//             value={formData.studentName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Student Email</label>
//           <input
//             type="email"
//             name="studentEmail"
//             placeholder="Enter student email"
//             value={formData.studentEmail}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Credential Type</label>
//           <select
//             name="credentialType"
//             value={formData.credentialType}
//             onChange={handleChange}
//           >
//             <option>University Degree</option>
//             <option>Professional Certificate</option>
//             <option>Employment Verification</option>
//             <option>Training Certificate</option>
//             <option>Achievement Awards</option>
//             <option>Other</option>
//           </select>
//         </div>

//         <div>
//           <label>Certificate Title</label>
//           <input
//             type="text"
//             name="certificateTitle"
//             placeholder="Enter certificate title"
//             value={formData.certificateTitle}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Issue Date</label>
//           <input
//             type="date"
//             name="issueDate"
//             value={formData.issueDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Expiry Date</label>
//           <input
//             type="date"
//             name="expiryDate"
//             value={formData.expiryDate}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Grade / Score (Optional)</label>
//           <input
//             type="text"
//             name="grade"
//             placeholder="Enter grade or score"
//             value={formData.grade}
//             onChange={handleChange}
//           />
//         </div>

//         <br />

//         <button type="submit">
//           Issue Certificate
//         </button>

//       </form>
//     </div>
//   );
// };

// export default IssuerIssue;

import React, { useState } from "react";
import { connectWallet } from "../utils/connectWallet";
import { getContract } from "../utils/contract";
import { v4 as uuidv4 } from "uuid";

const IssuerIssue = () => {

  const [walletAddress, setWalletAddress] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);

  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    credentialType: "University Degree",
    certificateTitle: "",
    issueDate: "",
    expiryDate: "",
    grade: ""
  });

  /*
  -----------------------------------
  CONNECT METAMASK
  -----------------------------------
  */
  const handleConnectWallet = async () => {
    const wallet = await connectWallet();

    if (wallet) {
      setWalletAddress(wallet.address);
      console.log("Issuer Wallet:", wallet.address);
    }
  };

  /*
  -----------------------------------
  HANDLE FORM INPUT
  -----------------------------------
  */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /*
  -----------------------------------
  ISSUE CERTIFICATE
  -----------------------------------
  */
  const handleIssueCertificate = async (e) => {
    e.preventDefault();

    if (!walletAddress) {
      alert("Please connect MetaMask first");
      return;
    }

    if (!certificateFile) {
      alert("Please upload a certificate PDF");
      return;
    }

    try {

      const certId = uuidv4();
      const ipfsHash = "QmDummyHash"; // Replace later with real IPFS hash

      /*
      -----------------------------------
      SEND DATA TO BACKEND
      -----------------------------------
      */

      const uploadData = new FormData();

      uploadData.append("certId", certId);
      uploadData.append("studentName", formData.studentName);
      uploadData.append("studentEmail", formData.studentEmail);
      uploadData.append("credentialType", formData.credentialType);
      uploadData.append("certificateTitle", formData.certificateTitle);
      uploadData.append("issueDate", formData.issueDate);
      uploadData.append("expiryDate", formData.expiryDate);
      uploadData.append("grade", formData.grade);
      uploadData.append("certificate", certificateFile);

      const response = await fetch(
        "http://localhost:5000/api/certificates/issue",
        {
          method: "POST",
          body: uploadData
        }
      );

      const result = await response.json();

      if (!result.success) {
        alert("Certificate upload failed");
        return;
      }

      /*
      -----------------------------------
      BLOCKCHAIN TRANSACTION
      -----------------------------------
      */

      const contract = await getContract();

      const tx = await contract.issueCertificate(
        certId,
        formData.studentName,
        formData.certificateTitle,
        ipfsHash
      );

      console.log("Transaction:", tx);

      await tx.wait();

      alert("Certificate Issued Successfully!");

    } catch (error) {
      console.error("Error issuing certificate:", error);
      alert("Error issuing certificate");
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Issue Certificate</h2>

      <button onClick={handleConnectWallet}>
        Connect MetaMask
      </button>

      {walletAddress && (
        <p>
          Connected Wallet: <b>{walletAddress}</b>
        </p>
      )}

      <hr />

      <form onSubmit={handleIssueCertificate}>

        <div>
          <label>Student Name</label>
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
          <label>Student Email</label>
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
          <label>Credential Type</label>
          <select
            name="credentialType"
            value={formData.credentialType}
            onChange={handleChange}
          >
            <option>University Degree</option>
            <option>Professional Certificate</option>
            <option>Employment Verification</option>
            <option>Training Certificate</option>
            <option>Achievement Awards</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label>Certificate Title</label>
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
          <label>Issue Date</label>
          <input
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Grade / Score (Optional)</label>
          <input
            type="text"
            name="grade"
            placeholder="Enter grade or score"
            value={formData.grade}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Upload Certificate (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setCertificateFile(e.target.files[0])}
            required
          />
        </div>

        <br />

        <button type="submit">
          Issue Certificate
        </button>

      </form>

    </div>
  );
};

export default IssuerIssue;
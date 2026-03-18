// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./EditCertificate.css";

// export default function EditCertificate() {

//   const { certId } = useParams();
//   const [certificate, setCertificate] = useState(null);

//   useEffect(() => {

//     const fetchCertificate = async () => {

//       try {

//         const response = await fetch(
//           `http://localhost:5000/api/certificates/${certId}`
//         );

//         const result = await response.json();

//         if (result.success) {
//           setCertificate(result.data);
//         }

//       } catch (error) {
//         console.error("Error fetching certificate:", error);
//       }

//     };

//     fetchCertificate();

//   }, [certId]);


//   const handleChange = (e) => {
//     setCertificate({
//       ...certificate,
//       [e.target.name]: e.target.value
//     });
//   };


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Updated certificate:", certificate);
//   };


//   if (!certificate) {
//     return <p className="loading">Loading certificate...</p>;
//   }

//   return (

//     <div className="edit-container">

//       <div className="edit-card">

//         <h2 className="edit-title">Edit Certificate</h2>

//         <form className="edit-form" onSubmit={handleSubmit}>

//           <label>Certificate ID</label>
//           <input
//             type="text"
//             value={certificate.certId || "-"}
//             disabled
//           />

//           <label>Student Name</label>
//           <input
//             type="text"
//             name="studentName"
//             value={certificate.studentName || ""}
//             placeholder="-"
//             onChange={handleChange}
//           />

//           <label>Student Email</label>
//           <input
//             type="text"
//             name="studentEmail"
//             value={certificate.studentEmail || ""}
//             placeholder="-"
//             onChange={handleChange}
//           />

//           <label>Department</label>
//           <input
//             type="text"
//             name="department"
//             value={certificate.department || ""}
//             placeholder="-"
//             onChange={handleChange}
//           />

//           <label>Credential Type</label>
//           <input
//             type="text"
//             name="credentialType"
//             value={certificate.credentialType || ""}
//             placeholder="-"
//             onChange={handleChange}
//           />

//           <label>Certificate Title</label>
//           <input
//             type="text"
//             name="certificateTitle"
//             value={certificate.certificateTitle || ""}
//             placeholder="-"
//             onChange={handleChange}
//           />

//           <label>Issue Date</label>
//           <input
//             type="date"
//             name="issueDate"
//             value={certificate.issueDate || ""}
//             onChange={handleChange}
//           />

//           <label>Expiry Date</label>
//           <input
//             type="date"
//             name="expiryDate"
//             value={certificate.expiryDate || ""}
//             onChange={handleChange}
//           />

//           <label>Grade</label>
//           <input
//             type="text"
//             name="grade"
//             value={certificate.grade || ""}
//             placeholder="-"
//             onChange={handleChange}
//           />

//           <label>Status</label>
//           <input
//             type="text"
//             name="status"
//             value={certificate.status || ""}
//             placeholder="-"
//             onChange={handleChange}
//           />

//           <label>Certificate File</label>

//             {certificate.certificateFile ? (
//             <a
//                 href={`http://localhost:5000/${certificate.certificateFile}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="pdf-link"
//             >
//                 View Certificate PDF
//             </a>
//             ) : (
//             <input type="text" value="-" disabled />
//             )}

//           <div className="edit-actions">
//             <button className="update-btn">
//               Update Certificate
//             </button>
//           </div>

//         </form>

//       </div>

//     </div>

//   );
// }

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./EditCertificate.css";

// export default function EditCertificate() {

//   const { certId } = useParams();
//   const [certificate, setCertificate] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {

//     const fetchCertificate = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/certificates/${certId}`
//         );

//         const result = await response.json();

//         if (result.success) {
//           setCertificate(result.data);
//         }

//       } catch (error) {
//         console.error("Error fetching certificate:", error);
//       }
//     };

//     fetchCertificate();

//   }, [certId]);


//   const handleChange = (e) => {
//     // Only allow changing status
//     if (e.target.name === "status") {
//       setCertificate({
//         ...certificate,
//         [e.target.name]: e.target.value
//       });
//     }
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!certificate) return;

//     setLoading(true);

//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/certificates/${certId}`,
//         {
//           method: "PATCH", // use PATCH to update only status
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({ status: certificate.status })
//         }
//       );

//       const result = await response.json();

//       if (result.success) {
//         alert("Certificate status updated successfully!");
//       } else {
//         alert("Failed to update certificate status");
//       }

//     } catch (error) {
//       console.error("Error updating certificate:", error);
//       alert("Error updating certificate status");
//     }

//     setLoading(false);
//   };


//   if (!certificate) {
//     return <p className="loading">Loading certificate...</p>;
//   }

//   return (
//     <div className="edit-container">
//       <div className="edit-card">
//         <h2 className="edit-title">Edit Certificate</h2>

//         <form className="edit-form" onSubmit={handleSubmit}>

//           <label>Certificate ID</label>
//           <input type="text" value={certificate.certId || "-"} disabled />

//           <label>Student Name</label>
//           <input type="text" value={certificate.studentName || ""} disabled />

//           <label>Student Email</label>
//           <input type="text" value={certificate.studentEmail || ""} disabled />

//           <label>Department</label>
//           <input type="text" value={certificate.department || ""} disabled />

//           <label>Credential Type</label>
//           <input type="text" value={certificate.credentialType || ""} disabled />

//           <label>Certificate Title</label>
//           <input type="text" value={certificate.certificateTitle || ""} disabled />

//           <label>Issue Date</label>
//           <input type="date" value={certificate.issueDate || ""} disabled />

//           <label>Expiry Date</label>
//           <input type="date" value={certificate.expiryDate || ""} disabled />

//           <label>Grade</label>
//           <input type="text" value={certificate.grade || ""} disabled />

//           <label>Status</label>
//           <input
//             type="text"
//             name="status"
//             value={certificate.status || ""}
//             placeholder="-"
//             onChange={handleChange}
//           />

//           <label>Certificate File</label>
//           {certificate.certificateFile ? (
//             <a
//               href={`http://localhost:5000/${certificate.certificateFile}`}
//               target="_blank"
//               rel="noreferrer"
//               className="pdf-link"
//             >
//               View Certificate PDF
//             </a>
//           ) : (
//             <input type="text" value="-" disabled />
//           )}

//           <div className="edit-actions">
//             <button type="submit" className="update-btn" disabled={loading}>
//               {loading ? "Updating..." : "Update Certificate"}
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EditCertificate.css";

export default function EditCertificate() {

  const { certId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);

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

    } catch (error) {

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
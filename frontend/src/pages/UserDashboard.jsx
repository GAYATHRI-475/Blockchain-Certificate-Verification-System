

// // File: pages/UserDashboard.jsx
// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // //import CertificateModal from "../components/CertificateModal"; // optional
// // import styles from "./UserDashboard.module.css";

// // export default function UserDashboard() {
// //   const [user, setUser] = useState({ name: "", email: "" });
// //   const [certificates, setCertificates] = useState([]);
// //   const [requests, setRequests] = useState([]);
// //   const [selectedCert, setSelectedCert] = useState(null);

// //   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     if (!token) return;

// //     const decoded = JSON.parse(atob(token.split(".")[1]));
// //     setUser({ name: decoded.name || "User", email: decoded.email });

// //     axios
// //       .get("http://localhost:5000/api/user-dashboard/certificates", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       .then((res) => setCertificates(res.data.certificates))
// //       .catch((err) => console.error(err));

// //     axios
// //       .get("http://localhost:5000/api/user-dashboard/requests", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       .then((res) => setRequests(res.data.requests))
// //       .catch((err) => console.error(err));
// //   }, [token]);

// //   return (
// //     <div>
// //       <h1 className={styles.dashboardTitle}>Welcome back, {user.name}</h1>
// //       <p className={styles.dashboardSubtitle}>
// //         Here’s your certificates and requests summary
// //       </p>

// //       {/* Stats Cards */}
// //       <div className={styles.dashboardStats}>
// //         <div className={styles.statCard}>
// //           <h2>Total Certificates</h2>
// //           <p>{certificates.length}</p>
// //         </div>
// //         <div className={styles.statCard}>
// //           <h2>Pending Requests</h2>
// //           <p>{requests.filter((r) => r.status === "pending").length}</p>
// //         </div>
// //         <div className={styles.statCard}>
// //           <h2>Approved Requests</h2>
// //           <p>{requests.filter((r) => r.status === "approved").length}</p>
// //         </div>
// //       </div>

// //       {/* Certificates Table */}
// //       <div className={styles.certificatesTable}>
// //         <h2>Your Certificates</h2>
// //         {certificates.length === 0 ? (
// //           <p>No certificates issued yet.</p>
// //         ) : (
// //           <table className={styles.darkTable}>
// //             <thead>
// //               <tr>
// //                 <th>Title</th>
// //                 <th>Type</th>
// //                 <th>Department</th>
// //                 <th>Issued</th>
// //                 <th>Status</th>
// //                 <th>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {certificates.map((cert) => (
// //                 <tr key={cert._id}>
// //                   <td>{cert.certificateTitle}</td>
// //                   <td>{cert.credentialType}</td>
// //                   <td>{cert.department}</td>
// //                   <td>{new Date(cert.issueDate).toLocaleDateString()}</td>
// //                   <td
// //                     className={
// //                       cert.status === "active"
// //                         ? styles.statusActive
// //                         : styles.statusRevoked
// //                     }
// //                   >
// //                     {cert.status}
// //                   </td>
// //                   <td>
// //                     <button
// //                       className={styles.viewBtn}
// //                       onClick={() => setSelectedCert(cert)}
// //                     >
// //                       View
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         )}
// //       </div>

// //       {selectedCert && (
// //         <CertificateModal
// //           cert={selectedCert}
// //           onClose={() => setSelectedCert(null)}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./UserDashboard.css";

// import certIcon from "../assets/icons/issued_img.png";
// import pendingIcon from "../assets/icons/request.png";
// import approvedIcon from "../assets/icons/req_approve.png";

// export default function UserDashboard() {

//   const [user, setUser] = useState({ name: "", email: "" });
//   const [certificates, setCertificates] = useState([]);
//   const [requests, setRequests] = useState([]);
//   const [search, setSearch] = useState("");

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {

//     if (!token) return;

//     const decoded = JSON.parse(atob(token.split(".")[1]));
//     setUser({ name: decoded.name || "User", email: decoded.email });

//     axios
//       .get("http://localhost:5000/api/user-dashboard/certificates", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setCertificates(res.data.certificates))
//       .catch((err) => console.error(err));

//     axios
//       .get("http://localhost:5000/api/user-dashboard/requests", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setRequests(res.data.requests))
//       .catch((err) => console.error(err));

//   }, [token]);


//   /* -----------------------------
//      VIEW CERTIFICATE
//   ----------------------------- */

//   const handleView = (cert) => {
//     navigate(`/certificate/${cert._id}`);
//   };


//   /* -----------------------------
//      FILTER CERTIFICATES
//   ----------------------------- */

//   const filteredCertificates = certificates.filter((cert) => {

//     const searchText = search.toLowerCase();

//     return (
//       (cert.certificateTitle || "").toLowerCase().includes(searchText) ||
//       (cert.credentialType || "").toLowerCase().includes(searchText) ||
//       (cert.department || "").toLowerCase().includes(searchText)
//     );

//   });


//   return (

//     <div className="dashboard-content">

//       {/* Header */}

//       <div className="header">
//         <h1>Welcome back, {user.name}</h1>
//         <p>Here are your certificates and request updates</p>
//       </div>


//       {/* Stats */}

//       <div className="stats">

//         <div className="stat-card">
//           <img src={certIcon} alt="certificates" />
//           <div>
//             <p>Total Certificates</p>
//             <h2>{certificates.length}</h2>
//           </div>
//         </div>

//         <div className="stat-card">
//           <img src={pendingIcon} alt="pending" />
//           <div>
//             <p>Pending Requests</p>
//             <h2>
//               {requests.filter((r) => r.status === "Pending").length}
//             </h2>
//           </div>
//         </div>

//         <div className="stat-card">
//           <img src={approvedIcon} alt="approved" />
//           <div>
//             <p>Approved Requests</p>
//             <h2>
//               {requests.filter((r) => r.status === "Approved").length}
//             </h2>
//           </div>
//         </div>

//       </div>


//       {/* Certificates Table */}

//       <div className="recent">

//         <div className="table-header">

//           <h2>Your Certificates</h2>

//           <input
//             type="text"
//             placeholder="Search certificates..."
//             className="search-bar"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//         </div>


//         <div className="table-container">

//           <table className="dark-table">

//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Type</th>
//                 <th>Department</th>
//                 <th>Issued Date</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>

//               {filteredCertificates.length > 0 ? (

//                 filteredCertificates.map((cert) => (

//                   <tr key={cert._id}>

//                     <td>{cert.certificateTitle}</td>

//                     <td>{cert.credentialType}</td>

//                     <td>{cert.department}</td>

//                     <td>
//                       {new Date(cert.issueDate).toLocaleDateString()}
//                     </td>

//                     <td>
//                       <span
//                         className={
//                           cert.status === "active"
//                             ? "status-active"
//                             : "status-revoked"
//                         }
//                       >
//                         {cert.status}
//                       </span>
//                     </td>

//                     <td>
//                       <button
//                         className="view-btn"
//                         onClick={() => navigate(`/certificate/${cert.certId}`)}
//                       >
//                         View
//                       </button>
//                     </td>

//                   </tr>

//                 ))

//               ) : (

//                 <tr>
//                   <td colSpan="6" className="no-data">
//                     No certificates found
//                   </td>
//                 </tr>

//               )}

//             </tbody>

//           </table>

//         </div>

//       </div>

//     </div>

//   );

// }

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

import certIcon from "../assets/icons/issued_img.png";
import pendingIcon from "../assets/icons/request.png";
import approvedIcon from "../assets/icons/req_approve.png";

export default function UserDashboard() {

  const [user, setUser] = useState({ name: "", email: "" });
  const [certificates, setCertificates] = useState([]);
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {

    if (!token) return;

    const decoded = JSON.parse(atob(token.split(".")[1]));
    setUser({ name: decoded.name || "User", email: decoded.email });

    axios
      .get("http://localhost:5000/api/user-dashboard/certificates", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCertificates(res.data.certificates))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:5000/api/user-dashboard/requests", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRequests(res.data.requests))
      .catch((err) => console.error(err));

  }, [token]);


  /* -----------------------------
     FILTER CERTIFICATES
  ----------------------------- */

  const filteredCertificates = certificates.filter((cert) => {

    const searchText = search.toLowerCase();

    return (
      (cert.certificateTitle || "").toLowerCase().includes(searchText) ||
      (cert.credentialType || "").toLowerCase().includes(searchText) ||
      (cert.department || "").toLowerCase().includes(searchText)
    );

  });


  return (

    <div className="dashboard-content">

      {/* Header */}
      <div className="header">
        <h1>Welcome back, {user.name}</h1>
        <p>Here are your certificates and request updates</p>
      </div>

      {/* Stats */}
      <div className="stats">
        <div className="stat-card">
          <img src={certIcon} alt="certificates" />
          <div>
            <p>Total Certificates</p>
            <h2>{certificates.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <img src={pendingIcon} alt="pending" />
          <div>
            <p>Pending Requests</p>
            <h2>
              {requests.filter((r) => r.status === "Pending").length}
            </h2>
          </div>
        </div>

        <div className="stat-card">
          <img src={approvedIcon} alt="approved" />
          <div>
            <p>Approved Requests</p>
            <h2>
              {requests.filter((r) => r.status === "Approved").length}
            </h2>
          </div>
        </div>
      </div>

      {/* Certificates Table */}
      <div className="recent">
        <div className="table-header">
          <h2>Your Certificates</h2>
          <input
            type="text"
            placeholder="Search certificates..."
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table className="dark-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Department</th>
                <th>Issued Date</th>
                <th>Status</th>
                <th>PDF</th> {/* New column */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCertificates.length > 0 ? (
                filteredCertificates.map((cert) => (
                  <tr key={cert._id}>
                    <td>{cert.certificateTitle}</td>
                    <td>{cert.credentialType}</td>
                    <td>{cert.department}</td>
                    <td>{new Date(cert.issueDate).toLocaleDateString()}</td>

                    <td>
                      <span
                        className={
                          cert.status === "active"
                            ? "status-active"
                            : "status-revoked"
                        }
                      >
                        {cert.status}
                      </span>
                    </td>

                    {/* VIEW PDF BUTTON */}
                    <td>
                      {cert.certificateFile ? (
                        <a
                          href={`http://localhost:5000/${cert.certificateFile}`}
                          target="_blank"
                          rel="noreferrer"
                          className="view-pdf-btn"
                        >
                          View PDF
                        </a>
                      ) : (
                        <span>-</span>
                      )}
                    </td>

                    <td>
                      <button
                        className="view-btn"
                        onClick={() =>
                          navigate(`/certificate/${cert.certId}`)
                        }
                      >
                        View
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    No certificates found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
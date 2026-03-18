// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./IssuerRequests.css";

// export default function IssuerRequests() {

//   const [requests, setRequests] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {

//     const fetchRequests = async () => {

//       try {

//         const token = localStorage.getItem("token");

//         const res = await axios.get(
//           "http://localhost:5000/api/issuer/requests",
//           {
//             headers: { Authorization: `Bearer ${token}` }
//           }
//         );

//         if (res.data.success) {
//           setRequests(res.data.requests);
//         }

//       } catch (error) {
//         console.error("Error fetching issuer requests:", error);
//       }

//     };

//     fetchRequests();

//   }, []);


//   /* -----------------------------
//      APPROVE REQUEST
//   ----------------------------- */

//   const approveRequest = async (id) => {

//     try {

//       const token = localStorage.getItem("token");

//       await axios.put(
//         `http://localhost:5000/api/issuer/requests/${id}/approve`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setRequests((prev) =>
//         prev.map((req) =>
//           req._id === id ? { ...req, status: "Approved" } : req
//         )
//       );

//     } catch (error) {
//       console.error("Approve error:", error);
//     }

//   };


//   /* -----------------------------
//      REJECT REQUEST
//   ----------------------------- */

//   const rejectRequest = async (id) => {

//     try {

//       const token = localStorage.getItem("token");

//       await axios.put(
//         `http://localhost:5000/api/issuer/requests/${id}/reject`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setRequests((prev) =>
//         prev.map((req) =>
//           req._id === id ? { ...req, status: "Rejected" } : req
//         )
//       );

//     } catch (error) {
//       console.error("Reject error:", error);
//     }

//   };


//   /* -----------------------------
//      SEARCH FILTER
//   ----------------------------- */

//   const filteredRequests = requests.filter((req) => {

//     const text = search.toLowerCase();

//     return (
//       (req.studentName || "").toLowerCase().includes(text) ||
//       (req.credentialType || "").toLowerCase().includes(text) ||
//       (req.certificateTitle || "").toLowerCase().includes(text) ||
//       (req.status || "").toLowerCase().includes(text)
//     );

//   });


//   return (

//     <div className="issuer-requests-container">

//       <div className="issuer-requests-header">

//         <div>
//           <h1 className="issuer-requests-title">User Requests</h1>
//           <p className="issuer-requests-subtitle">
//             Requests submitted by users for certificate issuance.
//           </p>
//         </div>

//         {/* SEARCH */}
//         <input
//           type="text"
//           placeholder="Search requests..."
//           className="issuer-requests-search"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//       </div>


//       <div className="issuer-requests-table-container">

//         <table className="issuer-requests-table">

//           <thead>
//             <tr>
//               <th>Student</th>
//               <th>Credential Type</th>
//               <th>Certificate Title</th>
//               <th>Action</th>
//               <th>Description</th>
//               <th>Requested Date</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>

//             {filteredRequests.length > 0 ? (

//               filteredRequests.map((req) => (

//                 <tr key={req._id}>

//                   <td>{req.studentName}</td>

//                   <td>{req.credentialType}</td>

//                   <td>{req.certificateTitle}</td>

//                   <td>{req.action}</td>

//                   <td>{req.description}</td>

//                   <td>
//                     {new Date(req.createdAt).toLocaleDateString()}
//                   </td>

//                   <td>
//                     <span
//                       className={
//                         req.status === "Approved"
//                           ? "status-approved"
//                           : req.status === "Rejected"
//                           ? "status-rejected"
//                           : "status-pending"
//                       }
//                     >
//                       {req.status}
//                     </span>
//                   </td>

//                   <td>

//                     {req.status === "Pending" ? (
//                       <>
//                         <button
//                           className="approve-btn"
//                           onClick={() => approveRequest(req._id)}
//                         >
//                           Approve
//                         </button>

//                         <button
//                           className="reject-btn"
//                           onClick={() => rejectRequest(req._id)}
//                         >
//                           Reject
//                         </button>
//                       </>
//                     ) : (
//                       "-"
//                     )}

//                   </td>

//                 </tr>

//               ))

//             ) : (

//               <tr>
//                 <td colSpan="8" className="no-data">
//                   No requests found
//                 </td>
//               </tr>

//             )}

//           </tbody>

//         </table>

//       </div>

//     </div>

//   );

// }

// File: src/pages/IssuerRequests.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./IssuerRequests.css";

export default function IssuerRequests() {

  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const fetchRequests = async () => {

      try {

        const issuerEmail = localStorage.getItem("email");

        const res = await axios.get(
          `http://localhost:5000/api/issuer/requests?email=${issuerEmail}`
        );

        if (res.data.success) {
          setRequests(res.data.requests);
        }

      } catch (error) {
        console.error("Error fetching issuer requests:", error);
      }

    };

    fetchRequests();

  }, []);


  /*
  --------------------------------
  APPROVE REQUEST
  --------------------------------
  */

  const approveRequest = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/issuer/requests/${id}`,
        { status: "Approved" }
      );

      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: "Approved" } : req
        )
      );

    } catch (error) {
      console.error("Approve error:", error);
    }

  };


  /*
  --------------------------------
  REJECT REQUEST
  --------------------------------
  */

  const rejectRequest = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/issuer/requests/${id}`,
        { status: "Rejected" }
      );

      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: "Rejected" } : req
        )
      );

    } catch (error) {
      console.error("Reject error:", error);
    }

  };


  /*
  --------------------------------
  SEARCH FILTER
  --------------------------------
  */

  const filteredRequests = requests.filter((req) => {

    const text = search.toLowerCase();

    return (
      (req.studentName || "").toLowerCase().includes(text) ||
      (req.studentEmail || "").toLowerCase().includes(text) ||
      (req.credentialType || "").toLowerCase().includes(text) ||
      (req.certificateTitle || "").toLowerCase().includes(text)
    );

  });


  return (

    <div className="issuer-requests-container">

      <div className="issuer-requests-header">

        <div>
          <h1 className="issuer-requests-title">User Requests</h1>
          <p className="issuer-requests-subtitle">
            Requests submitted by users for certificate issuance.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search requests..."
          className="issuer-requests-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>


      <div className="issuer-requests-table-container">

        <table className="issuer-requests-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Credential Type</th>
              <th>Certificate Title</th>
              <th>Action</th>
              <th>Date</th>
              <th>Expected Issue</th>
              <th>Status</th>
              <th>Action Button</th>
            </tr>
          </thead>

          <tbody>

            {filteredRequests.length > 0 ? (

              filteredRequests.map((req) => (

                <tr key={req._id}>

                  <td>{req.studentName}</td>

                  <td>{req.studentEmail}</td>

                  <td>{req.credentialType}</td>

                  <td>{req.certificateTitle}</td>

                  <td>{req.action}</td>

                  <td>
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    {req.issueDate
                      ? new Date(req.issueDate).toLocaleDateString()
                      : "-"
                    }
                  </td>

                  <td>
                    <span
                      className={
                        req.status === "Approved"
                          ? "status-approved"
                          : req.status === "Rejected"
                          ? "status-rejected"
                          : "status-pending"
                      }
                    >
                      {req.status}
                    </span>
                  </td>

                  <td>

                    {req.status === "Pending" ? (
                      <>
                        <button
                          className="approve-btn"
                          onClick={() => approveRequest(req._id)}
                        >
                          Approve
                        </button>

                        <button
                          className="reject-btn"
                          onClick={() => rejectRequest(req._id)}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      "-"
                    )}

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="9" className="no-data">
                  No requests found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewRequest.css";

export default function ViewRequests() {

  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchRequests = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/user-dashboard/requests",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (res.data.success) {
          setRequests(res.data.requests);
        }

      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }

    };

    fetchRequests();

  }, []);

  /* -----------------------------
     SEARCH FILTER
  ----------------------------- */

  const filteredRequests = requests.filter((req) => {

    const text = search.toLowerCase();

    return (
      (req.issuerEmail || "").toLowerCase().includes(text) ||
      (req.credentialType || "").toLowerCase().includes(text) ||
      (req.certificateTitle || "").toLowerCase().includes(text) ||
      (req.action || "").toLowerCase().includes(text) ||
      (req.status || "").toLowerCase().includes(text)
    );

  });


  if (loading) {
    return <p className="vr-loading">Loading requests...</p>;
  }


  return (

    <div className="vr-container">

      <div className="vr-header">

        <div>
          <h1 className="vr-title">My Requests</h1>
          <p className="vr-subtitle">
            List of certificate requests you have submitted.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search requests..."
          className="vr-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>


      <div className="vr-table-container">

        <table className="vr-table">

          <thead>
            <tr>
              <th>Issuer Email</th>
              <th>Credential Type</th>
              <th>Certificate Title</th>
              <th>Action</th>
              <th>Requested Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {filteredRequests.length > 0 ? (

              filteredRequests.map((req) => (

                <tr key={req._id}>

                  <td>{req.issuerEmail}</td>

                  <td>{req.credentialType}</td>

                  <td>{req.certificateTitle}</td>

                  <td>{req.action}</td>

                  <td>
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    <span
                      className={
                        req.status === "Approved"
                          ? "vr-status-approved"
                          : req.status === "Rejected"
                          ? "vr-status-rejected"
                          : "vr-status-pending"
                      }
                    >
                      {req.status}
                    </span>
                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="6" className="vr-no-data">
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
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserRequest.css";

export default function UserRequest() {

  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    department: "",
    issuerEmail: "",
    credentialType: "University Degree",
    certificateTitle: "",
    issueDate: "",
    action: "Issue",
    description: ""
  });

  const [issuers, setIssuers] = useState([]);
  const [loading, setLoading] = useState(false);

  /*
  -----------------------------
  FETCH ISSUER EMAILS
  -----------------------------
  */

    useEffect(() => {
      const fetchIssuers = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/issuers");
          const issuerArray = res.data.data || [];

          setIssuers(issuerArray);

          issuerArray.forEach((issuer) => console.log("Dropdown option:", issuer.email));
        } catch (err) {
          console.error("Error fetching issuers:", err);
        }
      };

      fetchIssuers();
    }, []);


  /*
  -----------------------------
  HANDLE INPUT CHANGE
  -----------------------------
  */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  /*
  -----------------------------
  HANDLE FORM SUBMIT
  -----------------------------
  */

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/user-dashboard/requests",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {

        alert("Request submitted successfully!");

        setFormData({
          studentName: "",
          studentEmail: "",
          department: "",
          issuerEmail: "",
          credentialType: "University Degree",
          certificateTitle: "",
          issueDate: "",
          action: "Issue",
          description: ""
        });

      }

    } catch (err) {

      console.error("Error submitting request:", err);
      alert("Failed to submit request");

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="user-request-page">

      <h2 className="user-request-title">
        Raise Certificate Request
      </h2>

      <p className="user-request-subtitle">
        Submit a request to an issuer to generate your certificate
      </p>


      <div className="user-request-card">

        <form
          className="user-request-form"
          onSubmit={handleSubmit}
        >

          <div>
            <label>Student Name</label>
            <input
              type="text"
              name="studentName"
              placeholder="Enter your name"
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
              placeholder="Enter your email"
              value={formData.studentEmail}
              onChange={handleChange}
              required
            />
          </div>


          <div>
            <label>Department</label>
            <input
              type="text"
              name="department"
              placeholder="Enter your department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>


          <div>
            <label>Issuer Email</label>
            
            <select
              name="issuerEmail"
              value={formData.issuerEmail}
              onChange={handleChange}
              required
            >
              <option value="">
                {issuers.length === 0 ? "Loading issuers..." : "Select Issuer Email"}
              </option>

              {issuers.map((issuer) => (
                <option key={issuer._id} value={issuer.email}>
                  {issuer.email}
                </option>
              ))}
            </select>

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
            <label>Action</label>

            <select
              name="action"
              value={formData.action}
              onChange={handleChange}
              required
            >
              <option value="Issue">Issue</option>
              <option value="Revoke">Revoke</option>
            </select>
          </div>


          <div>
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Enter request description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>

        </form>

        <div className="user-request-submit">
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </div>

      </div>

    </div>

  );

}
import { useNavigate, useLocation } from "react-router-dom";
import "./IssuerSidebar.css";

import dashboardIcon from "../assets/icons/dashboard.png";
import issueIcon from "../assets/icons/issue.png";
import issuedIcon from "../assets/icons/issued.png";
import requestIcon from "../assets/icons/request.png";
import logoutIcon from "../assets/icons/logout.png";

export default function IssuerSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sidebar">
      {/* 🔷 Profile */}
      <div className="profile">
        <div className="avatar">🎖️</div>
        <div>
          <h3>{localStorage.getItem("name") || "Issuer"}</h3>
          <p>Issuer</p>
        </div>
      </div>

      {/* 🔷 Menu */}
      <ul className="menu">
        <li
          className={location.pathname === "/dashboard" ? "active" : ""}
          onClick={() => navigate("/dashboard")}
        >
          <img src={dashboardIcon} className="icon-img" alt="dashboard" />
          Dashboard
        </li>

        <li
          className={location.pathname === "/issue" ? "active" : ""}
          onClick={() => navigate("/issue")}
        >
          <img src={issueIcon} className="icon-img" alt="issue" />
          Issue Credential
        </li>

        <li
          className={location.pathname === "/issued" ? "active" : ""}
          onClick={() => navigate("/issued")}
        >
          <img src={issuedIcon} className="icon-img" alt="issued" />
          Issued Credentials
        </li>

        <li
          className={location.pathname === "/issuer-requests" ? "active" : ""}
          onClick={() => navigate("/issuer-requests")}
        >
          <img src={requestIcon} className="icon-img" alt="requests" />
          Requests
        </li>

        <li
          className="logout"
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          <img src={logoutIcon} className="icon-img" alt="logout" />
          Logout
        </li>
      </ul>
    </div>
  );
}
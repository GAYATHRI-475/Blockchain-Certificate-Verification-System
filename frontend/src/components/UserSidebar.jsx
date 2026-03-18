// import { useNavigate, useLocation } from "react-router-dom";
// import styles from "./UserSidebar.module.css";

// import dashboardIcon from "../assets/icons/dashboard.png";
// import requestIcon from "../assets/icons/request.png";
// import viewRequest from "../assets/icons/req_approve.png";
// import logoutIcon from "../assets/icons/logout.png";

// export default function UserSidebar({ userName }) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   return (
//     <div className={styles.sidebar}>
//       {/* Profile */}
//       <div className={styles.profile}>
//         <div className={styles.avatar}>👤</div>
//         <div>
//           <h3>{userName || localStorage.getItem("name") || "User"}</h3>
//           <p>User</p>
//         </div>
//       </div>

//       {/* Menu */}
//       <ul className={styles.menu}>
//         <li
//           className={location.pathname.startsWith("/user-dashboard") ? styles.active : ""}
//           onClick={() => navigate("/user-dashboard")}
//         >
//           <img src={dashboardIcon} className={styles.iconImg} alt="dashboard" />
//           Dashboard
//         </li>

//         <li
//           className={location.pathname.startsWith("/user-requests") ? styles.active : ""}
//           onClick={() => navigate("/user-requests")}
//         >
//           <img src={requestIcon} className={styles.iconImg} alt="requests" />
//           Raise Requests
//         </li>

//         <li
//           className={location.pathname.startsWith("/view-requests") ? styles.active : ""}
//           onClick={() => navigate("/view-requests")}
//         >
//           <img src={viewRequest} className={styles.iconImg} alt="view requests" />
//           View Requests
//         </li>

//         <li
//           className={styles.logout}
//           onClick={() => {
//             localStorage.clear();
//             navigate("/");
//           }}
//         >
//           <img src={logoutIcon} className={styles.iconImg} alt="logout" />
//           Logout
//         </li>
//       </ul>
//     </div>
//   );
// }


import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import styles from "./UserSidebar.module.css";

import dashboardIcon from "../assets/icons/dashboard.png";
import requestIcon from "../assets/icons/request.png";
import viewRequest from "../assets/icons/req_approve.png";
import logoutIcon from "../assets/icons/logout.png";

export default function UserSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(AppContext);

  return (
    <div className={styles.sidebar}>
      <div className={styles.profile}>
        <div className={styles.avatar}>👤</div>
        <div>
          <h3>{user?.name || "User"}</h3>
          <p>User</p>
        </div>
      </div>

      <ul className={styles.menu}>
        <li
          className={location.pathname.startsWith("/user-dashboard") ? styles.active : ""}
          onClick={() => navigate("/user-dashboard")}
        >
          <img src={dashboardIcon} className={styles.iconImg} alt="dashboard" />
          Dashboard
        </li>

        <li
          className={location.pathname.startsWith("/user-requests") ? styles.active : ""}
          onClick={() => navigate("/user-requests")}
        >
          <img src={requestIcon} className={styles.iconImg} alt="requests" />
          Raise Requests
        </li>

        <li
          className={location.pathname.startsWith("/view-requests") ? styles.active : ""}
          onClick={() => navigate("/view-requests")}
        >
          <img src={viewRequest} className={styles.iconImg} alt="view requests" />
          View Requests
        </li>

        <li
          className={styles.logout}
          onClick={() => {
            localStorage.clear();
            setUser(null);
            navigate("/");
          }}
        >
          <img src={logoutIcon} className={styles.iconImg} alt="logout" />
          Logout
        </li>
      </ul>
    </div>
  );
}
import { Outlet } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";
import "./UserLayout.css";

export default function UserLayout() {
  return (
    <div className="user-layout">
      <UserSidebar />
      <div className="user-content">
        <Outlet />
      </div>
    </div>
  );
}
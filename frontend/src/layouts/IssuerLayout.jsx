import { Outlet } from "react-router-dom";
import IssuerSidebar from "../components/IssuerSidebar";
import "./IssuerLayout.css";

export default function IssuerLayout() {
  return (
    <div className="layout">
      <IssuerSidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
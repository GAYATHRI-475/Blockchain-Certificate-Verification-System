import React from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeGenerator({ certificateHash }) {
  if (!certificateHash) return null;

  const verifyURL = `http://192.168.137.1:5173/verify/${certificateHash}`;

  return (
    <div style={{ textAlign: "center", marginTop: "15px" }}>
      <QRCodeCanvas value={verifyURL} size={180} />

      <p style={{ fontSize: "12px", marginTop: "10px", color: "#aaa" }}>
        Scan to verify certificate
      </p>
    </div>
  );
}
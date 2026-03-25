import express from "express";
import { verifyCertificate } from "../utils/blockchain.js";
import Certificate from "../models/Certificate.js"; // optional MongoDB for extra details

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { certificateHash } = req.body;

    console.log("Received certificateHash:", certificateHash);

    if (!certificateHash || typeof certificateHash !== "string") {
      return res.status(400).json({
        success: false,
        message: "Certificate hash is required and must be a string.",
      });
    }

    // Step 1: Verify on blockchain
    let blockchainCert;
    try {
      blockchainCert = await verifyCertificate(certificateHash);
      console.log("Blockchain verification result:", blockchainCert);
    } catch (err) {
      console.error("Blockchain verification error:", err);
      return res.status(500).json({
        success: false,
        message: "Error verifying certificate on blockchain",
      });
    }

    if (!blockchainCert.exists) {
      console.log("Certificate not found on blockchain ❌");
      return res.status(404).json({
        success: false,
        message: "Certificate not found ❌",
      });
    }

    // Step 2: Optional DB fetch for extra details
    let certFromDB = null;
    try {
      certFromDB = await Certificate.findOne({ certificateHash });
      console.log("Certificate found in DB:", certFromDB);
    } catch (dbError) {
      console.error("DB fetch error:", dbError);
    }

    const responseData = {
      certificateHash,
      ipfsHash: blockchainCert.ipfsHash,
      issuerWallet: blockchainCert.issuerWallet,
      issuedTimestamp: blockchainCert.issuedTimestamp,

      studentName: certFromDB?.studentName || "",
      studentEmail: certFromDB?.studentEmail || "",
      department: certFromDB?.department || "",
      credentialType: certFromDB?.credentialType || "",
      certificateTitle: certFromDB?.certificateTitle || "",
      issueDate: certFromDB?.issueDate || "",
      expiryDate: certFromDB?.expiryDate || "",
      grade: certFromDB?.grade || "",
      issuerEmail: certFromDB?.issuerEmail || "",
      certificateFile: certFromDB?.certificateFile || "",
      status: certFromDB?.status || "active",
    };

    console.log("Sending responseData:", responseData);

    return res.status(200).json({
      success: true,
      message:
        certFromDB?.status === "revoked"
          ? "Certificate revoked ❌"
          : "Certificate verified ✅",
      data: responseData,
    });

  } catch (err) {
    console.error("Verification route error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during certificate verification",
    });
  }
});

export default router;
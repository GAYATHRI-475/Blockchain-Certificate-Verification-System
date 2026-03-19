import express from "express";
import fs from "fs";
import crypto from "crypto";

import { upload } from "../utils/upload.js";
import { uploadToIPFS } from "../utils/ipfs.js";
import Certificate from "../models/Certificate.js";

const router = express.Router();

/*
-----------------------------------
ISSUE CERTIFICATE (SAVE → PENDING)
-----------------------------------
*/
router.post("/issue", upload.single("certificate"), async (req, res) => {
  try {
    const {
      certId,
      studentName,
      studentEmail,
      department,
      credentialType,
      certificateTitle,
      issueDate,
      expiryDate,
      grade,
      issuerEmail
    } = req.body;

    const certificateFile = req.file ? req.file.path : null;

    if (!certificateFile) {
      return res.status(400).json({
        success: false,
        message: "Certificate PDF is required"
      });
    }

    // -------------------------
    // Upload PDF to IPFS
    // -------------------------
    const ipfsHash = await uploadToIPFS(certificateFile);
    console.log("IPFS Hash:", ipfsHash);

    // -------------------------
    // Compute certificate hash
    // -------------------------
    const certFields = {
      certId,
      studentName,
      studentEmail,
      department,
      credentialType,
      certificateTitle,
      issueDate,
      grade,
      issuerEmail
    };

    const certificateHash = crypto
      .createHash("sha256")
      .update(JSON.stringify(certFields))
      .digest("hex");

    console.log("Certificate Hash:", certificateHash);

    // -------------------------
    // SAVE TO DB (PENDING)
    // -------------------------
    await Certificate.create({
      certId,
      studentName,
      studentEmail,
      department,
      credentialType,
      certificateTitle,
      issueDate,
      expiryDate,
      grade,
      issuerEmail,
      certificateHash,
      ipfsHash,
      certificateFile,
      status: "pending"
    });

    // -------------------------
    // RETURN TO FRONTEND
    // -------------------------
    return res.json({
      success: true,
      message: "Saved as pending. Proceed to blockchain transaction.",
      certificate: {
        certId,
        certificateHash,
        ipfsHash
      }
    });

  } catch (error) {
    console.error("Error issuing certificate:", error);

    res.status(500).json({
      success: false,
      message: "Error issuing certificate"
    });
  }
});

/*
-----------------------------------
UPDATE TX STATUS (FROM FRONTEND)
-----------------------------------
*/
router.post("/update-tx", async (req, res) => {
  try {
    const { certId, txHash, success, error } = req.body;

    if (!certId) {
      return res.status(400).json({
        success: false,
        message: "certId is required"
      });
    }

    if (success) {
      // Save txHash only
      await Certificate.updateOne(
        { certId },
        { txHash }
      );
    } else {
      // Mark as failed
      await Certificate.updateOne(
        { certId },
        {
          status: "failed",
          failureReason: error || "Transaction failed"
        }
      );
    }

    res.json({ success: true });

  } catch (err) {
    console.error("TX update error:", err);

    res.status(500).json({
      success: false,
      message: "TX update failed"
    });
  }
});

/*
-----------------------------------
VERIFY CERTIFICATE (FROM DB)
-----------------------------------
*/
router.get("/verify/:certId", async (req, res) => {
  try {
    const { certId } = req.params;

    const certificate = await Certificate.findOne({ certId });

    if (!certificate) {
      return res.json({
        success: false,
        message: "Certificate not found"
      });
    }

    res.json({
      success: true,
      certificate
    });

  } catch (error) {
    console.error("Error verifying certificate:", error);

    res.status(500).json({
      success: false,
      message: "Verification failed"
    });
  }
});

/*
-----------------------------------
GET ALL CERTIFICATES
-----------------------------------
*/
router.get("/all", async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: certificates
    });

  } catch (error) {
    console.error("Error fetching certificates:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching certificates"
    });
  }
});

/*
-----------------------------------
GET SINGLE CERTIFICATE
-----------------------------------
*/
router.get("/:certId", async (req, res) => {
  try {
    const { certId } = req.params;

    const certificate = await Certificate.findOne({ certId });

    if (!certificate) {
      return res.json({
        success: false,
        message: "Certificate not found"
      });
    }

    res.json({
      success: true,
      data: certificate
    });

  } catch (error) {
    console.error("Error fetching certificate:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching certificate"
    });
  }
});

/*
-----------------------------------
UPDATE CERTIFICATE STATUS (MANUAL)
-----------------------------------
*/
router.patch("/:certId", async (req, res) => {
  try {
    const { certId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required"
      });
    }

    const allowedStatus = ["active", "revoked"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    const certificate = await Certificate.findOne({ certId });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found"
      });
    }

    certificate.status = status;

    await certificate.save();

    res.json({
      success: true,
      message: "Certificate status updated successfully",
      certificate
    });

  } catch (error) {
    console.error("Error updating certificate:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

export default router;
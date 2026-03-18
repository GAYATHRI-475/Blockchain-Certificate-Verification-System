// import express from "express";
// import fs from "fs";
// import crypto from "crypto";

// import Certificate from "../models/Certificate.js";
// import { upload } from "../utils/upload.js";
// import { uploadToIPFS } from "../utils/ipfs.js";
// import { issueCertificate } from "../utils/blockchain.js";

// const router = express.Router();

// /*
// -----------------------------------
// ISSUE CERTIFICATE
// -----------------------------------
// */
// router.post("/issue", upload.single("certificate"), async (req, res) => {

//   try {

//     const {
//       certId,
//       studentName,
//       studentEmail,
//       department,
//       credentialType,
//       certificateTitle,
//       issueDate,
//       expiryDate,
//       grade,
//       issuerEmail
//     } = req.body;

//     const certificateFile = req.file ? req.file.path : null;

//     if (!certificateFile) {
//       return res.status(400).json({
//         success: false,
//         message: "Certificate PDF is required"
//       });
//     }

//     /*
//     -----------------------------------
//     GENERATE CERTIFICATE HASH
//     -----------------------------------
//     */
//     const fileBuffer = fs.readFileSync(certificateFile);

//     const certificateHash = crypto
//       .createHash("sha256")
//       .update(fileBuffer)
//       .digest("hex");

//     /*
//     -----------------------------------
//     UPLOAD CERTIFICATE TO IPFS
//     -----------------------------------
//     */
//     const ipfsHash = await uploadToIPFS(certificateFile);

//     /*
//     -----------------------------------
//     STORE DATA ON BLOCKCHAIN
//     -----------------------------------
//     */
//     const txHash = await issueCertificate(
//       certId,
//       certificateHash,
//       ipfsHash
//     );

//     /*
//     -----------------------------------
//     SAVE CERTIFICATE IN DATABASE
//     -----------------------------------
//     */
//     const certificate = new Certificate({
//       certId,
//       studentName,
//       studentEmail,
//       department,
//       credentialType,
//       certificateTitle,
//       issueDate,
//       expiryDate,
//       grade,
//       certificateFile,
//       certificateHash,
//       ipfsHash,
//       txHash,
//       status: "active",
//       issuerEmail,
//     });

//     await certificate.save();

//     console.log("Certificate saved:", certificate);

//     res.json({
//       success: true,
//       message: "Certificate issued successfully",
//       certificate
//     });

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Error issuing certificate"
//     });

//   }

// });


// /*
// -----------------------------------
// VERIFY CERTIFICATE
// -----------------------------------
// */
// router.get("/verify/:certId", async (req, res) => {

//   try {

//     const { certId } = req.params;

//     const certificate = await Certificate.findOne({ certId });

//     if (!certificate) {
//       return res.json({
//         success: false,
//         message: "Certificate not found"
//       });
//     }

//     res.json({
//       success: true,
//       certificate
//     });

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Verification failed"
//     });

//   }

// });


// /*
// -----------------------------------
// GET ALL CERTIFICATES
// -----------------------------------
// */
// router.get("/all", async (req, res) => {

//   try {

//     const certificates = await Certificate
//       .find()
//       .sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       data: certificates
//     });

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Error fetching certificates"
//     });

//   }

// });


// /*
// -----------------------------------
// GET SINGLE CERTIFICATE
// -----------------------------------
// */
// router.get("/:certId", async (req, res) => {

//   try {

//     const { certId } = req.params;

//     const certificate = await Certificate.findOne({ certId });

//     if (!certificate) {
//       return res.json({
//         success: false,
//         message: "Certificate not found"
//       });
//     }

//     res.json({
//       success: true,
//       data: certificate
//     });

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Error fetching certificate"
//     });

//   }

// });


// /*
// -----------------------------------
// UPDATE CERTIFICATE STATUS
// -----------------------------------
// */
// router.patch("/:certId", async (req, res) => {
//   const { certId } = req.params;
//   const { status } = req.body;

//   if (!status) {
//     return res.status(400).json({ success: false, message: "Status is required" });
//   }

//   try {
//     const certificate = await Certificate.findOne({ certId });

//     if (!certificate) {
//       return res.status(404).json({ success: false, message: "Certificate not found" });
//     }

//     // Only update status
//     certificate.status = status;
//     await certificate.save();

//     return res.json({ success: true, message: "Certificate status updated successfully" });

//   } catch (error) {
//     console.error("Error updating certificate:", error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// export default router;

import express from "express";
import fs from "fs";
import crypto from "crypto";

import Certificate from "../models/Certificate.js";
import { upload } from "../utils/upload.js";
import { uploadToIPFS } from "../utils/ipfs.js";
import { issueCertificate } from "../utils/blockchain.js";

const router = express.Router();

/*
-----------------------------------
ISSUE CERTIFICATE
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

    const existing = await Certificate.findOne({ certId });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Certificate already issued"
      });
    }

    const certificateFile = req.file ? req.file.path : null;
    if (!certificateFile) {
      return res.status(400).json({ success: false, message: "Certificate PDF is required" });
    }

    // -------------------------
    // Upload PDF to IPFS
    // -------------------------
    const ipfsHash = await uploadToIPFS(certificateFile);

    // -------------------------
    // Compute certificate hash (SHA256 of metadata fields)
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

    const certString = JSON.stringify(certFields);
    const certificateHash = crypto.createHash("sha256").update(certString).digest("hex");

    // -------------------------
    // Store on blockchain
    // -------------------------
    const txHash = await issueCertificate(certId, certificateHash, ipfsHash);

    // -------------------------
    // Save certificate in database
    // -------------------------
    const certificate = new Certificate({
      ...certFields,
      expiryDate,
      certificateFile,
      certificateHash,
      ipfsHash,
      txHash,
      status: "active"
    });

    await certificate.save();

    console.log("Certificate saved:", certificate);

    res.json({
      success: true,
      message: "Certificate issued successfully",
      certificate: {
        certId,
        certificateHash,
        ipfsHash
      }
    });

  } catch (error) {
    console.error("Error issuing certificate:", error);
    res.status(500).json({ success: false, message: "Error issuing certificate" });
  }
});

/*
-----------------------------------
VERIFY CERTIFICATE
-----------------------------------
*/
router.get("/verify/:certId", async (req, res) => {
  try {
    const { certId } = req.params;

    const certificate = await Certificate.findOne({ certId });
    if (!certificate) return res.json({ success: false, message: "Certificate not found" });

    res.json({ success: true, certificate });
  } catch (error) {
    console.error("Error verifying certificate:", error);
    res.status(500).json({ success: false, message: "Verification failed" });
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
    res.json({ success: true, data: certificates });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    res.status(500).json({ success: false, message: "Error fetching certificates" });
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

    if (!certificate) return res.json({ success: false, message: "Certificate not found" });

    res.json({ success: true, data: certificate });
  } catch (error) {
    console.error("Error fetching certificate:", error);
    res.status(500).json({ success: false, message: "Error fetching certificate" });
  }
});

/*
-----------------------------------
UPDATE CERTIFICATE STATUS
-----------------------------------
*/

router.patch("/:certId", async (req, res) => {

  try {

    const { certId } = req.params;
    const { status } = req.body;

    // Validate status
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required"
      });
    }

    // Allow only valid values
    const allowedStatus = ["active", "revoked"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    // Find certificate
    const certificate = await Certificate.findOne({ certId });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found"
      });
    }

    // Update status
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
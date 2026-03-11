// // File: backend/routes/certificateRoutes.js
// import express from "express";
// import Certificate from "../models/Certificate.js";
// import upload from "../middleware/upload.js";
// import { issueCertificateOnBlockchain } from "../utils/blockchain.js";

// const router = express.Router();

// // POST /api/certificates/issue
// router.post("/issue", upload.single("certificateFile"), async (req, res) => {
//   try {
//     const { studentName, studentEmail, courseName, issuer } = req.body;
//     const certificateFile = req.file ? req.file.path : null;

//     // Validate required fields
//     if (!studentName || !studentEmail || !courseName || !certificateFile) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     const certId = Date.now().toString(); // simple unique certificate ID

//     // Issue certificate to blockchain (simulated)
//     const { certificateHash, transactionHash } = await issueCertificateOnBlockchain(
//       certId,
//       studentName,
//       courseName
//     );

//     // Save certificate to DB
//     const newCert = new Certificate({
//       certId,
//       studentName,
//       studentEmail,
//       courseName,
//       certificateFile,
//       certificateHash,
//       transactionHash,
//       issuer: issuer || null, // optional issuer ID
//     });

//     await newCert.save();

//     res.status(201).json({ success: true, certificate: newCert });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Failed to issue certificate" });
//   }
// });

// export default router;

// File: backend/routes/certificateRoutes.js

// File: backend/routes/certificateRoutes.js

import express from "express";
import Certificate from "../models/Certificate.js";
import { upload } from "../utils/upload.js";

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
      txHash
    } = req.body;

    const certificateFile = req.file ? req.file.path : null;

    if (!certificateFile) {
      return res.status(400).json({
        success: false,
        message: "Certificate file is required"
      });
    }

    const ipfsHash = "QmDummyHash";

    const certificate = new Certificate({
      certId,
      studentName,
      studentEmail,
      department,
      credentialType,
      certificateTitle,
      issueDate,
      expiryDate,
      grade,
      certificateFile,
      ipfsHash,
      txHash,
      status: "active"
    });

    await certificate.save();

    console.log("Saved certificate:", certificate);

    res.json({
      success: true,
      message: "Certificate stored successfully",
      certificate
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error issuing certificate"
    });

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

    console.error(error);

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

    const certificates = await Certificate
      .find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: certificates
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error fetching certificates"
    });

  }
});

export default router;
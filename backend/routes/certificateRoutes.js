import express from "express";
import { verifyCertificate } from "../utils/blockchain.js";
import { issueCertificate } from "../utils/blockchain.js";

const router = express.Router();

router.get("/verify/:id", async (req, res) => {
  try {
    const result = await verifyCertificate(req.params.id);
    res.json({
      success: true,
      studentName: result[0],
      course: result[1],
      ipfsHash: result[2],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/issue", async (req, res) => {
  try {
    const { certId, studentName, course, ipfsHash } = req.body;

    const txHash = await issueCertificate(
      certId,
      studentName,
      course,
      ipfsHash
    );

    res.json({
      success: true,
      transactionHash: txHash,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;

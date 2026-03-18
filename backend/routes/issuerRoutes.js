import express from "express";
import Issuer from "../models/Issuer.js";

const router = express.Router();

/*
--------------------------------
GET ALL ISSUERS
--------------------------------
*/

router.get("/", async (req, res) => {

  try {

    const issuers = await Issuer.find(
      {},
      { name: 1, email: 1 }
    );

    res.json({
      success: true,
      data: issuers
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

export default router;
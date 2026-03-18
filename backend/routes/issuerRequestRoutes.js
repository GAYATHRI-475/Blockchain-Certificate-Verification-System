// File: backend/routes/issuerRequestRoutes.js

import express from "express";
import { getIssuerRequests, updateRequestStatus } from "../controllers/issuerRequestController.js";

const router = express.Router();

router.get("/requests", getIssuerRequests);

router.put("/requests/:id", updateRequestStatus);

export default router;
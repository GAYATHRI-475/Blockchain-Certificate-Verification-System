// File: backend/routes/userDashboardRoutes.js
import express from "express";
import { getUserCertificates, getUserRequests, createUserRequest } from "../controllers/userDashboardController.js";
import { verifyUser } from "../middleware/userAuthMiddleware.js";

const router = express.Router();

// Fetch certificates for the logged-in user
router.get("/certificates", verifyUser, getUserCertificates);

// Fetch requests made by the logged-in user
router.get("/requests", verifyUser, getUserRequests);

// Submit a new request
router.post("/requests", verifyUser, createUserRequest);

export default router;
// File: routes/authRoutes.js
import express from "express";
import { googleLogin } from "../controllers/authControllers.js";

const router = express.Router();

// POST /api/auth/google
router.post("/google", googleLogin);

// ✅ default export for Node ES module
export default router;
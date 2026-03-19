// File: backend/server.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import userAuthRoutes from "./routes/userAuthRoutes.js";
import userDashboardRoutes from "./routes/userDashboardRoutes.js";
import issuerRoutes from "./routes/issuerRoutes.js";  
import issuerRequestRoutes from "./routes/issuerRequestRoutes.js";
import verifyRoutes from "./routes/verify.js";
import { startCertificateListener } from "./listeners/certificateListener.js";

dotenv.config();

const app = express();

/*
-----------------------------------
MIDDLEWARE
-----------------------------------
*/

// Parse JSON
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true
}));

// Serve uploaded certificate files
app.use("/uploads", express.static("uploads"));

/*
-----------------------------------
REQUEST LOGGER (optional)
-----------------------------------
*/
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

/*
-----------------------------------
ROUTES
-----------------------------------
*/

app.use("/api/auth", authRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/certificates", certificateRoutes);

app.use("/api/user-auth", userAuthRoutes);

app.use("/api/user-dashboard", userDashboardRoutes);

app.use("/api/issuers", issuerRoutes);

app.use("/api/issuer", issuerRequestRoutes);

app.use("/api/verify", verifyRoutes);

/*
-----------------------------------
MONGODB CONNECTION
-----------------------------------
*/

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


/*
-----------------------------------
START SERVER
-----------------------------------
*/

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // 🔥 START BLOCKCHAIN LISTENER
  await startCertificateListener();
});
// import express from "express";
// import { userRegister, userLogin, userGoogleLogin } from "../controllers/userAuthControllers.js";

// const router = express.Router();

// // ------------------- User Registration -------------------
// router.post("/user-register", userRegister);

// // ------------------- User Email/Password Login -------------------
// router.post("/user-login", userLogin);

// // ------------------- User Google Login -------------------
// router.post("/user-google-login", userGoogleLogin);

// export default router;

import express from "express";
import { userRegister, userLogin, userGoogleLogin } from "../controllers/userAuthControllers.js";

const router = express.Router();

// Registration
router.post("/user-register", userRegister);

// Email/password Login
router.post("/user-login", userLogin);

// Google Login
router.post("/user-google-login", userGoogleLogin);

export default router;
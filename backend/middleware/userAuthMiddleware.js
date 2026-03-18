import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyUser = async (req, res, next) => {

  const authHeader = req.headers["authorization"];

  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    console.log("Token verified. User email:", user.email);

    req.user = user; // attach user to request
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
};
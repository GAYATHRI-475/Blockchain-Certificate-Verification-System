import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";

// ------------------- User Registration -------------------
export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

// ------------------- User Login -------------------
export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Email not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};

// ------------------- User Google Login -------------------
export const userGoogleLogin = async (req, res) => {
  try {
    const { access_token } = req.body;

    const googleRes = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const { email, name } = googleRes.data;
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(403).json({ message: "Email not registered. Register first." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token, name, email });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
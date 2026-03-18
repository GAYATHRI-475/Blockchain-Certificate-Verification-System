import jwt from "jsonwebtoken";
import Issuer from "../models/Issuer.js";
import axios from "axios";

export const googleLogin = async (req, res) => {
  try {
    const { access_token } = req.body;

    // ✅ Get user info from Google
    const googleRes = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const { email, name } = googleRes.data;

    // normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // debug
    console.log("Google Email:", normalizedEmail);

    const issuer = await Issuer.findOne({
      email: normalizedEmail,
    });
    if (!issuer) {
      return res.status(403).json({
        message: "Access denied. Not a registered issuer.",
      });
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      { id: issuer._id, email: issuer.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      name,
      email,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
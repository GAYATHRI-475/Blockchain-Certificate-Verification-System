import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  recipientName: {
    type: String,
    required: true,
  },

  recipientEmail: {
    type: String,
    required: true,
    lowercase: true,   // 🔥 important for matching
    trim: true,
  },

  course: {
    type: String,
    required: true,
  },

  issuer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Issuer",
  },

  status: {
    type: String,
    enum: ["active", "revoked"],
    default: "active",
  },

  issuedAt: {
    type: Date,
    default: Date.now,
  },
});

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;
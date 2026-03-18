// File: backend/models/Request.js
import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  studentEmail: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  issuerEmail: {
    type: String,
    required: true
  },
  credentialType: {
    type: String,
    required: true
  },
  certificateTitle: {
    type: String,
    required: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  action: {
    type: String,
    enum: ["Issue", "Revoke"],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Approved", "Rejected"]
  }
}, { timestamps: true });

export default mongoose.model("Request", requestSchema);
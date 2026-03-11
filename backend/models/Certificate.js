import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({

  certId: {
    type: String,
    required: true,
    unique: true
  },

  studentName: {
    type: String,
    required: true
  },

  studentEmail: {
    type: String,
    required: true
  },

  credentialType: {
    type: String
  },

  issueDate: {
    type: String
  },

  expiryDate: {
    type: String
  },

  grade: {
    type: String
  },

  certificateFile: {
    type: String
  },

  ipfsHash: { 
    type: String 
  },

  txHash: { 
    type: String 
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Certificate", certificateSchema);
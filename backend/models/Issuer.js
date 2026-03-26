import mongoose from "mongoose";

const issuerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  walletAddress: { type: String },

  role: { 
    type: String, 
    enum: ["issuer"], 
    default: "issuer" 
  },

  collegeName: {type: String}
  
});

const Issuer = mongoose.model("Issuer", issuerSchema);

export default Issuer;
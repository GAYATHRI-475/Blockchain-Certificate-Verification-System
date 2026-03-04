// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },

  role: {
    type: String,
    enum: ["user"],
    default: "user"
  },

  certificates: [
    {
      title: String,
      issuedBy: String,
      date: Date
    }
  ]
});

export default mongoose.model("User", userSchema);
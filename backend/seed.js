// seed.js
import mongoose from "mongoose";
import Issuer from "./models/Issuer.js";
import dotenv from "dotenv";

dotenv.config();

const DB_URI = process.env.MONGO_URI;

mongoose.connect(DB_URI) 
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

const seedData = [
  { name: "Gayathri", email: "gayathribalu475@gmail.com", role: "issuer" },
];

const seedDB = async () => {
  try {
    await Issuer.deleteMany({});
    await Issuer.insertMany(seedData);
    console.log("Data seeded successfully");
  } catch (err) {
    console.log("Seeding error:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
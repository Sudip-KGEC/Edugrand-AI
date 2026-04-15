import mongoose from "mongoose";
import User from "../modules/auth/models/User.model.js";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME || "Edugrand_AI",
  });

  const existing = await User.findOne({ email: "admin@edugrand.com" });

  if (existing) {
    console.log("Admin already exists:", existing._id);
    process.exit();
  }

  const admin = await User.create({
    name: "Super Admin",
    email: "sudipkgec26@gmail.com",
    role: "admin",
    verified: true,
  });

  console.log("Admin created:", admin._id);

  process.exit();
};

createAdmin();
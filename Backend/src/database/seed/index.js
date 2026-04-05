import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedScholarships } from "./scholarship.seed.js";

dotenv.config();

const runSeeder = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI missing");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ DB connected");

    // 🔥 Get admin dynamically (better than hardcoded)
    const adminId = new mongoose.Types.ObjectId(
      process.env.SEED_ADMIN_ID
    );

    await seedScholarships(adminId);

    console.log("🎉 Seeding completed");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeder failed:", err);
    process.exit(1);
  }
};

runSeeder();
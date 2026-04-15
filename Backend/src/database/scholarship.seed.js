import mongoose from "mongoose";
import Scholarship from "../modules/scholarship/models/Scholarship.model.js";
import dotenv from "dotenv";

dotenv.config();

const ADMIN_ID = new mongoose.Types.ObjectId(process.env.SEED_ADMIN_ID);

const categories = ["Merit", "Need", "Sports", "Research"];
const degrees = ["Undergraduate", "Postgraduate", "PhD"];

const createScholarships = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME || "Edugrand_AI",
  });

  const scholarships = [];

  for (let i = 1; i <= 50; i++) {
    scholarships.push({
      name: `Scholarship ${i}`,
      provider: `Provider ${i}`,
      amount: Math.floor(Math.random() * 50000) + 10000,
      deadline: new Date(Date.now() + i * 86400000),
      category: categories[i % categories.length],
      gpaRequirement: (Math.random() * 4 + 6).toFixed(1),
      degreeLevel: degrees[i % degrees.length],
      description: `This is a detailed description for scholarship ${i}. It provides financial support to students.`,
      eligibility: ["Must be a student", "Valid academic record"],
      officialUrl:
        i <= 30 ? undefined : "https://www.google.com",
      adminId: ADMIN_ID,
    });
  }

  await Scholarship.insertMany(scholarships);

  console.log("50 Scholarships inserted");

  process.exit();
};

createScholarships();
import mongoose from "mongoose";
import Scholarship from "../models/Scholarship.model.js";

const providers = [
  "HDFC Bank", "Tata Trusts", "Google", "Reliance",
  "Infosys", "Wipro", "Amazon", "ONGC",
  "Aditya Birla", "Flipkart"
];

const categories = ["Merit", "Need", "Tech", "Research", "Abroad"];
const degrees = ["Undergraduate", "Postgraduate", "PhD"];

const descriptions = [
  "Supports financially weak but bright students",
  "Encourages innovation and research",
  "Merit-based scholarship for top performers",
  "Financial assistance for higher education",
  "Empowering future leaders"
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateScholarships = (count, adminId) => {
  return Array.from({ length: count }).map((_, i) => ({
    name: `${getRandom(providers)} Scholarship ${i + 1}`,
    provider: getRandom(providers),
    amount: Math.floor(Math.random() * 150000) + 50000,
    deadline: new Date(
      2026,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    ),
    category: getRandom(categories),
    gpaRequirement: +(Math.random() * 4 + 6).toFixed(1),
    degreeLevel: getRandom(degrees),
    description: getRandom(descriptions),
    eligibility: [
      "Indian citizen",
      "Minimum academic score required",
      "Valid college admission"
    ],
    adminId,
    officialUrl: i > 20 ? `https://example${i}.com` : undefined
  }));
};

export const seedScholarships = async (adminId) => {
  await Scholarship.deleteMany();

  const data = generateScholarships(50, adminId);

  await Scholarship.insertMany(data);

  console.log(`✅ Seeded ${data.length} scholarships`);
};
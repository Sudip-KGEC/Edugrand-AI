import Scholarship from "../../scholarship/models/Scholarship.model.js";
import User from "../../auth/models/User.model.js";

export const getScholarshipsContext = () =>
  Scholarship.find({ isActive: { $ne: false } })
    .select("name amount deadline category gpaRequirement degreeLevel")
    .limit(20)
    .lean();

export const getUserProfile = (userId) =>
  User.findById(userId)
    .select("cgpa currentDegree fieldOfStudy")
    .lean();
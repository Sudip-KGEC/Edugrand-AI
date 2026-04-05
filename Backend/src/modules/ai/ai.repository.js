import Scholarship from "../../database/models/Scholarship.model.js";

export const getScholarshipsContext = () => {
  return Scholarship.find({})
    .select("name amount deadline category gpaRequirement degreeLevel")
    .limit(10)
    .lean();
};
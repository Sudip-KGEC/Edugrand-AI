import mongoose from "mongoose";
import Scholarship from "../models/Scholarship.model.js";
import Application from "../models/Application.model.js";
import User from "../../auth/models/User.model.js";
import Notification from "../../notification/models/Notification.model.js";
import { mapDegreeToLevel } from "../utils/degreeMapper.js";

export const findScholarships = (filter = {}) =>
  Scholarship.find(filter).sort({ createdAt: -1 }).lean();

export const findScholarshipById = (id) =>
  Scholarship.findById(id);

export const createScholarship = (data) =>
  Scholarship.create(data);

export const updateScholarship = (id, data) => {
  delete data.adminId;
  delete data.totalApplications;

  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined)
  );

  return Scholarship.findByIdAndUpdate(
    id,
    { $set: cleanData },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
};

export const deleteScholarship = (id) =>
  Scholarship.findByIdAndDelete(id);

export const findScholarshipsByAdmin = (adminId) =>
  Scholarship.aggregate([
    { $match: { adminId: new mongoose.Types.ObjectId(adminId) } },
    {
      $lookup: {
        from: "applications",
        localField: "_id",
        foreignField: "scholarshipId",
        as: "applications",
      },
    },
    { $addFields: { applicantCount: { $size: "$applications" } } },
    { $sort: { createdAt: -1 } },
  ]);

export const findApplication = (studentId, scholarshipId) =>
  Application.findOne({ studentId, scholarshipId });

export const findApplicationById = (id) =>
  Application.findById(id);

export const createApplication = (data) =>
  Application.create(data);

export const updateApplicationStatus = (id, status) =>
  Application.findByIdAndUpdate(
    id,
    { status, reviewedAt: new Date() },
    { returnDocument: "after" }
  );

export const findApplicationsByStudent = (studentId) =>
  Application.find({ studentId })
    .populate("scholarshipId", "name provider amount deadline")
    .sort({ createdAt: -1 })
    .lean();

export const findApplicationsByAdmin = async (adminId) => {
  const ids = await Scholarship.find({ adminId }).distinct("_id");

  return Application.find({ scholarshipId: { $in: ids } })
    .populate("studentId", "name email cgpa")
    .populate("scholarshipId", "name amount")
    .sort({ createdAt: -1 })
    .lean();
};

export const deleteApplicationsByScholarship = (id) =>
  Application.deleteMany({ scholarshipId: id });

export const addAppliedScholarship = (studentId, scholarshipId) =>
  User.findByIdAndUpdate(
    studentId,
    { $addToSet: { appliedScholarships: scholarshipId } },
    { returnDocument: "after" }
  );

export const notifyMatchingStudents = async (scholarship) => {
  const students = await User.find({
    role: "student",
    verified: true,
  }).lean();

  const matched = students.filter((s) => {
    const cgpaOk = s.cgpa >= scholarship.gpaRequirement;
    const degreeOk =
      mapDegreeToLevel(s.currentDegree) === scholarship.degreeLevel ||
      mapDegreeToLevel(s.highestDegree) === scholarship.degreeLevel;
    return cgpaOk && degreeOk;
  });

  if (!matched.length) return [];

  return Notification.insertMany(
    matched.map((s) => ({
      recipientId: s._id,
      title: "New Scholarship Match",
      message: `${scholarship.name} matches your profile`,
      type: "MATCH",
    }))
  );
};
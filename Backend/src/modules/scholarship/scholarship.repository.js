import Scholarship from "../../database/models/Scholarship.model.js";
import Application from "../../database/models/Application.model.js";
import User from "../../database/models/User.model.js";
import Notification from "../../database/models/Notification.model.js";
import mongoose from 'mongoose'

export const findScholarships = (query) => {
  const filter = query.adminId ? { createdBy: query.adminId } : {};
  return Scholarship.find(filter).sort({ createdAt: -1 }).lean();
};

export const findScholarshipById = (id) => {
  return Scholarship.findById(id);
};

export const createScholarship = (data) => {
  return Scholarship.create(data);
};

export const findScholarshipsByAdmin = async (adminId) => {
  return await Scholarship.aggregate([
    {
      $match: {
        adminId: new mongoose.Types.ObjectId(adminId),
      },
    },
    {
      $lookup: {
        from: "applications",
        localField: "_id",
        foreignField: "scholarshipId",
        as: "applications",
      },
    },
    {
      $addFields: {
        applicantCount: { $size: "$applications" },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        provider: 1,
        amount: 1,
        deadline: 1,
        category: 1,
        degreeLevel: 1,
        applicantCount: 1,
        createdAt: 1,
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);
};

export const findApplication = (studentId, scholarshipId) => {
  return Application.findOne({ studentId, scholarshipId });
};

export const createApplication = (data) => {
  return Application.create({ ...data, status: "Applied" });
};

export const addAppliedScholarship = (studentId, scholarshipId) => {
  return User.findByIdAndUpdate(
    studentId,
    { $addToSet: { appliedScholarships: scholarshipId } },
    { new: true }
  ).lean();
};

export const findApplicationsByStudent = (studentId) => {
  return Application.find({ studentId })
    .populate("scholarshipId", "name provider amount")
    .sort({ createdAt: -1 })
    .lean();
};

export const findApplicationsByAdmin = async (adminId) => {
  const scholarships = await Scholarship.find({
     adminId,
  }).select("_id");

  const ids = scholarships.map((s) => s._id);

  return Application.find({
    scholarshipId: { $in: ids },
  })
    .populate("studentId", "name cgpa college")
    .populate("scholarshipId", "name")
    .sort({ createdAt: -1 })
    .lean();
};

export const updateApplicationStatus = (id, status) => {
  return Application.findByIdAndUpdate(id, { status }, { new: true });
};

export const deleteApplicationsByScholarship = (scholarshipId) => {
  return Application.deleteMany({ scholarshipId });
};

export const deleteScholarship = (id) => {
  return Scholarship.findByIdAndDelete(id);
};

export const notifyMatchingStudents = async (scholarship) => {
  const students = await User.find({
    role: "student",
    currentDegree: scholarship.degreeLevel,
  }).select("_id");

  if (!students.length) return [];

  const notifications = students.map((s) => ({
    recipientId: s._id,
    title: "New Match Found!",
    message: `Scholarship "${scholarship.name}" matches your profile`,
    type: "MATCH",
  }));

  return Notification.insertMany(notifications);
};
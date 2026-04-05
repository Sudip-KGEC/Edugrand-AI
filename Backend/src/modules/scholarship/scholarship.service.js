import * as repo from "./scholarship.repository.js";
import { ApiError } from "../../utils/ApiError.js";

export const getScholarships = (query) => {
  return repo.findScholarships(query);
};

export const apply = async (studentId, scholarshipId) => {
  const scholarship = await repo.findScholarshipById(scholarshipId);
  if (!scholarship) throw new ApiError(404, "Scholarship not found");

  const exists = await repo.findApplication(studentId, scholarshipId);
  if (exists) throw new ApiError(400, "Already applied");

  const application = await repo.createApplication({
    scholarshipId,
    studentId,
    adminId: scholarship.adminId,
  });

  const user = await repo.addAppliedScholarship(studentId, scholarshipId);

  return {
    application,
    appliedScholarships: user.appliedScholarships,
  };
};

export const getMyApplications = (userId) => {
  return repo.findApplicationsByStudent(userId);
};

export const create = async (adminId, payload) => {
  if (!adminId) throw new ApiError(400, "Admin ID required");

  const scholarship = await repo.createScholarship({
    ...payload,
     adminId: adminId
  });

  repo.notifyMatchingStudents(scholarship).catch(() => {});

  return scholarship;
};

export const getAdminScholarships = async (adminId) => {
  if (!adminId) throw new ApiError(400, "Admin ID required");

  const data = await repo.findScholarshipsByAdmin(adminId);
  return data.map(mapScholarship);
};

export const getAdminApplications = async (adminId) => {
  const data = await repo.findApplicationsByAdmin(adminId);
  return data.map(mapApplication);
};

export const updateStatus = async (id, status) => {
  const updated = await repo.updateApplicationStatus(id, status);
  if (!updated) throw new ApiError(404, "Application not found");
  return updated;
};

export const deleteScholarship = async (adminId, scholarshipId) => {
  const scholarship = await repo.findScholarshipById(scholarshipId);

  if (!scholarship) throw new ApiError(404, "Scholarship not found");

  if (scholarship.createdBy.toString() !== adminId.toString()) {
    throw new ApiError(403, "Not authorized");
  }

  await repo.deleteApplicationsByScholarship(scholarshipId);
  await repo.deleteScholarship(scholarshipId);
};

const mapScholarship = (s) => ({
  _id: s._id,
  name: s.name,
  provider: s.provider,
  amount: s.amount,
  deadline: s.deadline,
  category: s.category,
  degreeLevel: s.degreeLevel,
  applicantCount: s.applicantCount || 0,
  createdAt: s.createdAt,
});

const mapApplication = (a) => ({
  _id: a._id,

  studentId: {
    _id: a.studentId?._id,
    name: a.studentId?.name,
    cgpa: a.studentId?.cgpa,
    college: a.studentId?.college,
  },

  scholarshipId: {
    _id: a.scholarshipId?._id,
    name: a.scholarshipId?.name,
  },

  status: a.status,
  createdAt: a.createdAt,
});
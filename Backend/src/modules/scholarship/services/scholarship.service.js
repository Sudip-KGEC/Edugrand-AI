import * as repo from "../repositories/scholarship.repository.js";
import { AppError } from "../../../utils/AppError.js";

export const getScholarships = async (query) => {
  const filter = {};

  if (query.category) filter.category = query.category;
  if (query.degreeLevel) filter.degreeLevel = query.degreeLevel;
  if (query.minAmount) filter.amount = { $gte: Number(query.minAmount) };
  if (query.isActive !== undefined)
    filter.isActive = query.isActive === "true";

  return repo.findScholarships(filter);
};

export const apply = async (studentId, scholarshipId) => {
  const scholarship = await repo.findScholarshipById(scholarshipId);
  if (!scholarship) throw new AppError("Scholarship not found", 404);
  if (!scholarship.isActive)
    throw new AppError("Scholarship is no longer active", 400);
  if (scholarship.deadline < new Date())
    throw new AppError("Deadline passed", 400);

  const exists = await repo.findApplication(studentId, scholarshipId);
  if (exists) throw new AppError("Already applied", 409);

  const application = await repo.createApplication({
    scholarshipId,
    studentId,
    adminId: scholarship.adminId,
  });

  await repo.addAppliedScholarship(studentId, scholarshipId);

  return application;
};

export const getMyApplications = (studentId) => {
  return repo.findApplicationsByStudent(studentId);
};

export const createScholarship = async (adminId, payload) => {
  const scholarship = await repo.createScholarship({
    ...payload,
    adminId,
  });

  await repo.notifyMatchingStudents(scholarship);

  return scholarship;
};

export const getAdminScholarships = (adminId) => {
  return repo.findScholarshipsByAdmin(adminId);
};

export const getAdminApplications = (adminId) => {
  return repo.findApplicationsByAdmin(adminId);
};

export const updateApplicationStatus = async (
  applicationId,
  status,
  adminId
) => {
  const application = await repo.findApplicationById(applicationId);
  if (!application) throw new AppError("Application not found", 404);

  if (String(application.adminId) !== String(adminId)) {
    throw new AppError("Not authorised", 403);
  }

  return repo.updateApplicationStatus(applicationId, status);
};

export const editScholarship = async (id, data, adminId) => {
  const scholarship = await repo.findScholarshipById(id);
  if (!scholarship) throw new AppError("Not found", 404);

  if (String(scholarship.adminId) !== String(adminId)) {
    throw new AppError("Not authorised", 403);
  }

  delete data.adminId;
  delete data.totalApplications;

  return repo.updateScholarship(id, data);
};

export const deleteScholarship = async (id, adminId) => {
  const scholarship = await repo.findScholarshipById(id);
  if (!scholarship) throw new AppError("Not found", 404);

  if (String(scholarship.adminId) !== String(adminId)) {
    throw new AppError("Not authorised", 403);
  }

  await repo.deleteApplicationsByScholarship(id);
  await repo.deleteScholarship(id);
};
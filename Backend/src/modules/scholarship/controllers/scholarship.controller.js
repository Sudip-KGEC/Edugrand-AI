import * as service from "../services/scholarship.service.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

export const getScholarships = asyncHandler(async (req, res) => {
  const data = await service.getScholarships(req.query);
  res.status(200).json({ success: true, data });
});

export const applyToScholarship = asyncHandler(async (req, res) => {
  const data = await service.apply(req.user._id, req.body.scholarshipId);
  res.status(201).json({ success: true, data });
});

export const getMyApplications = asyncHandler(async (req, res) => {
  const data = await service.getMyApplications(req.user._id);
  res.status(200).json({ success: true, data });
});

export const addScholarship = asyncHandler(async (req, res) => {
  const data = await service.createScholarship(req.user._id, req.body);
  res.status(201).json({ success: true, data });
});

export const getAdminScholarships = asyncHandler(async (req, res) => {
  const data = await service.getAdminScholarships(req.user._id);
  res.status(200).json({ success: true, data });
});

export const getAdminApplications = asyncHandler(async (req, res) => {
  const data = await service.getAdminApplications(req.user._id);
  res.status(200).json({ success: true, data });
});

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const data = await service.updateApplicationStatus(
    req.params.id,
    req.body.status,
    req.user._id
  );
  res.status(200).json({ success: true, data });
});

export const editScholarship = asyncHandler(async (req, res) => {
  const data = await service.editScholarship(
    req.params.id,
    req.body,
    req.user._id
  );
  res.status(200).json({ success: true, data });
});

export const deleteScholarship = asyncHandler(async (req, res) => {
  await service.deleteScholarship(req.params.id, req.user._id);
  res.status(200).json({ success: true, message: "Scholarship deleted" });
});
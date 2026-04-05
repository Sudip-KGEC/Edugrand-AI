import * as service from "./scholarship.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getScholarships = asyncHandler(async (req, res) => {
  const data = await service.getScholarships(req.query);
  res.json({ success: true, data });
});

export const applyToScholarship = asyncHandler(async (req, res) => {
  const data = await service.apply(req.user.id, req.body.scholarshipId);
  res.json({ success: true, data });
});

export const getMyApplications = asyncHandler(async (req, res) => {
  const data = await service.getMyApplications(req.user.id);
  res.json({ success: true, data });
});

export const addScholarship = asyncHandler(async (req, res) => {
  const data = await service.create(req.user.id, req.body);
  res.status(201).json({ success: true, data });
});

export const getAdminScholarships = asyncHandler(async (req, res) => {
  const data = await service.getAdminScholarships(req.user.id);
  res.json({ success: true, data });
});

export const getAdminApplications = asyncHandler(async (req, res) => {
  const data = await service.getAdminApplications(req.user.id);
  res.json({ success: true, data });
});

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const data = await service.updateStatus(req.params.id, req.body.status);
  res.json({ success: true, data });
});

export const deleteScholarship = asyncHandler(async (req, res) => {
  await service.deleteScholarship(req.user.id, req.params.id);
  res.json({ success: true });
});
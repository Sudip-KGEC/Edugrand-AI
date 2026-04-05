import * as service from "./notification.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getNotifications = asyncHandler(async (req, res) => {
  const data = await service.getNotifications(req.user.id);
  res.json({ success: true, data });
});

export const markAsRead = asyncHandler(async (req, res) => {
  await service.markAsRead(req.user.id);
  res.json({ success: true });
});

export const deleteNotification = asyncHandler(async (req, res) => {
  await service.deleteNotification(req.params.id, req.user.id);
  res.json({ success: true });
});

export const clearAllNotifications = asyncHandler(async (req, res) => {
  const count = await service.clearAll(req.user.id);
  res.json({ success: true, count });
});
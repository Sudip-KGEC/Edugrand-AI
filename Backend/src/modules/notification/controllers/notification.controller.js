import * as service from "../services/notification.service.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { sendSuccess } from "../utils/responseHelper.js";

export const getNotifications = asyncHandler(async (req, res) => {
  const { page, limit, unreadOnly } = req.query;

  const data = await service.getNotifications(req.user._id, {
    page: Number(page) || 1,
    limit: Number(limit) || 20,
    unreadOnly: unreadOnly === "true",
  });

  sendSuccess(res, data);
});

export const markAsRead = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  const result = await service.markAsRead(req.user._id, ids);

  sendSuccess(res, result, "Notifications marked as read");
});

export const deleteNotification = asyncHandler(async (req, res) => {
  await service.deleteNotification(req.params.id, req.user._id);

  sendSuccess(res, null, "Notification deleted");
});

export const clearAllNotifications = asyncHandler(async (req, res) => {
  const count = await service.clearAll(req.user._id);

  sendSuccess(res, { deletedCount: count }, "All notifications cleared");
});
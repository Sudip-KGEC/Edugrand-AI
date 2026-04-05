import * as repo from "./notification.repository.js";
import { ApiError } from "../../utils/ApiError.js";

export const getNotifications = (userId) => {
  return repo.findByUser(userId);
};

export const markAsRead = (userId) => {
  return repo.markAllAsRead(userId);
};

export const deleteNotification = async (id, userId) => {
  const notification = await repo.findById(id);

  if (!notification) throw new ApiError(404, "Notification not found");

  if (notification.recipientId.toString() !== userId.toString()) {
    throw new ApiError(403, "Not authorized");
  }

  return repo.deleteById(id);
};

export const clearAll = (userId) => {
  return repo.deleteAll(userId);
};
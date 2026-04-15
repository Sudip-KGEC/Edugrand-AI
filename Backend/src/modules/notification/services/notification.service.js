import * as repo from "../repositories/notification.repository.js";
import { ApiError } from "../../../utils/apiError.js";

export const getNotifications = (userId, options) =>
  repo.findByUser(userId, options);

export const markAsRead = async (userId, ids = null) => {
  if (ids && ids.length > 0) {
    const notifications = await repo.findManyByIds(ids, userId);

    if (notifications.length !== ids.length) {
      throw new ApiError(403, "Not authorized");
    }

    return repo.markManyAsRead(ids, userId);
  }

  return repo.markAllAsRead(userId);
};

export const deleteNotification = async (id, userId) => {
  const deleted = await repo.deleteById(id, userId);

  if (!deleted) {
    throw new ApiError(404, "Notification not found or not authorized");
  }

  return deleted;
};

export const clearAll = (userId) =>
  repo.deleteAll(userId);

export const createNotification = (payload) =>
  repo.create(payload);
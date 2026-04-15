import Notification from "../models/Notification.model.js";

export const findByUser = async (
  userId,
  { page = 1, limit = 20, unreadOnly = false } = {}
) => {
  const filter = { recipientId: userId };
  if (unreadOnly) filter.read = false;

  const [notifications, unreadCount] = await Promise.all([
    Notification.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),

    Notification.countDocuments({
      recipientId: userId,
      read: false,
    }),
  ]);

  return {
    notifications,
    unreadCount,
    page,
    limit,
  };
};

export const markAllAsRead = (userId) =>
  Notification.updateMany(
    { recipientId: userId, read: false },
    { $set: { read: true } }
  );

export const markManyAsRead = (ids, userId) =>
  Notification.updateMany(
    { _id: { $in: ids }, recipientId: userId, read: false },
    { $set: { read: true } }
  );

export const findById = (id) =>
  Notification.findById(id);

export const findManyByIds = (ids, userId) =>
  Notification.find({
    _id: { $in: ids },
    recipientId: userId,
  }).lean();

export const deleteById = (id, userId) =>
  Notification.findOneAndDelete({
    _id: id,
    recipientId: userId,
  });

export const deleteAll = async (userId) => {
  const result = await Notification.deleteMany({ recipientId: userId });
  return result.deletedCount;
};

export const create = (payload) =>
  Notification.create(payload);
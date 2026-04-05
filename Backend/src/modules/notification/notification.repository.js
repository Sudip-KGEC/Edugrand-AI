import Notification from "../../database/models/Notification.model.js";

export const findByUser = (userId) => {
  return Notification.find({ recipientId: userId })
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();
};

export const markAllAsRead = (userId) => {
  return Notification.updateMany(
    { recipientId: userId, isRead: false },
    { $set: { isRead: true } }
  );
};

export const findById = (id) => {
  return Notification.findById(id);
};

export const deleteById = (id) => {
  return Notification.findByIdAndDelete(id);
};

export const deleteAll = async (userId) => {
  const result = await Notification.deleteMany({ recipientId: userId });
  return result.deletedCount;
};
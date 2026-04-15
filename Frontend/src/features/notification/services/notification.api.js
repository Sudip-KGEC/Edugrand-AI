import api from "@/app/api/axios";

export const getNotifications = async () => {
  const res = await api.get("/notifications");
  return res.data.notifications || [];
};

export const markAsRead = async () => {
  const res = await api.put("/notifications/mark-as-read");
  return res.data;
};

export const clearAllNotifications = async () => {
  const res = await api.delete("/notifications/clear-all");
  return res.data;
};

export const deleteNotification = async (id) => {
  const res = await api.delete(`/notifications/${id}`);
  return res.data;
};
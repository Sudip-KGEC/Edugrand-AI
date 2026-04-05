import api from "@/app/api/axios";

export const getNotifications = async () => {
  try {
    const res = await api.get("/notifications");

    return Array.isArray(res.data)
      ? res.data
      : res.data?.data || [];
  } catch {
    return [];
  }
};

export const markAsRead = () =>
  api.put("/notifications/mark-as-read").then(res => res.data);

export const clearAllNotifications = () =>
  api.delete("/notifications/clear-all").then(res => res.data);

export const deleteNotification = (id) =>
  api.delete(`/notifications/${id}`).then(res => res.data);
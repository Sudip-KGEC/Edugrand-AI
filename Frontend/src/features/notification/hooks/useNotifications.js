import { useState, useEffect, useCallback, useMemo } from "react";
import {
  getNotifications,
  markAsRead,
  clearAllNotifications,
  deleteNotification,
} from "../services/notification.api";

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchNotifications();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const markAllRead = async () => {
    const prev = [...notifications];
    try {
      setNotifications((p) => p.map((n) => ({ ...n, isRead: true })));
      await markAsRead();
    } catch {
      setNotifications(prev);
    }
  };

  const clearAll = async () => {
    const prev = [...notifications];
    try {
      setNotifications([]);
      await clearAllNotifications();
    } catch {
      setNotifications(prev);
    }
  };

  const removeOne = async (id) => {
    const prev = [...notifications];
    try {
      setNotifications((p) => p.filter((n) => n._id !== id));
      await deleteNotification(id);
    } catch {
      setNotifications(prev);
    }
  };

  const unreadCount = useMemo(
    () => notifications.reduce((acc, n) => (!n.isRead ? acc + 1 : acc), 0),
    [notifications]
  );

  return {
    notifications,
    loading,
    error,
    unreadCount,
    fetchNotifications,
    markAllRead,
    clearAll,
    removeOne,
  };
}
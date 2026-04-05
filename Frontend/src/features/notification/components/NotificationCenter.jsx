import { useState, useEffect } from "react";
import { Bell, Trash2, CheckCircle, BellOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useNotifications from "../hooks/useNotifications";
import "./notification.scss";

export default function NotificationCenter() {
  const {
    notifications,
    loading,
    unreadCount,
    markAllRead,
    clearAll,
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && unreadCount > 0) {
      markAllRead();
    }
  }, [isOpen]);

  return (
    <div className="notify">
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="notify__btn"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="notify__badge">{unreadCount}</span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="notify__overlay"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="notify__panel"
            >
              <div className="notify__header">
                <h3>Notifications</h3>

                {notifications.length > 0 && (
                  <div className="notify__actions">
                    <button onClick={markAllRead}>
                      <CheckCircle size={16} />
                    </button>

                    <button onClick={clearAll}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div className="notify__list">
                {loading && (
                  <div className="notify__loading">
                    Loading notifications...
                  </div>
                )}

                {!loading && notifications.length === 0 && (
                  <div className="notify__empty">
                    <BellOff />
                    <p>No notifications</p>
                  </div>
                )}

                {!loading &&
                  notifications.map((n) => (
                    <NotificationItem key={n._id} n={n} />
                  ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function NotificationItem({ n }) {
  return (
    <div className={`notify__item ${!n.isRead ? "unread" : ""}`}>
      <p className="title">{n.title}</p>
      <p className="message">{n.message}</p>
    </div>
  );
}
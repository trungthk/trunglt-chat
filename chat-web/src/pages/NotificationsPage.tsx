import React, { useEffect } from "react";
import {
  fetchNotifications,
  markAsRead,
} from "../features/notification/notificationAPI";

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = React.useState<any[]>([]);

  useEffect(() => {
    fetchNotifications().then(setNotifications);
  }, []);

  const handleMarkRead = async (id: string) => {
    await markAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Notifications</h2>
      <ul className="space-y-2">
        {notifications.map((n) => (
          <li
            key={n.id}
            className={`border p-2 rounded ${n.read ? "bg-gray-50" : "bg-white"}`}
          >
            <div className="font-medium">{n.title}</div>
            <div className="text-sm text-gray-500">{n.message}</div>
            {!n.read && (
              <button
                onClick={() => handleMarkRead(n.id)}
                className="text-xs text-blue-600 hover:underline mt-1"
              >
                Mark as read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;

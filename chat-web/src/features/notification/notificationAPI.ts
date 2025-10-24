import api from "../../api/axios";

export const fetchNotifications = async () => {
  const { data } = await api.get("/notifications");
  return data;
};

export const markAsRead = async (id: string) => {
  const { data } = await api.post(`/notifications/${id}/read`);
  return data;
};

export const getUnreadCount = async () => {
  const { data } = await api.get("/notifications/unread-count");
  return data;
};

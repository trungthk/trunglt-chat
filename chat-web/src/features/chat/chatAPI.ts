import api from "../../api/axios";
import type { MessagePayload } from "./messageTypes";

export const fetchMessages = async (chatId: string) => {
  const { data } = await api.get(`/chats/${chatId}/messages`);
  return data;
};

export const sendMessage = async (chatId: string, payload: MessagePayload) => {
  const { data } = await api.post(`/chats/${chatId}/messages`, payload);
  return data;
};

export const deleteMessage = async (messageId: string) => {
  await api.delete(`/messages/${messageId}`);
};

export const editMessage = async (
  messageId: string,
  payload: Partial<MessagePayload>
) => {
  const { data } = await api.put(`/messages/${messageId}`, payload);
  return data;
};

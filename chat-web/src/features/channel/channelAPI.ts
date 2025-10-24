import api from "../../api/axios";

export const fetchChannels = async () => {
  const { data } = await api.get("/channels");
  return data;
};

export const createChannel = async (payload: {
  name: string;
  source?: string;
}) => {
  const { data } = await api.post("/channels", payload);
  return data;
};

export const updateChannel = async (id: string, payload: any) => {
  const { data } = await api.put(`/channels/${id}`, payload);
  return data;
};

export const deleteChannel = async (id: string) => {
  await api.delete(`/channels/${id}`);
};

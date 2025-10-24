import api from "../../api/axios";

export const fetchGroups = async () => {
  const { data } = await api.get("/groups");
  return data;
};

export const createGroup = async (payload: {
  name: string;
  members: string[];
}) => {
  const { data } = await api.post("/groups", payload);
  return data;
};

export const updateGroup = async (id: string, payload: any) => {
  const { data } = await api.put(`/groups/${id}`, payload);
  return data;
};

export const deleteGroup = async (id: string) => {
  await api.delete(`/groups/${id}`);
};

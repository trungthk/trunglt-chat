import api from "../../api/axios";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SocialLoginData {
  provider: "google" | "facebook";
  token: string;
}

export const login = async (data: LoginCredentials) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const socialLogin = async (data: SocialLoginData) => {
  const response = await api.post("/auth/social", data);
  return response.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const getUserProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

// Local storage utilities for auth persistence

const AUTH_TOKEN_KEY = 'chat_auth_token';
const USER_DATA_KEY = 'chat_user_data';

export const storage = {
  // Token management
  setToken: (token: string) => {
    try {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to save token to localStorage:', error);
    }
  },

  getToken: (): string | null => {
    try {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get token from localStorage:', error);
      return null;
    }
  },

  removeToken: () => {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to remove token from localStorage:', error);
    }
  },

  // User data management
  setUserData: (userData: any) => {
    try {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to save user data to localStorage:', error);
    }
  },

  getUserData: (): any | null => {
    try {
      const userData = localStorage.getItem(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Failed to get user data from localStorage:', error);
      return null;
    }
  },

  removeUserData: () => {
    try {
      localStorage.removeItem(USER_DATA_KEY);
    } catch (error) {
      console.error('Failed to remove user data from localStorage:', error);
    }
  },

  // Clear all auth data
  clearAuthData: () => {
    storage.removeToken();
    storage.removeUserData();
  }
};
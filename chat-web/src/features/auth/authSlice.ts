import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { logout as logoutAPI } from "./authAPI";
import { storage } from "../../utils/storage";

interface AuthState {
  user: any | null;
  accessToken: string | null;
  loading: boolean;
  loggingOut: boolean;
}

// Load initial state from localStorage
const initialState: AuthState = {
  user: storage.getUserData(),
  accessToken: storage.getToken(),
  loading: false,
  loggingOut: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }) => {
    const res = await api.post("/auth/login", payload);
    return res.data; // expect {access_token, user}
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutAPI();
      return;
    } catch (error: any) {
      // Even if logout API fails, we should still clear local state
      console.error("Logout API failed:", error);
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      storage.clearAuthData();
    },
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.loggingOut = false;
      storage.clearAuthData();
    },
  },
  extraReducers(builder) {
    // Login cases
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.access_token;
      state.user = action.payload.user;
      
      // Persist to localStorage
      storage.setToken(action.payload.access_token);
      storage.setUserData(action.payload.user);
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
    });

    // Logout cases
    builder.addCase(logoutAsync.pending, (state) => {
      state.loggingOut = true;
    });
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
      state.loggingOut = false;
      
      // Clear localStorage
      storage.clearAuthData();
    });
    builder.addCase(logoutAsync.rejected, (state) => {
      // Clear auth state even if API call failed
      state.user = null;
      state.accessToken = null;
      state.loggingOut = false;
      
      // Clear localStorage
      storage.clearAuthData();
    });
  },
});

export const { logout, clearAuth } = slice.actions;
export default slice.reducer;

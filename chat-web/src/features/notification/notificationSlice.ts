import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNotifications, getUnreadCount } from "./notificationAPI";

interface NotificationState {
  list: any[];
  unreadCount: number;
  loading: boolean;
}

const initialState: NotificationState = {
  list: [],
  unreadCount: 0,
  loading: false,
};

export const loadNotifications = createAsyncThunk(
  "notification/fetchAll",
  async () => {
    return await fetchNotifications();
  }
);

export const loadUnreadCount = createAsyncThunk(
  "notification/unreadCount",
  async () => {
    return await getUnreadCount();
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(loadUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload.count;
      });
  },
});

export default notificationSlice.reducer;

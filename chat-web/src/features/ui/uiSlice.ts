import { createSlice } from "@reduxjs/toolkit";

interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  desktop: boolean;
  email: boolean;
  push: boolean;
}

interface UIState {
  sidebarOpen: boolean;
  selectedChannel: string | null;
  language: string;
  notifications: NotificationSettings;
}

const initialState: UIState = {
  sidebarOpen: true,
  selectedChannel: null, // null means "All" is selected
  language: localStorage.getItem('chat_language') || 'vi', // Default to Vietnamese
  notifications: {
    enabled: JSON.parse(localStorage.getItem('chat_notifications_enabled') || 'true'),
    sound: JSON.parse(localStorage.getItem('chat_notifications_sound') || 'true'),
    desktop: JSON.parse(localStorage.getItem('chat_notifications_desktop') || 'true'),
    email: JSON.parse(localStorage.getItem('chat_notifications_email') || 'false'),
    push: JSON.parse(localStorage.getItem('chat_notifications_push') || 'true'),
  }
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSelectedChannel(state, action) {
      state.selectedChannel = action.payload;
    },
    setLanguage(state, action) {
      state.language = action.payload;
      localStorage.setItem('chat_language', action.payload);
    },
    updateNotificationSettings(state, action) {
      state.notifications = { ...state.notifications, ...action.payload };
      // Save to localStorage
      Object.entries(action.payload).forEach(([key, value]) => {
        localStorage.setItem(`chat_notifications_${key}`, JSON.stringify(value));
      });
    },
    toggleNotifications(state) {
      state.notifications.enabled = !state.notifications.enabled;
      localStorage.setItem('chat_notifications_enabled', JSON.stringify(state.notifications.enabled));
    },
  },
});

export const { 
  toggleSidebar, 
  setSelectedChannel, 
  setLanguage, 
  updateNotificationSettings, 
  toggleNotifications 
} = uiSlice.actions;
export default uiSlice.reducer;

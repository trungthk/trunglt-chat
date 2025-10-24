import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import chatReducer from "../features/chat/chatSlice";
import messagesReducer from "../features/messages/messagesSlice";
import uiReducer from "../features/ui/uiSlice";
import channelReducer from "../features/channel/channelSlice";
import groupReducer from "../features/group/groupSlice";
import notificationReducer from "../features/notification/notificationSlice";
import { setTokenGetter } from "../api/axios";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    messages: messagesReducer,
    ui: uiReducer,
    channel: channelReducer,
    group: groupReducer,
    notification: notificationReducer,
  },
});

// Set up the token getter for axios interceptor
setTokenGetter(() => {
  const state = store.getState();
  return state.auth.accessToken;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

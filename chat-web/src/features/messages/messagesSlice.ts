import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    byConversation: {} as Record<string, any[]>,
    loading: false,
  },
  reducers: {
    addMessage(state, action) {
      const { conversationId, message } = action.payload;
      if (!state.byConversation[conversationId]) {
        state.byConversation[conversationId] = [];
      }
      state.byConversation[conversationId].push(message);
    },
    setMessages(state, action) {
      const { conversationId, messages } = action.payload;
      state.byConversation[conversationId] = messages;
    },
  },
});

// Selector to get filtered messages based on selected channel
export const selectFilteredMessages = createSelector(
  [(state: RootState) => state.messages.byConversation, 
   (state: RootState) => state.ui.selectedChannel],
  (messagesByConversation, selectedChannel) => {
    const allMessages = Object.values(messagesByConversation).flat();
    
    if (!selectedChannel) {
      // Return all messages if no channel is selected
      return allMessages;
    }
    
    // Filter messages by channel
    return allMessages.filter(message => message.channelId === selectedChannel);
  }
);

export const { addMessage, setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;

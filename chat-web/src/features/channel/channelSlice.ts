import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchChannels } from "./channelAPI";

interface Channel {
  id: string;
  name: string;
  source?: string;
  description?: string;
}

interface ChannelState {
  list: Channel[];
  loading: boolean;
}

const initialState: ChannelState = {
  list: [],
  loading: false,
};

export const loadChannels = createAsyncThunk("channel/fetchAll", async () => {
  return await fetchChannels();
});

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    // Add a reducer to set sample channels for demo
    setSampleChannels: (state) => {
      state.list = [
        { 
          id: "1", 
          name: "general", 
          source: "Slack", 
          description: "General discussion channel" 
        },
        { 
          id: "2", 
          name: "development", 
          source: "Discord", 
          description: "Development team discussions" 
        },
        { 
          id: "3", 
          name: "marketing", 
          source: "Teams", 
          description: "Marketing team channel" 
        },
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadChannels.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(loadChannels.rejected, (state) => {
        state.loading = false;
        // Set sample data if API fails
        state.list = [
          { 
            id: "1", 
            name: "general", 
            source: "Slack", 
            description: "General discussion channel" 
          },
          { 
            id: "2", 
            name: "development", 
            source: "Discord", 
            description: "Development team discussions" 
          },
          { 
            id: "3", 
            name: "marketing", 
            source: "Teams", 
            description: "Marketing team channel" 
          },
        ];
      });
  },
});

export const { setSampleChannels } = channelSlice.actions;
export default channelSlice.reducer;

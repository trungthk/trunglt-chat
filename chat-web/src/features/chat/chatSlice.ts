import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchConversations = createAsyncThunk(
  "conversations/fetch",
  async () => {
    const res = await api.get("/conversations");
    return res.data;
  }
);

const slice = createSlice({
  name: "conversations",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchConversations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchConversations.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchConversations.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default slice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGroups } from "./groupAPI";

interface GroupState {
  list: any[];
  loading: boolean;
}

const initialState: GroupState = {
  list: [],
  loading: false,
};

export const loadGroups = createAsyncThunk("group/fetchAll", async () => {
  return await fetchGroups();
});

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadGroups.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(loadGroups.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default groupSlice.reducer;

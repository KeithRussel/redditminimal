import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Load popular data from reddit api
export const loadSubReddits = createAsyncThunk(
  "subreddits/getSubreddits",
  async () => {
    const response = await fetch("https://www.reddit.com/subreddits.json");
    const json = await response.json();
    return json.data.children;
  }
);

export const subredditsSlice = createSlice({
  name: "subreddits",
  initialState: {
    subreddits: [],
    isLoadingSubreddits: false,
    error: false,
  },
  extraReducers: {
    [loadSubReddits.pending]: (state, action) => {
      state.isLoadingSubreddits = true;
      state.error = false;
    },
    [loadSubReddits.fulfilled]: (state, action) => {
      state.isLoadingSubreddits = false;
      state.error = false;
      state.subreddits = action.payload;
    },
    [loadSubReddits.rejected]: (state, action) => {
      state.isLoadingSubreddits = false;
      state.error = true;
      state.subreddits = [];
    },
  },
});

export const selectSubreddits = (state) => state.subreddits.subreddits;
export const isLoadingSubreddits = (state) =>
  state.subreddits.isLoadingSubreddits;

export default subredditsSlice.reducer;

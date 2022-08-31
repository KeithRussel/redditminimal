import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Load popular data from reddit api
export const loadPopular = createAsyncThunk("posts/getPopular", async () => {
  const response = await fetch("https://www.reddit.com/r/popular.json");
  const json = await response.json();
  return json.data.children;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoadingPosts: false,
    failedToLoadPosts: false,
  },
  extraReducers: {
    [loadPopular.pending]: (state, action) => {
      state.isLoadingPosts = true;
      state.failedToLoadPosts = false;
    },
    [loadPopular.fulfilled]: (state, action) => {
      state.isLoadingPosts = false;
      state.failedToLoadPosts = false;
      state.posts = action.payload;
    },
    [loadPopular.rejected]: (state, action) => {
      state.isLoadingPosts = false;
      state.failedToLoadPosts = true;
      state.posts = [];
    },
  },
});

export const selectPosts = (state) => state.posts.posts;
export const isLoadingPosts = (state) => state.posts.isLoadingPosts;

export default postsSlice.reducer;

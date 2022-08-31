import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Load popular data from reddit api
export const getPopular = createAsyncThunk("posts/getPopular", async () => {
  const response = await fetch("https://www.reddit.com/r/popular.json");
  const json = await response.json();
  console.log(json);
  return json;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: {},
    isLoadingPosts: false,
    failedToLoadPosts: false,
  },
  extraReducers: {
    [getPopular.pending]: (state, action) => {
      state.isLoadingPosts = true;
      state.failedToLoadPosts = false;
    },
    [getPopular.fulfilled]: (state, action) => {
      state.isLoadingPosts = false;
      state.failedToLoadPosts = false;
      state.posts = action.payload;
    },
    [getPopular.rejected]: (state, action) => {
      state.isLoadingPosts = false;
      state.failedToLoadPosts = true;
    },
  },
});

export const selectPosts = (state) => state.posts.posts;
export const isLoadingPosts = (state) => state.posts.isLoadingPosts;

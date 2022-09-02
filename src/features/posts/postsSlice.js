import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

// Load popular data from reddit api
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (subreddit) => {
    const response = await fetch(`https://www.reddit.com/${subreddit}.json`);
    const json = await response.json();
    return json.data.children;
  }
);

export const setSelectedSubreddit = createAsyncThunk(
  "posts/selectedSubReddit",
  async (subreddit) => {
    const response = await fetch(`https://www.reddit.com${subreddit}.json`);
    const json = await response.json();
    return json.data.children[1].data.subreddit_name_prefixed;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoadingPosts: false,
    failedToLoadPosts: false,
    selectedSubreddit: "/r/pics",
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.isLoadingPosts = true;
      state.failedToLoadPosts = false;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.isLoadingPosts = false;
      state.failedToLoadPosts = false;
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.isLoadingPosts = false;
      state.failedToLoadPosts = true;
      state.posts = [];
    },
    [setSelectedSubreddit.fulfilled]: (state, action) => {
      state.isLoadingPosts = false;
      state.failedToLoadPosts = false;
      state.selectedSubreddit = action.payload;
    },
  },
});

export const selectPosts = (state) => state.posts.posts;
export const isLoadingPosts = (state) => state.posts.isLoadingPosts;
export const selectedSubreddit = (state) => state.posts.selectedSubreddit;

export const selectFilteredPosts = createSelector([selectPosts], (posts) => {
  return posts;
});

export default postsSlice.reducer;

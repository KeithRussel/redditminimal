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
    return json.data.children.map((post) => post.data);
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

// export const setSearchTerm = createAsyncThunk(
//   "posts/searchTerm",
//   async(searchQuery) => {
//     const response = await fetch(`https://www.reddit.com/search.json?q=${searchQuery}`);
//     const json = await response.json();
//     return json.data.children;
//   }
// )

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoadingPosts: false,
    failedToLoadPosts: false,
    searchTerm: "",
    selectedSubreddit: "/r/pics",
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
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
      state.searchTerm = "";
    },
    // [setSearchTerm.fulfilled]: (state, action) => {
    //   state.searchTerm = action.payload;
    // }
  },
});

export const { setSearchTerm } = postsSlice.actions;

export const selectPosts = (state) => state.posts.posts;
export const isLoadingPosts = (state) => state.posts.isLoadingPosts;
export const selectedSubreddit = (state) => state.posts.selectedSubreddit;
export const selectSearchTerm = (state) => state.posts.searchTerm;

export const selectFilteredPosts = createSelector(
  [selectPosts, selectSearchTerm],
  (posts, searchTerm) => {
    if (searchTerm !== "") {
      return posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return posts;
  }
);

export default postsSlice.reducer;

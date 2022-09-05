import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

// Load data from reddit api
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (subreddit) => {
    const response = await fetch(`https://www.reddit.com/${subreddit}.json`);
    const json = await response.json();
    const posts = json.data.children.map((post) => post.data);

    const postsWithMetadata = posts.map((post) => ({
      ...post,
      showingComments: false,
      comments: [],
      loadingComments: false,
      errorComments: false,
    }));

    return postsWithMetadata;
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

export const getPostComments = createAsyncThunk(
  "posts/getComments",
  async (index, permalink) => {
    const response = await fetch(`https://www.reddit.com${permalink}.json`);
    const json = await response.json();

    return json[1].data.children.map((subreddit) => subreddit.data);
  }
);

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
    loadGetComments(state, action) {
      // If we're hiding comment, don't fetch the comments.
      state.posts[action.payload].showingComments =
        !state.posts[action.payload].showingComments;
      if (!state.posts[action.payload].showingComments) {
        return;
      }
      state.posts[action.payload].loadingComments = true;
      state.posts[action.payload].error = false;
    },
    getCommentsSuccess(state, action) {
      state.posts[action.payload.index].loadingComments = false;
      state.posts[action.payload.index].comments = action.payload.comments;
    },
    getCommentsFailed(state, action) {
      state.posts[action.payload].loadingComments = false;
      state.posts[action.payload].error = true;
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
    // [getPostComments.pending]: (state, action) => {
    //   // If we're hiding comment, don't fetch the comments.
    //   state.posts[action.payload].showingComments =
    //     !state.posts[action.payload].showingComments;
    //   if (!state.posts[action.payload].showingComments) {
    //     return;
    //   }
    //   state.posts[action.payload].loadingComments = true;
    //   state.posts[action.payload].error = false;
    // },
    // [getPostComments.fulfilled]: (state, action) => {
    //   state.posts[action.payload.index].loadingComments = false;
    //   state.posts[action.payload.index].comments = action.payload.comments;
    // },
    // [getPostComments.rejected]: (state, action) => {
    //   state.posts[action.payload].loadingComments = false;
    //   state.posts[action.payload].error = true;
    // },
  },
});

export const {
  setSearchTerm,
  loadGetComments,
  getCommentsSuccess,
  getCommentsFailed,
} = postsSlice.actions;

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

export const fetchComments = (index, permalink) => async (dispatch) => {
  try {
    dispatch(loadGetComments(index));
    const comments = await getPostComments(permalink);
    dispatch(getCommentsSuccess({ index, comments }));
  } catch (error) {
    dispatch(getCommentsFailed(index));
  }
};

export default postsSlice.reducer;

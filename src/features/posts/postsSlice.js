import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getPostComments, getSubredditPosts } from "../../api/api";

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
    loadPosts(state, action) {
      state.isLoadingPosts = true;
      state.failedToLoadPosts = false;
    },
    getPostsSuccess(state, action) {
      state.isLoadingPosts = false;
      state.posts = action.payload;
      state.failedToLoadPosts = false;
    },
    getPostsError(state, action) {
      state.isLoadingPosts = false;
      state.posts = [];
      state.failedToLoadPosts = true;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit(state, action) {
      state.selectedSubreddit = action.payload;
      state.searchTerm = "";
    },
    toggleShowingComments(state, action) {
      state.posts[action.payload].showingComments =
        !state.posts[action.payload].showingComments;
    },
    startGetComments(state, action) {
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
    removeComments(state, action) {
      state.posts[action.payload.index].comments = [];
    },
    getCommentsFailed(state, action) {
      state.posts[action.payload].loadingComments = false;
      state.posts[action.payload].error = true;
    },
  },
});

export const {
  loadPosts,
  getPostsSuccess,
  getPostsError,
  setSearchTerm,
  setSelectedSubreddit,
  toggleShowingComments,
  startGetComments,
  getCommentsSuccess,
  getCommentsFailed,
  removeComments,
} = postsSlice.actions;

export const selectPosts = (state) => state.posts.posts;
export const isLoadingPosts = (state) => state.posts.isLoadingPosts;
export const selectedSubreddit = (state) => state.posts.selectedSubreddit;
export const selectSearchTerm = (state) => state.posts.searchTerm;

export const fetchPosts = (subreddit) => async (dispatch) => {
  try {
    dispatch(loadPosts());

    const posts = await getSubredditPosts(subreddit);

    const postsWithMetaData = posts.map((post) => ({
      ...post,
      showingComments: false,
      comments: [],
      loadingComments: false,
      errorComments: false,
    }));

    dispatch(getPostsSuccess(postsWithMetaData));
  } catch (error) {
    dispatch(getPostsError());
  }
};

export const fetchComments = (index, permalink) => async (dispatch) => {
  try {
    dispatch(startGetComments(index));

    const comments = await getPostComments(permalink);
    dispatch(getCommentsSuccess({ index, comments }));
  } catch (error) {
    dispatch(getCommentsFailed());
  }
};

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

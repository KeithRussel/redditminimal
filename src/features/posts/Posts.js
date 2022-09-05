import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import {
  fetchPosts,
  isLoadingPosts,
  selectFilteredPosts,
  selectedSubreddit,
  fetchComments,
} from "./postsSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectFilteredPosts);
  const subRedditSelected = useSelector(selectedSubreddit);
  const postsAreLoading = useSelector(isLoadingPosts);

  useEffect(() => {
    // console.log(subRedditSelected);
    if (subRedditSelected !== "/r/pics") {
      dispatch(fetchPosts(subRedditSelected));
    } else {
      dispatch(fetchPosts(subRedditSelected));
    }
  }, [dispatch, subRedditSelected]);

  const onToggleComments = (index) => {
    const getComments = (permalink) => {
      dispatch(fetchComments(index, permalink));
    };

    return getComments;
  };

  if (postsAreLoading) return <div>Loading Posts</div>;

  return (
    <div id="posts">
      {posts.map((post, index) => {
        return (
          <Post
            key={index}
            post={post}
            onToggleComments={onToggleComments(index)}
          />
        );
      })}
    </div>
  );
};

export default Posts;

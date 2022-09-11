import React, { useEffect } from "react";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import {
  fetchPosts,
  isLoadingPosts,
  selectFilteredPosts,
  selectedSubreddit,
  fetchComments,
} from "./postsSlice";
import styles from "./Posts.module.css";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectFilteredPosts);
  const subRedditSelected = useSelector(selectedSubreddit);
  const postsAreLoading = useSelector(isLoadingPosts);

  useEffect(() => {
    // Check the subReddit then dispatch the fetchPosts action according to subReddit selected.
    if (subRedditSelected !== "/r/pics") {
      dispatch(fetchPosts(subRedditSelected));
    } else {
      dispatch(fetchPosts(subRedditSelected));
    }
  }, [dispatch, subRedditSelected]);

  // Toggle Icon Comment
  const onToggleComments = (index) => {
    const getComments = (permalink) => {
      dispatch(fetchComments(index, permalink));
    };

    // console.log(getComments);
    return getComments;
  };

  if (postsAreLoading)
    return (
      <div className={styles.loadscreen}>
        <ReactLoading
          type={"bubbles"}
          color={"#d03b06"}
          height={"20%"}
          width={"20%"}
        />
      </div>
    );

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

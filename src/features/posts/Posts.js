import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import { loadPopular, isLoadingPosts, selectPosts } from "./postsSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const postsAreLoading = useSelector(isLoadingPosts);

  useEffect(() => {
    dispatch(loadPopular());
    console.log(dispatch(loadPopular()));
  }, [dispatch]);

  if (postsAreLoading) return <div>Loading Posts</div>;

  return (
    <div id="posts">
      {posts.map((post, index) => {
        return <Post key={index} post={post} />;
      })}
    </div>
  );
};

export default Posts;

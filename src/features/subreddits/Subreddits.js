import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubredditsList from "./SubredditsList";
import {
  loadSubReddits,
  isLoadingSubreddits,
  selectSubreddits,
} from "../subreddits/subredditsSlice";
import styles from "../subreddits/Subreddits.module.css";

const Subreddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);
  const subredditsAreLoading = useSelector(isLoadingSubreddits);

  useEffect(() => {
    dispatch(loadSubReddits());
    console.log(dispatch(loadSubReddits()));
  }, [dispatch]);

  if (subredditsAreLoading) return <div>Loading Posts</div>;

  return (
    <ul id={styles.posts}>
      {subreddits.map((item, index) => {
        return <SubredditsList key={index} item={item} />;
      })}
    </ul>
  );
};

export default Subreddits;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubredditsList from "./SubredditsList";
import {
  loadSubReddits,
  selectSubreddits,
} from "../subreddits/subredditsSlice";
import { UnorderedList } from "./styleSubreddits";

const Subreddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);

  useEffect(() => {
    dispatch(loadSubReddits());
    // console.log(dispatch(loadSubReddits()));
  }, [dispatch]);

  return (
    <UnorderedList>
      {subreddits.map((item, index) => {
        return <SubredditsList key={index} item={item} />;
      })}
    </UnorderedList>
  );
};

export default Subreddits;

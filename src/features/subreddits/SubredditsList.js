import React from "react";
import { useDispatch } from "react-redux/es/exports";
import { setSelectedSubreddit } from "../posts/postsSlice";
import { Button, List } from "./styleSubreddits";

const SubredditsList = ({ item }) => {
  const dispatch = useDispatch();
  const { display_name, url } = item.data;

  return (
    <List>
      <Button type="button" onClick={() => dispatch(setSelectedSubreddit(url))}>
        {display_name}
      </Button>
    </List>
  );
};

export default SubredditsList;

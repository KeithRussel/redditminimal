import React, { useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import { setSelectedSubreddit } from "../posts/postsSlice";

const SubredditsList = ({ item }) => {
  const dispatch = useDispatch();
  const { display_name, url } = item.data;

  return (
    <li>
      <button type="button" onClick={() => dispatch(setSelectedSubreddit(url))}>
        {display_name}
      </button>
    </li>
  );
};

export default SubredditsList;

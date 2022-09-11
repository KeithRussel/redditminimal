import React, { useState, useEffect } from "react";
import styles from "./Search.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchTerm,
  selectedSubreddit,
  selectSearchTerm,
} from "../posts/postsSlice";

const Search = () => {
  const [search, setSearch] = useState("");
  const searchTerm = useSelector(selectSearchTerm);
  const subreddit = useSelector(selectedSubreddit);
  const dispatch = useDispatch();

  const onSearchTermChange = (e) => {
    setSearch(e.target.value);
  };

  const onSearchTermSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(search));
  };

  useEffect(() => {
    setSearch(searchTerm);
  }, [searchTerm]);

  return (
    <div id={styles.search}>
      <form className={styles.form} onSubmit={onSearchTermSubmit}>
        <input
          placeholder={`Search for ${subreddit}`}
          type="text"
          value={search}
          onChange={onSearchTermChange}
          aria-label="Search posts"
        />
      </form>
    </div>
  );
};

export default Search;

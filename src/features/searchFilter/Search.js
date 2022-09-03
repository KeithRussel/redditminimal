import React, { useState, useEffect } from "react";
import styles from "./Search.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "../posts/postsSlice";
import { HiOutlineSearch } from "react-icons/hi";

const Search = () => {
  const [search, setSearch] = useState("");
  const searchTerm = useSelector((state) => state.posts.searchTerm);
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
          placeholder="Search..."
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

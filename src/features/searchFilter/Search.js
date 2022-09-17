import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchTerm,
  selectedSubreddit,
  selectSearchTerm,
} from "../posts/postsSlice";
import { Form, Input } from "./styleSearch";

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
    <div>
      <Form onSubmit={onSearchTermSubmit}>
        <Input
          placeholder={`Search for ${subreddit}`}
          type="text"
          value={search}
          onChange={onSearchTermChange}
          aria-label="Search posts"
        />
      </Form>
    </div>
  );
};

export default Search;

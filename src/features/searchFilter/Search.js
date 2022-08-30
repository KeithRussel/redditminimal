import React from "react";
import styles from "./Search.module.css";

const Search = () => {
  return (
    <div id={styles.search}>
      <form className={styles.form}>
        <input placeholder="Search..." type="text" />
      </form>
    </div>
  );
};

export default Search;

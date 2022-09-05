import React from "react";
import Posts from "../../features/posts/Posts";
import Subreddits from "../../features/subreddits/Subreddits";
import styles from "./Content.module.css";

const Content = () => {
  return (
    <main>
      <div className={styles.sidebar}>
        <p>ADS here</p>
      </div>
      <Posts />
      <Subreddits />
    </main>
  );
};

export default Content;

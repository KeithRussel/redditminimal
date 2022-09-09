import React from "react";
import Posts from "../../features/posts/Posts";
import Subreddits from "../../features/subreddits/Subreddits";

const Content = () => {
  return (
    <main>
      <Posts />
      <Subreddits />
    </main>
  );
};

export default Content;

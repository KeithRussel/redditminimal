import React from "react";
import Posts from "../../features/posts/Posts";
import Subreddits from "../../features/subreddits/Subreddits";

const Content = () => {
  return (
    <main>
      <div className="sidebar">Lorem Ipsum</div>
      <Posts />
      <Subreddits />
    </main>
  );
};

export default Content;

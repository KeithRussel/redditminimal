import React from "react";
import styles from "../posts/Posts.module.css";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const isImage = (url) => {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};

const Post = ({ post }) => {
  const { subreddit, url, title, ups } = post.data;
  return (
    <div className={styles.post}>
      <div className={styles.col}>
        <FontAwesomeIcon icon={faArrowUp} size="3x" />
        <div className={styles.upvote}>{ups}</div>
        <FontAwesomeIcon icon={faArrowDown} size="3x" />
      </div>
      <div className={styles.col}>
        <h3>{title}</h3>
        {isImage(url) ? (
          <img className={styles.img} src={url} alt="sampleimage" />
        ) : (
          <img
            className={styles.img}
            src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
            alt="sampleimage"
          />
        )}
      </div>
    </div>
  );
};

export default Post;

import React from "react";
import styles from "../posts/Posts.module.css";
import {
  faArrowUp,
  faArrowDown,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageCheck from "../../helpers/ImageCheck";

const Post = ({ post }) => {
  const { url, title, ups, author } = post.data;
  return (
    <div className={styles.post}>
      <div className={styles.col}>
        <FontAwesomeIcon icon={faArrowUp} size="3x" />
        <div className={styles.upvote}>{ups}</div>
        <FontAwesomeIcon icon={faArrowDown} size="3x" />
      </div>
      <div className={styles.col}>
        <h3>{title}</h3>
        {ImageCheck(url) ? (
          <img className={styles.img} src={url} alt="sampleimage" />
        ) : (
          <img
            className={styles.img}
            src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
            alt="sampleimage"
          />
        )}
        <div className={styles.bottomPost}>
          <div className={styles.author}>Posted by: {author}</div>
          <div className={styles.comments}>
            <FontAwesomeIcon icon={faMessage} size="2x" />
            <span>234</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

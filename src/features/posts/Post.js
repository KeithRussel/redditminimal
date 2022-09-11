import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import styles from "../posts/Posts.module.css";
import {
  faArrowUp,
  faArrowDown,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageCheck from "../../helpers/ImageCheck";

const Post = ({ post, onToggleComments }) => {
  const [screenWidth, setScreenWidth] = useState(1920);
  // Render props data
  const {
    url,
    title,
    ups,
    author,
    permalink,
    comments,
    loadingComments,
    showingComments,
    errorComments,
    num_comments,
  } = post;

  useEffect(() => {
    let widthQuery = window.screen.width;
    return setScreenWidth(widthQuery);
  }, []);

  const displayComments = () => {
    if (loadingComments) {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ReactLoading
            type={"spin"}
            color={"#d03b06"}
            height={"5%"}
            width={"5%"}
          />
        </div>
      );
    }

    if (showingComments) {
      return (
        <div className={styles.commentsDiv}>
          {comments.map((comment) => {
            return (
              <div>
                <h4>{comment.author}</h4>
                <p>{comment.body}</p>
              </div>
            );
          })}
        </div>
      );
    }

    if (errorComments) {
      return <p>Failed to load comments please try to refresh the page.</p>;
    }

    return null;
  };

  return (
    <>
      <div className={styles.post}>
        <div className={styles.col}>
          {screenWidth <= 412 ? (
            <>
              <FontAwesomeIcon icon={faArrowUp} size="2x" />
              <div className={styles.upvote}>{ups}</div>
              <FontAwesomeIcon icon={faArrowDown} size="2x" />
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faArrowUp} size="3x" />
              <div className={styles.upvote}>{ups}</div>
              <FontAwesomeIcon icon={faArrowDown} size="3x" />
            </>
          )}
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
              <FontAwesomeIcon
                icon={faMessage}
                size="2x"
                onClick={() => onToggleComments(permalink)}
                color="#9bafcb"
              />
              <span>{num_comments} Comments</span>
            </div>
          </div>
        </div>
      </div>
      {displayComments()}
    </>
  );
};

export default Post;

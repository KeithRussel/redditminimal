import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import {
  SinglePost,
  Column,
  Upvote,
  Img,
  BottomPost,
  Author,
  Comments,
  CommentsDiv,
} from "./stylePosts";
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
        <CommentsDiv>
          {comments.map((comment) => {
            return (
              <div>
                <h4>{comment.author}</h4>
                <p>{comment.body}</p>
              </div>
            );
          })}
        </CommentsDiv>
      );
    }

    if (errorComments) {
      return <p>Failed to load comments please try to refresh the page.</p>;
    }

    return null;
  };

  return (
    <>
      <SinglePost>
        <Column>
          {screenWidth <= 412 ? (
            <>
              <FontAwesomeIcon icon={faArrowUp} size="2x" />
              <Upvote>{ups}</Upvote>
              <FontAwesomeIcon icon={faArrowDown} size="2x" />
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faArrowUp} size="3x" />
              <Upvote>{ups}</Upvote>
              <FontAwesomeIcon icon={faArrowDown} size="3x" />
            </>
          )}
        </Column>
        <Column>
          <h3>{title}</h3>
          {ImageCheck(url) ? (
            <Img src={url} alt="sampleimage" />
          ) : (
            <Img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
              alt="sampleimage"
            />
          )}
          <BottomPost>
            <Author>Posted by: {author}</Author>
            <Comments>
              <FontAwesomeIcon
                icon={faMessage}
                size="2x"
                onClick={() => onToggleComments(permalink)}
                color="#9bafcb"
              />
              <span>{num_comments} Comments</span>
            </Comments>
          </BottomPost>
        </Column>
      </SinglePost>
      {displayComments()}
    </>
  );
};

export default Post;

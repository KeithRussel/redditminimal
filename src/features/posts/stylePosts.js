import styled from "@emotion/styled";
import { theme } from "../../styles";

export const LoadScreen = styled.div`
  height: 100vh;
  justify-content: center;
  display: flex;
  align-items: center;
`;

export const SinglePost = styled.div`
  display: flex;
  margin: 1rem;
  background-color: ${() => theme.colors.white};
  padding: 1rem;
  border-radius: 15px;
  box-shadow: 2px 6px 6px #0908084a;

  @media only screen and (max-width: 991px) {
    padding: 1rem 0;
  }

  @media only screen and (min-width: 768px) and (max-width: 991px) {
    margin: 15px 0;
  }

  > * {
    width: 100%;
  }
`;

export const Column = styled.div`
  padding: 0 1rem;

  h3 {
    border-left: 2px solid;
    padding-left: 15px;

    @media only screen and (max-width: 600px) {
      font-size: 1rem;
    }
  }

  :nth-of-type(1) {
    flex: 1 4 auto;
    text-align: center;

    @media only screen and (max-width: 600px) {
      padding: 0;
    }
  }

  :nth-of-type(2) {
    flex: 1 1 auto;
  }
`;

export const Upvote = styled.div`
  padding: 1rem 0;
`;

export const Img = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  background-color: ${() => theme.colors.white};

  @media only screen and (max-width: 600px) {
    height: 250px;
  }
`;

export const BottomPost = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 0;
  border-top: 1px solid #8080807d;
`;
export const Author = styled.div`
  flex: 4 0 auto;
`;

export const Comments = styled.div`
  flex: 1 0 auto;
  display: flex;
  align-items: center;

  span {
    margin-left: 1rem;
    text-decoration: underline;
  }
`;

export const CommentsDiv = styled.div`
  margin: 0 15px;
  border-left: 3px solid hsl(15.7, 94.4%, 42%);
  padding: 15px;

  > div {
    background-color: #fff;
    padding: 15px;
    box-shadow: 1px 1px 2px black;
    margin-bottom: 15px;
  }
`;

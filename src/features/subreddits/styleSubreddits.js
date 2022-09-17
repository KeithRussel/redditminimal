import styled from "@emotion/styled/macro";
import { theme } from "../../styles";

export const UnorderedList = styled.ul`
  padding: 0;
  list-style: none;

  @media only screen and (max-width: 600px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row: 1/2;
    margin: 0 15px;
  }
`;

export const Button = styled.button`
  width: 100%;
  background-color: ${() => theme.colors.white};
  border: 0;
  outline: none;
  padding: 15px 0;
`;

export const List = styled.li`
  border-bottom: 1px solid #bbb;

  &:hover ${Button} {
    background-color: ${() => theme.colors.primary};
    color: #fff;
    transition: 0.5s;
  }
`;

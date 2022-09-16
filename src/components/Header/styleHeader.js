import styled from "@emotion/styled";
import { theme } from "../../styles";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  background-color: ${() => theme.colors.white};
`;

export const Image = styled.img`
  height: 60px;
`;

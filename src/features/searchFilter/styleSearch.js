import styled from "@emotion/styled";
import { theme } from "../../styles";

export const Form = styled.form`
  max-width: 60%;
  margin: auto;
  padding-top: 2rem;
  display: flex;

  @media only screen and (max-width: 600px) {
    max-width: 90%;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  font-size: ${() => theme.fontSize.paragraph};
  background-color: ${() => theme.colors.white};
  background-position: 10px 13px;
  background-repeat: no-repeat;
  padding-left: 42px;
`;

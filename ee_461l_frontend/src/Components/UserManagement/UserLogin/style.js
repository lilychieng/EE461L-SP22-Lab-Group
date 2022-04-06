import styled from "styled-components";
import { makeStyles } from "@material-ui/styles";

export const form = styled.div`
  gap: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  background-color: #f9dcc4;
`;

export const error = styled.div`
  font-size: 15px;
  color: red;
`;

export const useStyles = makeStyles({
  root: {
    background: "white",
  },
  input: {
    color: "black",
  },
});

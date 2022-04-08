import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import Header from "../../Header";
import { useUserUpdate } from "../../../hooks/UserContext";

const axios = require("axios").default;

function UserManagement({setAuthenticated}) {
  const setUser = useUserUpdate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    setError(false);
    if (!username || !password) {
      setError(true);
      setErrorMessage("Missing Fields");
      return;
    }
    axios
      .post("http://localhost:5000/user/login/", {
        data: {
          username: username,
          password: password,
        },
      })
      .then(function (response) {
        console.log(response);
        let responseMessage = response.data.message;
        if (responseMessage === "user not found") {
          setError(true);
          setErrorMessage("Username not found.");
        } else if (responseMessage === "user credentials do not match") {
          setError(true);
          setErrorMessage("Password is incorrect.");
        } else {
          setAuthenticated(true);
          setUser(response.data.user_id);
          setIsLoading(true);
          nav('/inventory');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const classes = S.useStyles();
  return (
    <div>
      <h1>EER Checkout</h1>
      <S.form>
        <div>Login</div>
        <TextField
        fullWidth
          className={classes.root}
          inputProps={{ className: classes.input }}
          id="outlined-required"
          label="Username"
          onChange={handleUsername}
        />
        <TextField
          className={classes.root}
          inputProps={{ className: classes.input }}
          id="outlined-password-input"
          label="Password"
          type="password"
          onChange={handlePassword}
        />
        
        <S.error>{error && <Alert severity="error">{errorMessage}</Alert>}</S.error>
        <Button size="small" style={{'backgroundColor':'#2EA64F', 'color':'black'}} onClick={handleSubmit}>
          {isLoading ? <CircularProgress /> : <>Submit</>}
        </Button>
        <Button size="small" style={{'backgroundColor':'#FFFFFF', 'color':'black'}} onClick={() => nav('/signup')}>
          Not a User?
        </Button>
      </S.form>
    </div>
  );
}

export default UserManagement;

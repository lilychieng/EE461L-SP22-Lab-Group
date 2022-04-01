import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import * as S from "./style";

const axios = require("axios").default;

function UserManagement() {
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
      setErrorMessage("Enter a Username and Password");
      return;
    }
    axios
      .post("http://localhost:5000/user/login", {
        data: {
          username: username,
          password: password,
        },
      })
      .then(function (response) {
        let responseMessage = response.data;
        if (responseMessage === "user not found") {
          setError(true);
          setErrorMessage("Username not found.");
        } else if (responseMessage === "user credentials do not match") {
          setError(true);
          setErrorMessage("Password is incorrect.");
        } else {
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
      {/* <h1>Login</h1>
      <h3>Username</h3>
      <input onChange={handleUsername} />
      <h3>Password</h3>
      <input onChange={handlePassword} />
      <button onClick={handleSubmit}>Submit</button>
      <div>{error && errorMessage}</div>
      <div>
        <Link to="/signup">Not a user?</Link>
      </div> */}

      <S.form>
        <div>Login</div>
        <TextField
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
        <S.error>{error && errorMessage}</S.error>
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

import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import * as S from "../UserLogin/style";
import { Alert } from "@mui/material";

const axios = require("axios").default;

function UserSignUp() {
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [error, setError] = useState(false);

  const [errorMessage, setErrorMessage] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
  };

  const validatePassword = () => {
    if (password !== password2) {
      setError(true);
      setErrorMessage("Passwords do not match");
      return false;
    }
    if (password !== "") {
      setError(false);
      return true;
    }
  };

  const handleSubmit = () => {
    setError(false);
    if (username === "") {
      setError(true);
      return setErrorMessage("Enter a username!");
    }
    if (validatePassword()) {
      axios
        .post("/user/signup/", {
          data: {
            username: username,
            password: password,
          },
        })
        .then(function (response) {
          // console.log(response);
          if(response.data === 'user already exists'){
            setError(true);
            return setErrorMessage('User already exists')
          } else if (response.data === 'failed to register user'){
            setError(true);
            return setErrorMessage('Failed to Register. Please try again!')
          }
          setSuccess(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const classes = S.useStyles();
  return (
    <div>
      <S.form>
        <div>Sign Up</div>
        {success && <Alert>Sucessfully Registered</Alert>}
        <TextField
          className={classes.root}
          inputProps={{ className: classes.input }}
          id="outlined-required"
          label="Email (@utexas)"
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
        <TextField
          className={classes.root}
          inputProps={{ className: classes.input }}
          id="outlined-confirm-password-input"
          label="Confirm Password"
          type="password"
          onChange={handlePassword2}
        />
        {error && <Alert severity="error">{errorMessage}</Alert>}
        <Button
          size="small"
          style={{ backgroundColor: "#2EA64F", color: "black" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          size="small"
          style={{ backgroundColor: "#FFFFFF", color: "black" }}
          onClick={() => nav("/login")}
        >
          Already a User?
        </Button>
      </S.form>
    </div>
  );
}

export default UserSignUp;

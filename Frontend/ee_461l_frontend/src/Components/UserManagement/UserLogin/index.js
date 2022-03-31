import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.25),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

const axios = require("axios").default;

function UserManagement() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    axios
      .get("http://localhost:5000/user/login", {
        params: {
          username: username,
          password: password,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      {/*
      <h1>Login</h1> 
      <h3>Username</h3>
      <input onChange={handleUsername} />
      <h3>Password</h3>
      <input onChange={handlePassword} />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <Link to="/signup">Not a user?</Link>
      </div> */}

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <h1>Login</h1>
            </Item>
          </Grid>
          {/* Username */}
          <Grid item xs={12}>
            <Item>
              <TextField
                id="outlined-required"
                label="Username"
                onChange={handleUsername}
              />
            </Item>
          </Grid>

          {/* Password */}
          <Grid item xs={12}>
            <Item>
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={handlePassword}
              />
            </Item>
          </Grid>

          {/* Continue */}
          <Grid item xs={12}>
            <Item>
              <Button
                justifyContent="center" //??? useless man
                variant="outlined"
                size="small"
                onClick={handleSubmit}
              >
                Continue
              </Button>
            </Item>
          </Grid>

          {/* Not a User */}
          <Grid item xs={12}>
            <Item>
              <Link to="/signup">
                <Button
                  justifyContent="center" //??? useless man
                  variant="outlined"
                  size="small"
                >
                  Not a User?
                </Button>
              </Link>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default UserManagement;

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

function Projects() {
  return (
    <div>
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
              <h1>Projects</h1>
            </Item>
          </Grid>
          {/* Username */}
          <Grid item xs={12}>
            <Item>
              <TextField
                required
                id="outlined-required"
                label="hehe"
                // onChange={handleUsername}
              />
            </Item>
          </Grid>

          {/* Password */}
          <Grid item xs={12}>
            <Item>
              <TextField
                id="outlined-password-input"
                label="placeholder oop"
                type="password"
                autoComplete="current-password"
                // onChange={handlePassword}
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
                // onClick={handleSubmit}
              >
                lolz
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
                  //   onClick={handleSubmit}
                >
                  Not a noob?
                </Button>
              </Link>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Projects;

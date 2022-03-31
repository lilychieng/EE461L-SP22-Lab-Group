import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Stack } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "../../css/styling.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.25),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

function NewProject() {
  const [alignment, setAlignment] = React.useState("new");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
    >
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <h1>Projects</h1>
            </Item>
          </Grid>

          <Grid item xs={12}>
            <Item>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                size="small"
              >
                <Link to="/project" id="remove-underline">
                  <ToggleButton value="my">My Projects</ToggleButton>
                </Link>
                <Link to="/newproject" id="remove-underline">
                  <ToggleButton value="new">New Project</ToggleButton>
                </Link>
                <Link to="/existingproject" id="remove-underline">
                  <ToggleButton value="existing">Existing Project</ToggleButton>
                </Link>
              </ToggleButtonGroup>
            </Item>
          </Grid>

          <Grid item xs={12}>
            <Item>
              <h3>Create New Project</h3>
            </Item>
          </Grid>

          {/* Project Name */}
          <Grid item xs={12}>
            <Item>
              <TextField
                required
                id="outlined-required"
                label="Project Name"
                // onChange={handleUsername}
              />
            </Item>
          </Grid>

          {/* Contributors */}
          <Grid item xs={12}>
            <Item>
              <TextField
                required
                id="outlined-required"
                label="Contributors"
                // onChange={handleUsername}
              />
            </Item>
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <Item>
              <TextField
                required
                id="outlined-required"
                label="Description"
                // onChange={handleUsername}
              />
            </Item>
          </Grid>

          {/* Demo TODO: setup embedded */}
          <Grid item xs={12}>
            <Item>
              <TextField
                required
                id="outlined-required"
                label="Demo"
                // onChange={handleUsername}
              />
            </Item>
          </Grid>

          {/* Create */}
          <Grid item xs={12}>
            <Item>
              <Button
                justifyContent="center" //??? useless man
                variant="outlined"
                size="small"
                // onClick={handleSubmit}
              >
                Create
              </Button>
            </Item>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}

export default NewProject;

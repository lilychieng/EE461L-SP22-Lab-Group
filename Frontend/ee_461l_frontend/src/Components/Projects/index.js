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
import MenuItem from "@mui/material/MenuItem";
import "../../css/styling.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.25),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

const groups = [
  {
    value: "USD",
    label: "Static 1",
  },
  {
    value: "EUR",
    label: "Static 2",
  },
  {
    value: "BTC",
    label: "Static 3",
  },
  {
    value: "JPY",
    label: "Static 4",
  },
];

function Projects() {
  const [alignment, setAlignment] = React.useState("my");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [group, setGroup] = React.useState("");
  const handleGroupChange = (event) => {
    setGroup(event.target.value);
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
              <h3>My Projects</h3>
            </Item>
          </Grid>

          {/* Groups Drop Down */}
          <Grid item xs={12}>
            <Item>
              <TextField
                id="outlined-select-proj"
                select
                label="Project"
                value={group}
                onChange={handleGroupChange}
                helperText="Please select a project."
              >
                {groups.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Item>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}

export default Projects;

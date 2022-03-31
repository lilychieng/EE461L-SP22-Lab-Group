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

function ExistingProject() {
  const [alignment, setAlignment] = React.useState("existing");

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
                <Link to="/project">
                  <ToggleButton value="new">My Projects</ToggleButton>
                </Link>
                <Link to="/newproject">
                  <ToggleButton value="new">New Project</ToggleButton>
                </Link>
                <Link to="/existingproject">
                  <ToggleButton value="existing">Existing Project</ToggleButton>
                </Link>
              </ToggleButtonGroup>
            </Item>
          </Grid>

          <Grid item xs={12}>
            <Item>
              <h3>Join Existing Project</h3>
            </Item>
          </Grid>

          {/* Groups Drop Down */}
          <Grid item xs={12}>
            <Item>
              <TextField
                id="outlined-select-group"
                select
                label="Group"
                value={group}
                onChange={handleGroupChange}
                helperText="Please select a group."
              >
                {groups.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
                Join
              </Button>
            </Item>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}

export default ExistingProject;

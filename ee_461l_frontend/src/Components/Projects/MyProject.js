import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.25),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

function MyProject() {
  const [group, setGroup] = useState("");
  const handleGroupChange = (event) => {
    setGroup(event.target.value);
  };
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
  return (
    <div>
      <Item>
        <h3>My Projects</h3>
      </Item>
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
    </div>
  );
}

export default MyProject;

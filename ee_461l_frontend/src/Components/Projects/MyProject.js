import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useUser } from "../../hooks/UserContext";
import CircularProgress from "@mui/material/CircularProgress";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.25),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

const axios = require("axios").default;

function MyProject({ setContent }) {
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();
  const [projects, setProjects] = useState(null);
  const [group, setGroup] = useState("");
  const handleGroupChange = (event) => {
    setGroup(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/projects/user/?user_id=" + user)
      .then(function (response) {
        // console.log(response);
        const projects = [];
        response.data.forEach(e => {
          if(e.Contributors.includes(user)){
            projects.push(e.ID);
          }
        });
        setProjects(projects);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Item>
        <h3>My Projects</h3>
      </Item>
      <Item>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {projects.length > 0 ? (
              <TextField
                id="outlined-select-proj"
                select
                label="Project"
                value={group}
                onChange={handleGroupChange}
                helperText="Please select a project."
              >
                {projects.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <>
                <Typography>You are not part of any projects!</Typography>
                <Button onClick={() => setContent("existing")}>Join</Button>
                or
                <Button onClick={() => setContent("new")}>Create</Button>
              </>
            )}
          </>
        )}
      </Item>
    </div>
  );
}

export default MyProject;

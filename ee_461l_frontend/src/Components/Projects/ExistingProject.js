import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import "../../css/styling.css";
import { useUser } from "../../hooks/UserContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.25),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

const axios = require("axios").default;

function ExistingProject() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const user = useUser();
  const [projectData, setProjectData] = useState([{}]);
  const [projects, setProjects] = useState("");
  const handleProjectChange = (e) => {
    setError(false);
    setSuccess(false);
    setProjects(e.target.value);
  };

  useEffect(() => {
    axios
      .get("/projects/all/")
      // .get("http://localhost:5000/projects/all/")
      .then(function (response) {
        let data = [];
        response.data.forEach((e) => {
          let projectDic = {
            id: e._id.$oid,
            name: e.Name,
            projectID: e.ID,
          };

          data.push(projectDic);
        });
        setIsLoading(false);
        setProjectData(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleSubmit = () => {
    axios
      .post("/projects/join/?user_id=" + user, {
      // .post("http://localhost:5000/projects/join/?user_id=" + user, {
        data: {
          projectID: projects,
        },
      })
      .then(function (response) {
        if(response.data === "Already a member"){
          setError(true);
          setErrorMessage("Already apart of Project " + projects);
        } else if (response.data === "Sucessfully joined the group"){
          setSuccess(true);
        }
        //(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(projects);
  };

  return (
    <div>
      <Item>
        <h3>Join Existing Project</h3>
      </Item>
      {error && <Alert severity="error">{errorMessage}</Alert>}
      {success && (
        <Alert>Project {projects} sucessfully joined!</Alert>
      )}
      <Item>
        {!isLoading ? (
          <TextField
            id="outlined-select-group"
            select
            label="Group"
            value={projects}
            onChange={handleProjectChange}
            helperText="Please select a project."
          >
            {projectData.map((option) => (
              <MenuItem key={option.id} value={option.projectID}>
                {option.name} ({option.projectID})
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <CircularProgress />
        )}
      </Item>
      <Item>
        <Button variant="outlined" size="small" onClick={handleSubmit}>
          Join
        </Button>
      </Item>
    </div>
  );
}

export default ExistingProject;

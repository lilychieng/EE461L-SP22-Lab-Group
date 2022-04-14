import React, { useRef, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "../../css/styling.css";
import { Alert } from "@mui/material";

const axios = require("axios").default;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.25),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

function NewProject() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const projectName = useRef("");
  const projectID = useRef(0);
  const description = useRef("");
  const demo = useRef("");

  const handleSubmit = () => {
    setError(false);
    if (!projectName.current || !projectID.current || !description.current) {
      setErrorMessage("All Fields Must be Filled Out!");
      return setError(true);
    }
    if (
      parseInt(projectID.current).toString().length != 4 ||
      !Number.isInteger(parseInt(projectID.current))
    ) {
      setErrorMessage("Project ID must be 4 digits");
      return setError(true);
    }
    setIsLoading(true);
    axios
      .post("http://localhost:5000/projects/create/", {
        data: {
          name: projectName.current,
          projectID: parseInt(projectID.current),
          description: description.current,
          demo: demo.current,
        },
      })
      .then(function (response) {
        //console.log(response);
        if (response.data === "Project sucessfully added!") {
          setIsLoading(false);
          setSucess(true);
        } else if (response.data === "Project ID is taken"){
          setIsLoading(false);
          setError(true);
          setErrorMessage('Project ID is taken');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Item>
        <h3>Create New Project</h3>
      </Item>
      {error && <Alert severity="error">{errorMessage}</Alert>}
      {sucess && (
        <Alert>Project {projectID.current} has be sucessfully created!</Alert>
      )}
      <Item>
        <TextField
          id="outlined-required"
          label="Project Name"
          onChange={(e) => {
            projectName.current = e.target.value;
          }}
        />
      </Item>

      <Item>
        <TextField
          id="outlined-required"
          label="Project Id (4-digits)"
          onChange={(e) => {
            projectID.current = e.target.value;
          }}
        />
      </Item>

      <Item>
        <TextField
          id="outlined-required"
          label="Description"
          onChange={(e) => {
            description.current = e.target.value;
          }}
        />
      </Item>

      <Item>
        <TextField
          id="outlined-required"
          label="Demo"
          onChange={(e) => {
            demo.current = e.target.value;
          }}
        />
      </Item>

      <Item>
        <Button
          variant="outlined"
          size="small"
          style={{ marginBottom: "60px" }}
          onClick={handleSubmit}
        >
          {!isLoading ? "Create" : <CircularProgress />}
        </Button>
      </Item>
    </div>
  );
}

export default NewProject;

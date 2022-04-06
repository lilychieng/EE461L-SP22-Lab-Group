import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import "../../css/styling.css";
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

const axios = require("axios").default;

function ExistingProject() {
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();
  const [projectData, setProjectData] = useState([{}]);
  const [projects, setProjects] = useState("");
  const handleProjectChange = (e) => {
    setProjects(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/projects/")
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
    // API request to the backend
    // params user and project id
    console.log(projects);
  };

  return (
    <div>
      <Item>
        <h3>Join Existing Project</h3>
      </Item>
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

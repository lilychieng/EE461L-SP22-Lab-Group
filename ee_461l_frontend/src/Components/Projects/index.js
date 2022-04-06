import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "../../css/styling.css";
import MyProject from "./MyProject";
import NewProject from "./NewProject";
import ExistingProject from "./ExistingProject";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.25),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

function Projects() {
  const [content, setContent] = useState("my");
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <Item>
        <h1>Projects</h1>
      </Item>

      <ToggleButtonGroup
        color="primary"
        value={content}
        exclusive
        onChange={handleChange}
        size="small"
      >
        <ToggleButton value="my">My Projects</ToggleButton>
        <ToggleButton value="new">New Project</ToggleButton>
        <ToggleButton value="existing">Existing Project</ToggleButton>
      </ToggleButtonGroup>

      {content === "my" && <MyProject />}
      {content === "new" && <NewProject />}
      {content === "existing" && <ExistingProject />}
    </div>
  );
}

export default Projects;

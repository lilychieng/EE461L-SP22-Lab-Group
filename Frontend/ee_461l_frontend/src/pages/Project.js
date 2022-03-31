import React from "react";
import ProjectPage from "../Components/Projects";
import "../css/register.css";

const Projects = ({ title }) => {
  return (
    <div className="Projects">
      <h1>{title}</h1>
      <ProjectPage />
    </div>
  );
};

export default Projects;

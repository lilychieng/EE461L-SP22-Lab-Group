import React from "react";
import ProjectPage from "../Components/Projects";
import "../css/register.css";

const Projects = ({ title }) => {
  return (
    <main className="Projects">
      <h1>{title}</h1>
      <div>
        <ProjectPage />
      </div>
    </main>
  );
};

export default Projects;

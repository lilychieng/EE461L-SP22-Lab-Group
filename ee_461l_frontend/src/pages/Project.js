import React from "react";
import Nav from "../Components/Nav";
import ProjectPage from "../Components/Projects";
import "../css/register.css";

const Projects = ({ title }) => {
  return (
    <>
      <Nav />
      <div className="Projects">
        <h1>{title}</h1>
        <ProjectPage />
      </div>
    </>
  );
};

export default Projects;

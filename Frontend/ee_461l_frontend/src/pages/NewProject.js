import React from "react";
import NewProj from "../Components/Projects/NewProject";
import "../css/register.css";

const NewProject = ({ title }) => {
  return (
    <div className="NewProject">
      <h1>{title}</h1>
      <NewProj />
    </div>
  );
};

export default NewProject;

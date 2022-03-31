import React from "react";
import NewProj from "../Components/Projects/NewProject";
import "../css/register.css";

const NewProject = ({ title }) => {
  return (
    <main className="NewProject">
      <h1>{title}</h1>
      <div>
        <NewProj />
      </div>
    </main>
  );
};

export default NewProject;

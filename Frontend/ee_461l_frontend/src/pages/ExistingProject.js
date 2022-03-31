import React from "react";
import ExistingProj from "../Components/Projects/ExistingProject";
import "../css/register.css";

const ExistingProject = ({ title }) => {
  return (
    <main className="ExistingProject">
      <h1>{title}</h1>
      <div>
        <ExistingProj />
      </div>
    </main>
  );
};

export default ExistingProject;

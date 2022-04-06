import React from 'react';
import { Link } from "react-router-dom";

const Missing = ({ title }) => {
  return (
    <main className="Missing">
      <h1>{title}</h1>
      <p><Link to="/login">Return To Login Page</Link></p>
    </main>
  )
}

export default Missing;
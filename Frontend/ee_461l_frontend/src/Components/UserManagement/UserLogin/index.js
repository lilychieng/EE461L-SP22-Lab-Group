import React, { useState } from "react";
import { Link } from "react-router-dom";

const axios = require("axios").default;

function UserManagement() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    axios
      .get("http://localhost:5000/user/login", {
        params: {
          username: username,
          password: password,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <h3>Username</h3>
      <input onChange={handleUsername} />
      <h3>Password</h3>
      <input onChange={handlePassword} />
      <button onClick={handleSubmit}>Submit</button>
      <div><Link to="/signup">Not a user?</Link></div>
    </div>
  );
}

export default UserManagement;

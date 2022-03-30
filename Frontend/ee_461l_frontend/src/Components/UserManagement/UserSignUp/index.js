import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserSignUp() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [error, setError] = useState(false);

  const axios = require("axios").default;

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
  };

  const validatePassword = () => {
    if (password !== password2) {
      setError(true);
      return false;
    }
    if (password !== "") {
      setError(false);
      return true;
    }
  };

  const handleSubmit = () => {
    if (validatePassword()) {
      axios
        .get("https://localhost:5000/user/register", {
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
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <h3>Email (@utexas)</h3>
      <input onChange={handleUsername} />
      <h3>Password</h3>
      <input onChange={handlePassword} />
      <h3>Confirm Password</h3>
      <input onChange={handlePassword2} />
      <button onClick={handleSubmit}>Submit</button>
      {error && <div>Passwords do not match!</div>}
      <div>
        <Link to="/login">Already a user?</Link>
      </div>
    </div>
  );
}

export default UserSignUp;

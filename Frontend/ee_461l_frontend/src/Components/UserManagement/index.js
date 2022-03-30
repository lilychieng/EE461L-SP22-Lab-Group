import React, { useState } from 'react'


const axios = require('axios').default;

function UserManagement() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = () => {
    axios.get('/localhost:5000/user/login', {
      params: {
        username: username,
        password: password
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  return (
    <div>
      <h2>Username</h2>
      <input onChange={handleUsername}/>
      <h2>Password</h2>
      <input onChange={handlePassword}/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default UserManagement

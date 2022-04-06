import React from "react";
import Nav from "../Components/Nav";
import { useUser } from "../hooks/UserContext";

const Account = ({ title }) => {
  const user = useUser()
  return (
    <>
    <Nav/>
    <main className="Account">
      <h1>{user}</h1>
      <h1>{title}</h1>
      <p>
        This is the account me page. Coming soon! Here we will display the
        user's projects, checkout history, and ticket history
      </p>
    </main>
    </>
  );
};

export default Account;

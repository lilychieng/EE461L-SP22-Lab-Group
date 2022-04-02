import { Button } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const nav = useNavigate();
  return (
    <nav className="Nav">
      <ul>
        <li>
          <Button onClick={() => nav("/account")}>Account</Button>
        </li>
        <li>
          <Button onClick={() => nav("/inventory")}>Inventory</Button>
        </li>
        <li>
          <Button onClick={() => nav("/project")}>Projects</Button>
        </li>
        <li>
          <Button onClick={() => nav("/support")}>Support</Button>
        </li>
        <li>
          <Link to="/login">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

import { Button } from "@mui/material";
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Nav = () => {
  const nav = useNavigate();
  const currRoute = useLocation();

  return (
    <nav className="Nav">
      <h1 style={{ "padding-left": "20px" }}>EER Checkout</h1>
      <ul>
        <li>
          <Button
            onClick={() =>
              currRoute?.pathname !== "/inventory" && nav("/inventory")
            }
          >
            Dashboard
          </Button>
        </li>
        <li>
          <Button
            onClick={() =>
              currRoute?.pathname !== "/account" && nav("/account")
            }
          >
            Account
          </Button>
        </li>

        <li>
          <Button
            onClick={() =>
              currRoute?.pathname !== "/project" && nav("/project")
            }
          >
            Projects
          </Button>
        </li>
        <li>
          <Button
            onClick={() =>
              currRoute?.pathname !== "/support" && nav("/support")
            }
          >
            Support
          </Button>
        </li>
        <li>
          <Button onClick={() => nav("/login")}>Logout</Button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="Nav">
      <ul>
        <li>
          <Link to="account">Account</Link>
        </li>
        <li>
          <Link to="inventory">Inventory</Link>
        </li>
        <li>
          <Link to="project">Projects</Link>
        </li>
        <li>
          <Link to="support">Support</Link>
        </li>
        <li>
          <Link to="/login">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

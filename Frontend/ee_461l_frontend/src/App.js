import Footer from "./Components/Footer";
import Inventory from "./pages/Inventory";
import Account from "./pages/Account";
import Missing from "./pages/Missing";
import Project from "./pages/Project";
import ExistingProject from "./pages/ExistingProject";
import NewProject from "./pages/NewProject";

import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import UserSignUp from "./Components/UserManagement/UserSignUp";
import SupportTicket from "./Components/SupportTicket";
import UserLogin from "./Components/UserManagement/UserLogin";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={<UserLogin/>}
        />
        <Route path="/account" element={<Account title="Account" />}></Route>
        <Route
          path="/inventory"
          element={<Inventory title="Inventory" />}
        ></Route>
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/support" element={<SupportTicket />} />
        <Route path="/project" element={<Project />} />
        <Route path="/existingproject" element={<ExistingProject />} />
        <Route path="newproject" element={<NewProject />} />

        <Route path="*" element={<Missing title="Page Not Found" />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

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
import RequireAuthentication from "./RequireAuthentication";
import { UserProvider } from "./hooks/UserContext";
import Weather from "./pages/Weather";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <div className="App">
      <UserProvider>
      <Routes>
        <Route path="/" element={<UserLogin setAuthenticated={setAuthenticated}/>} />
        <Route path="/login" element={<UserLogin setAuthenticated={setAuthenticated}/>} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route
          path="/account"
          element={
            <RequireAuthentication isAuthenticated={isAuthenticated}>
              <Account title="Account" />
            </RequireAuthentication>
          }
        />
        <Route
          path="/inventory"
          element={
            <RequireAuthentication isAuthenticated={isAuthenticated}>
              <Inventory title="Inventory" />
            </RequireAuthentication>
          }
        />
        
        <Route
          path="/support"
          element={
            <RequireAuthentication isAuthenticated={isAuthenticated}>
              <SupportTicket />
            </RequireAuthentication>
          }
        />
        <Route
          path="/project"
          element={
            <RequireAuthentication isAuthenticated={isAuthenticated}>
              <Project />
            </RequireAuthentication>
          }
        />
        <Route
          path="/weather"
          element={
            <RequireAuthentication isAuthenticated={isAuthenticated}>
              <Weather />
            </RequireAuthentication>
          }
        />
        {/* <Route
          path="/existingproject"
          element={
            <RequireAuthentication isAuthenticated={isAuthenticated}>
              <ExistingProject />
            </RequireAuthentication>
          }
        />
        <Route
          path="newproject"
          element={
            <RequireAuthentication isAuthenticated={isAuthenticated}>
              <NewProject />
            </RequireAuthentication>
          }
        /> */}
        <Route path="*" element={<Missing title="Page Not Found" />}></Route>
      </Routes>
      </UserProvider>
      <Footer />
    </div>
  );
}

export default App;

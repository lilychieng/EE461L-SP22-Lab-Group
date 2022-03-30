import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";

import Inventory from "./pages/Inventory";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Missing from "./pages/Missing";

import React from "react";
import { Routes, Route } from "react-router-dom";
import UserSignUp from "./Components/UserManagement/UserSignUp";

function App() {
  return (
    <div className="App">
      <Header title="Lily Called Me A Noob" />
      <Nav />
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Register />}></Route>
        <Route path="account" element={<Account title="Account" />}></Route>
        <Route
          path="inventory"
          element={<Inventory title="Inventory" />}
        ></Route>
        <Route path="signup" element={<UserSignUp />} />
        <Route path="*" element={<Missing title="Page Not Found" />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

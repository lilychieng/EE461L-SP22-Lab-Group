import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";

import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Support from "./pages/Support"
import Missing from "./pages/Missing";

import React from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header title="Lily Called Me A Noob"/>
      <Nav />
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="account" element={<Account title="Account"/>}></Route>
        <Route path="inventory" element={<Inventory title="Inventory"/>}></Route>
        <Route path="support" element={<Support title="Support"/>}></Route>
        <Route path="*" element={<Missing title="Page Not Found"/>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
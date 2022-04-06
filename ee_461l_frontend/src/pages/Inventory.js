import React, { useState } from "react";
import Inventory from "../Components/Inventory";
import Header from "../Components/Header";
import Nav from "../Components/Nav";

const InventoryPage = () => {
  return (
    <>
      <Nav />
      <div className="Inventory">
          <Inventory />
      </div>
    </>
  );
};

export default InventoryPage;

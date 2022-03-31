import React from "react";
import InventoryPage from "../Components/Inventory";

const Inventory = ({ title }) => {
  return (
    <div className="Inventory">
      <h1>{title}</h1>
      <div>
        <InventoryPage />
      </div>
      <p>This is the inventory me page. Coming soon!</p>
    </div>
  );
};

export default Inventory;

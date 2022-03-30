import React from 'react';
import InventoryPage from '../Components/Inventory';

const Inventory = ({ title }) => {
  return (
    <main className="Inventory">
      <h1>{title}</h1>
      <main>
            <div><InventoryPage /></div>
      </main>
      <p>This is the inventory me page. Coming soon!</p>
    </main>
  )
}

export default Inventory;
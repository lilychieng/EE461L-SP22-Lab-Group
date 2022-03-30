import React from "react";
import SupportPage from "../Components/SupportTicket";

const Support = ({ title }) => {
  return (
    <main className="Support">
      <h1>{title}</h1>
      <main>
        <div>
          <SupportPage />
        </div>
      </main>
      <p>This is the support me page. Coming soon!</p>
    </main>
  );
};

export default Support;

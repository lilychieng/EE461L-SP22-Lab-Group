import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import App from './App';
import UserManagement from "./Components/UserManagement";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<UserManagement />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

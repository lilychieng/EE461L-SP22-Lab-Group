import React, { Children } from 'react'
import { useLocation, Navigate } from "react-router-dom";

function RequireAuthentication({isAuthenticated, children}) {
  const location = useLocation();

  if(!isAuthenticated) {
  return (
    <Navigate to='/login' state={{from: location}} replace/>
  )} else {
      return children
      
  }
}

export default RequireAuthentication;

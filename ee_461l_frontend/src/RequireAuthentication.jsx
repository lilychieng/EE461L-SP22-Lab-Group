import React, { Children } from 'react'
import { useLocation, Navigate } from "react-router-dom";
import { useUser } from './hooks/UserContext';

function RequireAuthentication({isAuthenticated, children}) {
  const location = useLocation();
  const user = useUser();

  if(!user) {
    return (
      <Navigate to='/login' state={{from: location}} replace/>
  )} else {
      return children
      
  }
}

export default RequireAuthentication;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./index"; // Adjust the import path as necessary

const AuthorizedRoute = ({ element, allowedRoles }) => {
  const { userRole, isAuthenticated } = useAuth();

  if (!userRole) {
    console.error("userRole is not defined.");
    return <Navigate to="/home" />;
  }

  if (!allowedRoles.includes(userRole)) {
    console.error("userRole is not authorize.");
    return <Navigate to="/home" />;
  }

  return element; // Render the desired component if authorized
};

export default AuthorizedRoute;

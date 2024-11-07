import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./index";

const AuthorizedRoute = ({ element, allowedRoles }) => {
  const { userRole } = useAuth();

  if (!userRole) {
    console.error("userRole is not defined.");
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(userRole)) {
    console.error("userRole is not authorize.");
    return <Navigate to="/home" />;
  }

  return element; // Render the desired component if authorized
};

export default AuthorizedRoute;

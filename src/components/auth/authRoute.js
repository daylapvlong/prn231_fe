import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./index";

const AuthorizedRoute = ({ element, allowedRoles }) => {
  const { userRole, userData } = useAuth();

  if (!userRole) {
    console.error("userRole is not defined.");
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(userRole)) {
    console.error("userRole is not authorize.");
    return <Navigate to="/auth/denied" />;
  }

  // Check if the user's status is "0"
  if (userData.status === "0") {
    console.error("User status is inactive.");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("user");
    return <Navigate to="/auth/denied" />;
  }

  return element; // Render the desired component if authorized
};

export default AuthorizedRoute;

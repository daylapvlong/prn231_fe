import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./index"; // Adjust the import path as necessary

const AuthorizedRoute = ({ element, allowedRoles }) => {
  const { userRole, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to the sign-in page if not authenticated
    return <Navigate to="/auth/sign-in" />;
  }

  if (!allowedRoles.includes(userRole)) {
    // Redirect or show an error if the user does not have permission
    return <Navigate to="/home" />; // Change this to the desired route
  }

  return element; // Render the desired component if authorized
};

export default AuthorizedRoute;

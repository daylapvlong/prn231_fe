import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.role) {
      setUserRole(user.role);
    } else {
      setUserRole(null);
    }

    if (token && tokenExpiration) {
      const isTokenExpired =
        new Date().getTime() > new Date(tokenExpiration).getTime();

      if (!isTokenExpired && user) {
        setIsAuthenticated(true);
        setUserRole(user.role);
        setUserData(user);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUserRole(null);
        setUserData(null);
      }
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
      setUserData(null);
    }

    setLoading(false);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserRole(null);
    setUserData(null);
  };

  const HandleIsAuthenticated = (role, user) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserData(user);
  };

  // Return loading state until checking authentication is complete
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        logout,
        HandleIsAuthenticated,
        userRole,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

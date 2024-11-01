import React, { createContext, useContext, useState, useEffect } from "react";

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    if (token && tokenExpiration) {
      const isTokenExpired =
        new Date().getTime() > new Date(tokenExpiration).getTime();

      if (!isTokenExpired) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
      }
    }

    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  const HandleIsAuthenticated = () => {
    setIsAuthenticated(true);
  };

  // Return loading state until checking authentication is complete
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or component
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, logout, HandleIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

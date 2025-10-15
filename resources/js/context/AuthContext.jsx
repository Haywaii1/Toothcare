import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load from localStorage on first render
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Listen for login/logout changes
  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem("auth_token");
      const storedUser = localStorage.getItem("auth_user");

      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener("authChanged", handleAuthChange);
    return () => window.removeEventListener("authChanged", handleAuthChange);
  }, []);

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setUser(null);
    window.dispatchEvent(new Event("authChanged"));
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

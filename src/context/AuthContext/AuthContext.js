import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwtToken") || "");

  useEffect(() => {
    if (jwtToken) {
      localStorage.setItem("jwtToken", jwtToken);
    }
  }, [jwtToken]);

  const logout = () => {
    setJwtToken("");
    localStorage.removeItem("jwtToken");
  };

  return (
    <AuthContext.Provider value={{ jwtToken, setJwtToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

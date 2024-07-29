import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ adminLoggedIn, setAdminLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

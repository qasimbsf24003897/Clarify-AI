import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("clarifyUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signup = (name, email, password) => {
    const newUser = { name, email, password };

    localStorage.setItem(
      "clarifyAccount",
      JSON.stringify(newUser)
    );

    localStorage.setItem(
      "clarifyUser",
      JSON.stringify(newUser)
    );

    setUser(newUser);
  };

  const login = (email, password) => {
    const account = JSON.parse(
      localStorage.getItem("clarifyAccount")
    );

    if (
      account &&
      account.email === email &&
      account.password === password
    ) {
      localStorage.setItem(
        "clarifyUser",
        JSON.stringify(account)
      );

      setUser(account);

      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem("clarifyUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
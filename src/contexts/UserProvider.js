import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../services/firebase";

const UserContext = createContext(null);

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const value = {
    currentUser,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};

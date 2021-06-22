import React, { useState, useEffect, createContext, useContext } from "react";
import firebase from "../services/firebase-config";

const UserContext = createContext(null);

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, [currentUser]);

  const value = {
    currentUser,
    loading,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};

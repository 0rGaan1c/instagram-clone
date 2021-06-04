import React, { useEffect } from "react";
import { StyledAuth } from "../services/auth";
import { useUser } from "../contexts/UserProvider";
import firebase from "../services/firebase-config";
import Feed from "./Feed";

const Signin = () => {
  const { currentUser } = useUser();

  useEffect(() => {
    if (currentUser) {
      const { displayName: name, photoURL, email } = currentUser;
      const db = firebase.firestore();
      const docRef = db.collection("users").doc(currentUser.uid);

      docRef.get().then((doc) => {
        if (doc.exists) {
          console.log("user already exsits");
        } else {
          docRef.set({
            personalInfo: {
              name,
              photoURL,
              username: name,
              email,
            },
          });
        }
      });
    }
  }, []);

  return (
    <>
      {currentUser ? (
        <div>
          <Feed />
        </div>
      ) : (
        <main className="w-11/12 mx-auto">
          <div className="mt-64 text-center">
            <h1 className="font-bold text-4xl">Instagram</h1>
            <div className="mt-14 w-80 mx-auto">
              <StyledAuth />
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Signin;
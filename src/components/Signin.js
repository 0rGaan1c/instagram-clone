import React from "react";
import { StyledAuth } from "../services/auth";
import { useUser } from "../contexts/UserProvider";
import ProfileSetup from "./ProfileSetup";
// import firebase from "../services/firebase-config";

const Signin = () => {
  const { currentUser } = useUser();

  // const signInAnonymously = () => {
  //   const auth = firebase.auth();
  //   auth.signInAnonymously();
  // };

  return (
    <>
      {currentUser ? (
        <div>
          <ProfileSetup />
        </div>
      ) : (
        <main className="w-11/12 mx-auto">
          <div className="mt-64 text-center">
            <h1 className="font-bold text-4xl">Instagram</h1>
            <div className="mt-14 w-80 mx-auto">
              <StyledAuth />
              {/* <button className="bg-blue-500 p-4" onClick={signInAnonymously}>
                signed in anonymously
              </button> */}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Signin;

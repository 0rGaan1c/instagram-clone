import React, { useState, useRef, useEffect } from "react";
import { useUser } from "../contexts/UserProvider";
import { signOut } from "../services/auth";
import firebase from "../services/firebase-config";

const ProfileSetup = () => {
  const {
    currentUser: { displayName, email, photoURL, uid },
  } = useUser();
  const usernameRef = useRef(null);
  const [ringError, setRingError] = useState("focus:ring");
  const [isUser, setIsUser] = useState(false);
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const db = firebase.firestore();
    const docRef = db.collection("users").doc(uid);

    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log("user is already there");
        setIsUser(true);
      } else {
        setShowPage(true);
        console.log("user is not there");
      }
    });
  }, [isUser, uid]);

  const handleSubmit = () => {
    const username = usernameRef.current.value;

    if (username === "") {
      setRingError("ring ring-red-500");
      setTimeout(() => {
        setRingError("focus:ring");
      }, 2000);
      return;
    }

    // check for same username here before doing this tho.
    const db = firebase.firestore();
    const docRef = db.collection("users").doc(uid);

    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log("should not happen");
      } else {
        console.log("add user to database");
        docRef.set({
          personalInfo: {
            displayName,
            photoURL,
            email,
            username,
          },
        });
      }
      setIsUser(true);
    });
  };

  if (isUser) {
    return <h1 onClick={signOut}>Sign Out</h1>;
  }

  return (
    <>
      {showPage ? (
        <div className="w-3/4 mx-auto mt-64">
          <form>
            <label>
              <p className="mb-2">Choose a username</p>
              <input
                type="text"
                className={`shadow p-2 w-full outline-blue border-2 border-gray-300 shadow outline-none focus:outline-none ${ringError}`}
                placeholder="Username"
                ref={usernameRef}
              />
            </label>
            <div
              className="w-1/4 text-center mt-4 py-1 bg-blue-500 text-white rounded-sm mx-auto hover:bg-blue-600 cursor-pointer"
              onClick={handleSubmit}
            >
              Next
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default ProfileSetup;

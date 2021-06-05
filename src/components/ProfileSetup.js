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
  const [usernames, setUsernames] = useState([]);
  const [isUsernameUnique, setIsUsernameUnique] = useState(true);

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data().personalInfo.username);
          setUsernames((prevState) => {
            return [...prevState, doc.data().personalInfo.username];
          });
        });
      });

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
    const username = usernameRef.current.value.toLowerCase();

    if (username === "") {
      setRingError("ring ring-red-500");
      setTimeout(() => {
        setRingError("focus:ring");
      }, 2000);
      return;
    }

    console.log(usernames);
    if (usernames.includes(username)) {
      setIsUsernameUnique(false);
      setRingError("ring ring-red-500");
      setTimeout(() => {
        setRingError("focus:ring");
        setIsUsernameUnique(true);
      }, 2000);
      console.log("username is not unique");
      return;
    }

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
      {showPage && (
        <div className="w-3/4 mx-auto mt-64">
          <form>
            <label>
              <p className="mb-2">Choose a username</p>
              {!isUsernameUnique && (
                <div className="text-sm text-gray-500 text-center mb-2">
                  Username already taken!
                </div>
              )}
              <input
                type="text"
                className={`shadow p-2 w-full outline-blue border-2 border-gray-300 shadow outline-none focus:outline-none ${ringError}`}
                placeholder="Username (case insensitive)"
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
      )}
    </>
  );
};

export default ProfileSetup;

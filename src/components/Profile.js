import React, { useState, useEffect } from "react";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "../services/auth";
import { Link, useParams } from "react-router-dom";
import firebase from "../services/firebase-config";
import { useUser } from "../contexts/UserProvider";

const Profile = () => {
  const {
    currentUser: { uid },
  } = useUser();
  const [userInfo, setUserInfo] = useState({});
  const [isUserValid, setIsUserValid] = useState(false);
  const { username } = useParams();
  const [uID, setUID] = useState(uid);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().personalInfo.username === username) {
            setIsUserValid(true);
            setUID(doc.id);
          }
        });
      });

    const docRef = db.collection("users").doc(uID);
    docRef.get().then((doc) => {
      if (doc.exists) {
        const { name, photoURL, username } = doc.data().personalInfo;
        setUserInfo({
          name,
          photoURL,
          username,
        });
      } else {
        console.log("should not happen");
      }
    });
  }, [uID]);

  return (
    <>
      <nav className="bg-gray-100 flex items-center text-xl justify-between p-2">
        <Link to="/">
          <FaHome className="text-2xl cursor-pointer" />
        </Link>
        <h1 className="tracking-wide">{userInfo.username}</h1>
        <FaSignOutAlt onClick={signOut} className="text-2xl cursor-pointer" />
      </nav>
      {isUserValid ? (
        <div>
          <div>
            <img src={userInfo.photoURL} alt="" />
          </div>
        </div>
      ) : (
        <div className="text-center mt-8 w-3/4 mx-auto">
          <h1 className="font-bold text-2xl">
            Sorry, this page isn't available
          </h1>
          <p className="text-sm text-gray-500">
            The link you followed may be broken, or the page may have been
            removed. <Link to="/">Go back to fake Instagram.</Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Profile;

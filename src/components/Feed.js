import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { useUser } from "../contexts/UserProvider";
import { Link } from "react-router-dom";
import firebase from "../services/firebase-config";

const Feed = () => {
  const {
    currentUser: { uid },
  } = useUser();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const db = firebase.firestore();
    const docRef = db.collection("users").doc(uid);

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
  }, [uid]);

  return (
    <>
      <nav className="bg-gray-100 flex items-center text-xl justify-between p-2">
        <Link to="/">
          <FaHome className="text-2xl cursor-pointer" />
        </Link>
        <h1 className="font-bold tracking-wide">Instagram</h1>
        <div className="w-1/12 cursor-pointer">
          <Link to={`/${userInfo.username}`}>
            <img
              src={userInfo.photoURL}
              alt=""
              className="rounded-full cursor-pointer"
            />
          </Link>
        </div>
      </nav>
      <div className="text-center mt-8 w-4/5 mx-auto">
        <h2 className="text-2xl">Welcome to Instagram</h2>
        <p className="text-sm text-gray-500">
          When you follow people you'll see the photos they post here.
        </p>
      </div>
    </>
  );
};

export default Feed;

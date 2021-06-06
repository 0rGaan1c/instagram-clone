import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import firebase from "../services/firebase-config";
import { useUser } from "../contexts/UserProvider";
import NavBar from "./NavBar";

const Profile = () => {
  const {
    currentUser: { uid },
  } = useUser();
  const [userInfo, setUserInfo] = useState({});
  const [isUserValid, setIsUserValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uID, setUID] = useState(uid);
  const [isProtected, setIsProtected] = useState(false);
  const { username } = useParams();

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

    if (uid !== uID) {
      setIsProtected(true);
    }
    if (isUserValid) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [uID, uid, username, isUserValid]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {isUserValid ? (
        <>
          <div>
            <img src={userInfo.photoURL} alt="" />
            {isProtected ? (
              <div> This account is protected </div>
            ) : (
              <div> This is your own account </div>
            )}
          </div>
          <NavBar />
        </>
      ) : (
        <div className="text-center mt-8 w-3/4 mx-auto">
          <h1 className="font-bold text-2xl">
            Sorry, this page isn't available
          </h1>
          <p className="text-sm text-gray-500">
            The link you followed may be broken, or the page may have been
            removed.
            <Link to="/" className="text-blue-500">
              Go back to fake Instagram.
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Profile;

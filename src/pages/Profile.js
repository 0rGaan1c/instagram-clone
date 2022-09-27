import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import firebase from "../services/firebase-config";
import { useUser } from "../contexts/UserProvider";
import NavBar from "../components/NavBar";
import UserProfile from "../components/UserProfile";
import ProtectedProfile from "../components/ProtectedProfile";

const Profile = () => {
  const {
    currentUser: { uid },
  } = useUser();
  // uid == uid of current logged in user
  // uID == uid of the searched user i.e., user search by the currently logged in user
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [isUserValid, setIsUserValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [UID, setUID] = useState(null);
  const [isProtected, setIsProtected] = useState(false);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().username === username) {
            setIsUserValid(true);
            setUID(doc.id);
          }
        });
      });
  }, [username]);

  useEffect(() => {
    if (UID) {
      const db = firebase.firestore();
      const docRef = db.collection("users").doc(UID);
      docRef.get().then((doc) => {
        if (doc.exists) {
          const { name, photoURL, username } = doc.data();
          setUserInfo({
            name,
            photoURL,
            username,
          });
        } else {
          console.log("should not happen");
        }
      });
    }

    if (uid !== UID) {
      setIsProtected(true);
    } else {
      setIsProtected(false);
    }

    if (isUserValid) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [UID, uid, username, isUserValid]);

  if (loading) {
    return <h1 className="text-center mt-8">Loading...</h1>;
  }

  return (
    <>
      {isUserValid ? (
        <>
          <div className="lg:w-1/3 lg:m-auto">
            {isProtected ? (
              <ProtectedProfile userInfo={userInfo} />
            ) : (
              <>
                <UserProfile userInfo={userInfo} />
              </>
            )}
            <NavBar />
          </div>
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

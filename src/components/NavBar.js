import React, { useState, useEffect } from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import { useUser } from "../contexts/UserProvider";
import { Link } from "react-router-dom";
import firebase from "../services/firebase-config";

const NavBar = () => {
  const {
    currentUser: { uid },
  } = useUser();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const docRef = db.collection("users").doc(uid);

      docRef
        .get()
        .then((doc) => {
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
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    };

    fetchData();
  }, [uid]);

  return (
    <>
      <div className="lg:m-auto">
        <nav className="lg:w-1/3 lg:left-1/3 w-full bg-gray-100 flex items-center text-xl justify-between p-2 fixed bottom-0">
          <Link to="/">
            <FaHome className="text-2xl cursor-pointer" />
          </Link>
          <Link to={`/${userInfo.username}/discover`}>
            <FaSearch />
          </Link>
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
      </div>
    </>
  );
};

export default NavBar;

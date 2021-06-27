import React, { useState, useEffect, useRef } from "react";
import { useParams, Redirect } from "react-router-dom";
import TopBar from "./TopBar";
import DeleteProfile from "./DeleteProfile";
import firebase from "../services/firebase-config";
import { useUser } from "../contexts/UserProvider";

const EditProfile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [ringError, setRingError] = useState("focus:ring");
  const [usernames, setUsernames] = useState([]);
  const [isUsernameUnique, setIsUsernameUnique] = useState(true);
  const usernameRef = useRef(null);
  const nameRef = useRef(null);
  const { username } = useParams();
  const {
    currentUser: { uid },
  } = useUser();

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        setUserInfo(doc.data());
      });
  }, [uid]);

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().username !== username) {
            setUsernames((prevState) => {
              return [...prevState, doc.data().username];
            });
          }
        });
      });
  }, [username]);

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        setLoggedInUsername(doc.data().username);
      });
  }, [uid]);

  useEffect(() => {
    if (loggedInUsername && username !== loggedInUsername) {
      setRedirect(`/${username}`);
    }
  }, [loggedInUsername, username]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let username = usernameRef.current.value.toLowerCase();
    let name = nameRef.current.value;

    if (usernames.includes(username)) {
      setIsUsernameUnique(false);
      setRingError("ring ring-red-500");
      setTimeout(() => {
        setRingError("focus:ring");
        setIsUsernameUnique(true);
      }, 2000);
      return;
    }

    if (name === "") {
      name = userInfo.name;
    }
    if (username === "") {
      username = userInfo.username;
    }

    const db = firebase.firestore();
    db.collection("users").doc(uid).set({
      username,
      name,
      photoURL: userInfo.photoURL,
    });

    setRedirect(`/${username}`);
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <>
      <TopBar show={"Edit"} />
      <div className="w-3/4 mx-auto mt-32">
        <form>
          <label>
            <p className="mb-2">Edit Name</p>
            <input
              type="text"
              className={`shadow p-2 w-full outline-blue border-2 border-gray-300 shadow outline-none focus:outline-none mb-4 focus:ring`}
              ref={nameRef}
            />
          </label>
          <label>
            <p className="mb-2">Edit Username</p>
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
          <div className="text-center">
            <button
              className="w-1/4 text-center mr-2 mt-4 py-1 bg-blue-500 text-white rounded-sm mx-auto hover:bg-blue-600 cursor-pointer"
              onClick={handleSubmit}
            >
              Update
            </button>

            <DeleteProfile uid={uid} />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;

import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import firebase from "../services/firebase-config";
import { Link, Redirect, useParams } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";
import Follow from "./Follow";

const DiscoverPeople = () => {
  const [users, setUsers] = useState([]);
  const { username } = useParams();
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  const [redirect, setRedirect] = useState(null);

  const {
    currentUser: { uid },
  } = useUser();

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
      return;
    }

    if (username === loggedInUsername) {
      setUsers([]);
      const db = firebase.firestore();
      db.collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            if (doc.data().username !== username) {
              setUsers((prevState) => {
                return [...prevState, { ...doc.data() }];
              });
            }
          });
        });
    }
  }, [username, loggedInUsername]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <>
      <div className="lg:w-1/3 lg:m-auto">
        <TopBar show={"Discover People"} />
        <h1 className="font-bold ml-4 mt-2">Suggested</h1>
        <div>
          {users.map(({ photoURL, name, username }, idx) => {
            return (
              <div
                className="mx-2 flex justify-between items-center my-3"
                key={idx}
              >
                <Link to={`/${username}`}>
                  <div className="flex">
                    <div className="w-3/12">
                      <img src={photoURL} alt={name} className="rounded-full" />
                    </div>
                    <div className="text-sm ml-2">
                      <div className="ml-2">{username}</div>
                      <div className="-mt-2 text-gray-400">{name}</div>
                    </div>
                  </div>
                </Link>
                <button className="w-1/5 bg-blue-500 font-bold text-white rounded-sm">
                  <Follow username={username} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DiscoverPeople;

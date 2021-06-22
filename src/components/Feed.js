import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "../services/auth";
import { useUser } from "../contexts/UserProvider";
import { Link } from "react-router-dom";
import firebase from "../services/firebase-config";

const Feed = () => {
  const {
    currentUser: { uid },
  } = useUser();
  const [following, setFollowing] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const db = firebase.firestore();

      db.collection("users")
        .doc(uid)
        .collection("following")
        .get()
        .then((querySnapshot) => {
          setFollowing(querySnapshot.docs.map((doc) => doc.data().username));
        });
    };
    fetchData();
  }, [uid]);

  useEffect(() => {
    setPosts([]);
    if (following.length) {
      const db = firebase.firestore();

      db.collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            if (following.includes(doc.data().username))
              db.collection("users")
                .doc(doc.id)
                .get()
                .then((doc) => {
                  const photoURL = doc.data().photoURL;
                  db.collection("users")
                    .doc(doc.id)
                    .collection("posts")
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.docs.forEach((doc) => {
                        setPosts((prevState) => {
                          return [...prevState, { ...doc.data(), photoURL }];
                        });
                      });
                    });
                });
          });
        });
    }
  }, [following]);

  useEffect(() => {
    if (posts.length) {
      posts.sort(function (x, y) {
        return y.timestamp.seconds - x.timestamp.seconds;
      });
    }
  }, [posts]);

  return (
    <>
      <nav className="bg-gray-100 flex items-center text-xl justify-between p-2">
        <h1 className="font-bold tracking-wide">Instagram</h1>
        <FaSignOutAlt onClick={signOut} />
      </nav>
      {posts.length ? (
        posts.map(({ username, caption, timestamp, url, photoURL }, idx) => {
          return (
            <div key={idx} className="mb-8">
              <div className="bg-grey-300 flex items-center text-xl p-3">
                <div className="w-1/12 cursor-pointer">
                  <Link to={`/${username}`}>
                    <img
                      src={photoURL}
                      alt=""
                      className="rounded-full cursor-pointer"
                    />
                  </Link>
                </div>
                <div className="text-sm ml-4 font-bold">{username}</div>
              </div>
              <div>
                <img src={url} alt={caption} />
              </div>
              {caption !== "" && (
                <p className="mt-2 ml-4">
                  <span className="font-bold mr-2">{username}</span>
                  {caption}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-4 ml-4">
                {new Date(timestamp.seconds * 1000).toDateString()}
              </p>
            </div>
          );
        })
      ) : (
        <div className="text-center mt-8 w-4/5 mx-auto">
          <h2 className="text-2xl">Welcome to Instagram</h2>
          <p className="text-sm text-gray-500">
            When you follow people you'll see the photos they post here.
          </p>
        </div>
      )}

      <NavBar />
    </>
  );
};

export default Feed;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "../services/firebase-config";

// naming files and variables are tough, you can't change my mind :|
const PostFollowerFollowing = ({ username, numberOfPosts }) => {
  const [userDocId, setUserDocId] = useState(null);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (doc.data().username === username) {
            setUserDocId(doc.id);
          }
        });
      });
  }, [username]);

  useEffect(() => {
    if (userDocId) {
      setFollowing([]);
      setFollowers([]);
      const db = firebase.firestore();

      db.collection("users")
        .doc(userDocId)
        .collection("following")
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            setFollowing((prevState) => {
              return [...prevState, doc.data().username];
            });
          });
        });

      db.collection("users")
        .doc(userDocId)
        .collection("followers")
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            setFollowers((prevState) => {
              return [...prevState, doc.data().username];
            });
          });
        });
    }
  }, [userDocId]);

  return (
    <div className="border=gray-200 border-t-2 border-b-2 flex justify-between mt-6">
      <div className="p-4">
        <div className="font-bold text-center">{numberOfPosts}</div>
        <div className="text-gray-500">posts</div>
      </div>
      <Link to={`/${username}/followers`}>
        <div className="p-4">
          <div className="font-bold text-center">{followers.length}</div>
          <div className="text-gray-500">followers</div>
        </div>
      </Link>

      <Link to={`/${username}/following`}>
        <div className="p-4">
          <div className="font-bold text-center">{following.length}</div>
          <div className="text-gray-500">following</div>
        </div>
      </Link>
    </div>
  );
};

export default PostFollowerFollowing;

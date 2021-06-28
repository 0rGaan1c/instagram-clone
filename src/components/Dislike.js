import React, { useState, useEffect } from "react";
import { RiDislikeLine, RiDislikeFill } from "react-icons/ri";
import firebase from "../services/firebase-config";
import { useUser } from "../contexts/UserProvider";
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";

const Dislike = ({ UID, likes, id, username }) => {
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [isDisliked, setIsDisliked] = useState(false);
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
    if (loggedInUsername) {
      if (likes.includes(loggedInUsername)) {
        setIsDisliked(true);
      }
    }
  }, [likes, loggedInUsername]);

  const handleDislike = () => {
    if (isDisliked) {
      const newLikes = likes;

      const index = newLikes.indexOf(loggedInUsername);
      if (index > -1) {
        newLikes.splice(index, 1);
      }

      const db = firebase.firestore();
      db.collection("users")
        .doc(UID)
        .collection("posts")
        .doc(id)
        .get()
        .then((doc) => {
          db.collection("users")
            .doc(UID)
            .collection("posts")
            .doc(id)
            .set({
              ...doc.data(),
              likes: newLikes,
            });
        });

      setIsDisliked(false);
    } else {
      const newLikes = likes;
      newLikes.push(loggedInUsername);
      const db = firebase.firestore();
      db.collection("users")
        .doc(UID)
        .collection("posts")
        .doc(id)
        .get()
        .then((doc) => {
          db.collection("users")
            .doc(UID)
            .collection("posts")
            .doc(id)
            .set({
              ...doc.data(),
              likes: newLikes,
            });
        });
      setIsDisliked(true);
    }
  };

  return (
    <>
      <div className="flex">
        {isDisliked ? (
          <RiDislikeFill
            className="ml-4 text-2xl mt-2"
            onClick={handleDislike}
          />
        ) : (
          <RiDislikeLine
            className="ml-4 text-2xl mt-2"
            onClick={handleDislike}
          />
        )}
        <Link
          to={`/${username}/post/${id}/comments`}
          className="mt-2 text-xl ml-3"
        >
          <FaRegComment />
        </Link>
      </div>

      {likes && (
        <Link to={`/${username}/post/${id}/dislikes`}>
          <p className="ml-4 text-gray-500 text-sm">{likes.length} dislike</p>
        </Link>
      )}
    </>
  );
};

export default Dislike;

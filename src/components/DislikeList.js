import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import firebase from "../services/firebase-config";

const DislikeList = () => {
  const [dislikes, setDislikes] = useState([]);
  const { username, id } = useParams();
  useEffect(() => {
    const db = firebase.firestore();

    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (doc.data().username === username) {
            db.collection("users")
              .doc(doc.id)
              .collection("posts")
              .doc(id)
              .get()
              .then((doc) => {
                setDislikes(doc.data().likes);
              });
          }
        });
      });
  }, [username, id]);

  return (
    <>
      {dislikes.map((user, idx) => {
        return (
          <Link to={`/${user}`} key={idx}>
            <div className="text-center bg-gray-400 text-white font-bold text-xl py-2">
              {user}
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default DislikeList;

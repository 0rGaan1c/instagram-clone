import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import firebase from "../services/firebase-config";
import TopBar from "../components/TopBar";

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
      <div className="lg:w-1/3 lg:m-auto">
        <TopBar show={"Dislikes"} />
        {dislikes.map((user, idx) => {
          return (
            <Link to={`/${user}`} key={idx}>
              <div className="text-center bg-gray-400 text-white font-bold text-xl py-2">
                {user}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default DislikeList;

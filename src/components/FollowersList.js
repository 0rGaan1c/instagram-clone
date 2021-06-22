import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "../services/firebase-config";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";

const FollowersList = () => {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (doc.data().username === username) {
            db.collection("users")
              .doc(doc.id)
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
        });
      });
  }, [username]);

  return (
    <>
      <TopBar show={"Followers"} />
      {followers.map((user, idx) => {
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

export default FollowersList;

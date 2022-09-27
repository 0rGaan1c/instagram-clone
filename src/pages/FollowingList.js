import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "../services/firebase-config";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";

const FollowingList = () => {
  const { username } = useParams();
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (doc.data().username === username) {
            db.collection("users")
              .doc(doc.id)
              .collection("following")
              .get()
              .then((querySnapshot) => {
                querySnapshot.docs.forEach((doc) => {
                  setFollowing((prevState) => {
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
      <div className="lg:w-1/3 lg:m-auto">
        <TopBar show={"Following"} />
        {following.map((user, idx) => {
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

export default FollowingList;

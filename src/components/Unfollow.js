import React, { useState, useEffect } from "react";
import firebase from "../services/firebase-config";

const Unfollow = ({ username, uid, setIsFollowing, loggedInUsername }) => {
  const [followingDocId, setFollowingDocId] = useState(null);

  useEffect(() => {
    if (followingDocId) {
      const db = firebase.firestore();

      db.collection("users")
        .doc(uid)
        .collection("following")
        .doc(followingDocId)
        .delete()
        .then(() => {
          console.log("Deleted Document successfully");
          setIsFollowing(false);
        })
        .catch((error) => {
          console.log("Error removing document: ", error);
        });
    }
  }, [followingDocId, uid, setIsFollowing]);

  const handleUnfollow = () => {
    const db = firebase.firestore();

    db.collection("users")
      .doc(uid)
      .collection("following")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (doc.data().username === username) {
            setFollowingDocId(doc.id);
          }
        });
      });

    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (doc.data().username === username) {
            const userID = doc.id;
            db.collection("users")
              .doc(userID)
              .collection("followers")
              .get()
              .then((querySnapshot) => {
                querySnapshot.docs.forEach((doc) => {
                  if (doc.data().username === loggedInUsername) {
                    db.collection("users")
                      .doc(userID)
                      .collection("followers")
                      .doc(doc.id)
                      .delete()
                      .then(() => {
                        console.log("followers document deleted successfully");
                      })
                      .catch((error) => {
                        console.log("error: ", error);
                      });
                  }
                });
              });
          }
        });
      });
  };

  return (
    <>
      <div
        className="text-center text-sm py-1 text-black font-bold bg-white border-2 border-gray-500 rounded-sm cursor-pointer"
        onClick={handleUnfollow}
      >
        Unfollow
      </div>
    </>
  );
};

export default Unfollow;

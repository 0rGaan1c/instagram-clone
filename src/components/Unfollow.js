import React, { useState, useEffect } from "react";
import firebase from "../services/firebase-config";

const Unfollow = ({ username, uid, setIsFollowing }) => {
  const [docId, setDocId] = useState(null);

  useEffect(() => {
    if (docId) {
      const db = firebase.firestore();

      db.collection("users")
        .doc(uid)
        .collection("following")
        .doc(docId)
        .delete()
        .then(() => {
          console.log("Deleted Document successfully");
          setIsFollowing(false);
        })
        .catch((error) => {
          console.log("Error removing document: ", error);
        });
    }
  }, [docId, uid, setIsFollowing]);

  const handleUnfollow = () => {
    const db = firebase.firestore();

    db.collection("users")
      .doc(uid)
      .collection("following")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (doc.data().username === username) {
            setDocId(doc.id);
          }
        });
      });
  };

  return (
    <>
      <div
        className="text-center text-sm py-1 text-black font-bold bg-white border-2 border-gray-500 rounded-sm"
        onClick={handleUnfollow}
      >
        Unfollow
      </div>
    </>
  );
};

export default Unfollow;

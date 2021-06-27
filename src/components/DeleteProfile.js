import React, { useState } from "react";
import firebase from "../services/firebase-config";
import { useUser } from "../contexts/UserProvider";
import { useParams } from "react-router-dom";

const DeleteProfile = ({ uid }) => {
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useUser();
  const { username } = useParams();

  const openModal = () => {
    setShowModal(true);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const db = firebase.firestore();

    currentUser
      .delete()
      .then(() => {
        console.log("user account deleted");
      })
      .catch((error) => {
        console.log(error);
      });

    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          const userId = doc.id;
          db.collection("users")
            .doc(userId)
            .collection("followers")
            .get()
            .then((querySnapshot) => {
              querySnapshot.docs.forEach((doc) => {
                if (doc.data().username === username) {
                  db.collection("users")
                    .doc(userId)
                    .collection("followers")
                    .doc(doc.id)
                    .delete()
                    .then(() => {
                      console.log("deleted from followers list");
                    });
                }
              });
            });

          db.collection("users")
            .doc(userId)
            .collection("following")
            .get()
            .then((querySnapshot) => {
              querySnapshot.docs.forEach((doc) => {
                if (doc.data().username === username) {
                  db.collection("users")
                    .doc(userId)
                    .collection("following")
                    .doc(doc.id)
                    .delete()
                    .then(() => {
                      console.log("deleted from following list");
                    });
                }
              });
            });
        });
      });

    db.collection("users")
      .doc(uid)
      .delete()
      .then(() => {
        console.log("Deleted User");
      })
      .catch((error) => {
        console.log("Error deleting user", error);
      });
  };

  return (
    <>
      <hr className="mt-10"></hr>
      <div className="mt-10">
        <h2 className="text-red-500 text-lg" onClick={openModal}>
          Delete your account?
        </h2>
        {showModal && (
          <div>
            <div className="text-red-500 text-lg mt-4 font-bold">
              Are you sure?
            </div>
            <button
              className="w-2/4 text-center mr-2 mt-4 py-1 bg-red-500 text-white rounded-sm mx-auto cursor-pointer"
              onClick={handleDelete}
            >
              Yes, I am sure.
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default DeleteProfile;

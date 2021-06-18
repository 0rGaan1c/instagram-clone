import React, { useEffect, useState } from "react";
import firebase from "../services/firebase-config";
import { useUser } from "../contexts/UserProvider";
import Unfollow from "./Unfollow";

const Follow = ({ username }) => {
  const {
    currentUser: { uid },
  } = useUser();
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const db = firebase.firestore();

    const fetchData = async () => {
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
    if (following.includes(username)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [following, username]);

  const handleFollow = () => {
    const db = firebase.firestore();
    db.collection("users").doc(uid).collection("following").add({
      username,
    });
    setIsFollowing(!isFollowing);
  };

  return (
    <>
      {isFollowing ? (
        <Unfollow
          username={username}
          uid={uid}
          setIsFollowing={setIsFollowing}
          isFollowing={isFollowing}
        />
      ) : (
        <div className="w-11/12 mx-auto bg-blue-400 rounded-sm">
          <div
            className="text-center text-sm py-1 text-white font-bold"
            onClick={handleFollow}
          >
            Follow
          </div>
        </div>
      )}
    </>
  );
};

export default Follow;

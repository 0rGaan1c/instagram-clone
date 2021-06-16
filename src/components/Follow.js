import React, { useEffect, useState } from "react";
import firebase from "../services/firebase-config";
import { useUser } from "../contexts/UserProvider";

const Follow = ({ username }) => {
  const {
    currentUser: { uid },
  } = useUser();
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const db = firebase.firestore();

    const fetchData = async () => {
      db.collection("users")
        .doc(uid)
        .get()
        .then((doc) => {
          setFollowing(doc.data().following);
          setUserInfo(doc.data());
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
  }, [following, username, userInfo]);

  const handleFollow = () => {
    const db = firebase.firestore();

    let newfollowing = userInfo.following;
    newfollowing.push(username);
    setUserInfo({ ...userInfo, following: newfollowing });
    db.collection("users").doc(uid).set({
      userInfo,
    });
  };

  return (
    <>
      {isFollowing ? (
        <div>Unfollow</div>
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

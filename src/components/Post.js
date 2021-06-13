import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TopBar from "./TopBar";
import firebase from "../services/firebase-config";
import { useUser } from "../contexts/UserProvider";

const Post = () => {
  const { id, username } = useParams();
  const {
    currentUser: { uid },
  } = useUser();
  const [post, setPost] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [UID, setUID] = useState(null);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("users").onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data().username === username) {
          setUserInfo(doc.data());
          setUID(doc.id);
        }
      });
    });

    if (UID) {
      db.collection("users")
        .doc(UID)
        .collection("posts")
        .doc(id)
        .get()
        .then((doc) => {
          setPost(doc.data());
        });
    }
  }, [UID, username, id, uid]);

  return (
    <>
      <TopBar show={"Photo"} />
      <div className="bg-grey-300 flex items-center text-xl p-3">
        <div className="w-1/12 cursor-pointer">
          <Link to={`/${username}`}>
            <img
              src={userInfo.photoURL}
              alt=""
              className="rounded-full cursor-pointer"
            />
          </Link>
        </div>
        <div className="text-sm ml-4 font-bold">{userInfo.username}</div>
      </div>
      <div>
        <img src={post.url} alt={post.caption} />
      </div>
      {post.caption !== "" && (
        <p className="mt-2 ml-4">
          <span className="font-bold mr-2">{post.username}</span>
          {post.caption}
        </p>
      )}
    </>
  );
};

export default Post;

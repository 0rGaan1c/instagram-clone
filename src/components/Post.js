import React, { useEffect, useState } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import TopBar from "./TopBar";
import firebase from "../services/firebase-config";
import { useUser } from "../contexts/UserProvider";
import { FaTrash } from "react-icons/fa";
import Dislike from "./Dislike";

const Post = () => {
  const { id, username } = useParams();
  const {
    currentUser: { uid },
  } = useUser();
  const [post, setPost] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [UID, setUID] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isProtected, setIsProtected] = useState(true);

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
          let timestamp = new Date(doc.data().timestamp.seconds * 1000);
          timestamp = timestamp.toDateString();
          setPost({ ...doc.data(), timestamp });
        });
    }
  }, [UID, username, id, uid]);

  useEffect(() => {
    if (UID && uid !== UID) {
      setIsProtected(true);
    } else {
      setIsProtected(false);
    }
  }, [uid, UID]);

  const handlePostDelete = () => {
    const db = firebase.firestore();

    db.collection("users")
      .doc(uid)
      .collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Post Deleted");
        setIsDeleted(true);
      })
      .catch((error) => {
        console.log("Error deleting post document: ", error);
      });
  };

  if (isDeleted) {
    return <Redirect to={`/${username}`} />;
  }

  return (
    <>
      <div className="lg:w-1/3 lg:m-auto">
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
          {!isProtected && (
            <FaTrash className="ml-auto" onClick={handlePostDelete} />
          )}
        </div>
        <div className="">
          <img src={post.url} alt={post.caption} className="block mx-auto" />
        </div>
        {post.likes && (
          <Dislike UID={UID} likes={post.likes} id={id} username={username} />
        )}
        {post.caption !== "" && (
          <p className="mt-2 ml-4 leading-tight">
            <span className="font-bold mr-2">{post.username}</span>
            {post.caption}
          </p>
        )}
        {post && post.comments && post.comments.length !== 0 && (
          <div className="w-full mt-2">
            <Link
              to={`/${username}/post/${id}/comments`}
              className="ml-4 text-gray-500 text-sm"
            >
              View all {post.comments.length} comments
            </Link>
            <div className="flex items-center w-11/12 mx-auto">
              <Link to={`/${post.comments[0].username}`}>
                <div className="font-bold text-sm">
                  {post.comments[0].username}
                </div>
              </Link>
              <div className="ml-2 text-sm">
                {post.comments[0].comment.substring(0, 45)}
                {post.comments[0].comment.length > 45 && <span>...</span>}
              </div>
            </div>
          </div>
        )}
        <p className="text-xs text-gray-500 mt-4 ml-4">{post.timestamp}</p>
      </div>
    </>
  );
};

export default Post;

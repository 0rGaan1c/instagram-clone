import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import firebase from "../services/firebase-config";
import { useUser } from "../contexts/UserProvider";
import { Link, useParams } from "react-router-dom";

const Comments = () => {
  const [userInfo, setUserInfo] = useState({});
  const {
    currentUser: { uid },
  } = useUser();
  const [commentValue, setCommentValue] = useState("");
  const { id, username } = useParams();
  const [UID, setUID] = useState(null);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        setUserInfo(doc.data());
      });
  }, [uid]);

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (doc.data().username === username) {
            setUID(doc.id);
          }
        });
      });
  }, [username]);

  useEffect(() => {
    if (UID) {
      const db = firebase.firestore();

      db.collection("users")
        .doc(UID)
        .collection("posts")
        .doc(id)
        .get()
        .then((doc) => {
          setPost(doc.data());
          setComments(doc.data().comments);
        });
    }
  }, [UID, id]);

  const handleAddComment = () => {
    if (commentValue === "") {
      return;
    }

    const db = firebase.firestore();

    db.collection("users")
      .doc(UID)
      .collection("posts")
      .doc(id)
      .set({
        ...post,
        comments: [
          ...post.comments,
          { username: userInfo.username, comment: commentValue },
        ],
      });

    setComments([
      ...comments,
      { username: userInfo.username, comment: commentValue },
    ]);
  };

  console.log(comments);
  return (
    <>
      <TopBar show={"Comments"} />
      <div className="flex w-11/12 mx-auto py-2">
        <div className="w-1/12 cursor-pointer">
          <Link to={`/${userInfo.username}`}>
            <img
              src={userInfo.photoURL}
              alt=""
              className="rounded-full cursor-pointer"
            />
          </Link>
        </div>
        <div className="w-full flex border-2 border-black rounded-lg ml-2">
          <input
            type="text"
            placeholder="Add a comment..."
            className="outline-none focus:outline-none ml-2 w-full rounded-lg"
            onChange={(e) => {
              setCommentValue(e.target.value);
            }}
          />
          {commentValue && (
            <button
              className="text-blue-600 mr-2 font-bold"
              onClick={handleAddComment}
            >
              Post
            </button>
          )}
        </div>
      </div>
      {comments.length && comments.length !== 0 ? (
        <div className="mt-2 w-11/12 mx-auto">
          <hr />
          {comments.map(({ username, comment }, idx) => {
            return (
              <div className="flex mt-4 items-center" key={idx}>
                <Link to={`/${username}`}>
                  <div className="font-bold text-lg">{username} </div>
                </Link>
                <div className="ml-2 text-gray-500">{comment}</div>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default Comments;

import React, { useState, useEffect } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { Link } from "react-router-dom";
import firebase from "../services/firebase-config";

const Posts = ({ usernamePost }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();

    console.log("when");
    db.collection("posts")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { caption, comments, likes, timestamp, url, username } =
            doc.data();
          if (username === usernamePost) {
            setPosts((prevState) => {
              return [
                ...prevState,
                { caption, comments, likes, timestamp, url },
              ];
            });
          }
        });
      });
  }, [usernamePost]);

  return (
    <>
      {posts.length ? (
        <h1>show posts</h1>
      ) : (
        <div className="text-center w-5/6 mx-auto mt-10">
          <AiOutlineCamera className="text-6xl mx-auto" />
          <h3 className="text-4xl font-thin">Share Photos</h3>
          <p className="mt-4">
            When you share photos, they will appear on your profile.
          </p>
          <p className="text-blue-600">
            <Link to={`/${usernamePost}/upload`}>Share your first photo</Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Posts;

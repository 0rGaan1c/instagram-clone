import React, { useState, useEffect } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { Link } from "react-router-dom";
import firebase from "../services/firebase-config";
import PostFollowerFollowing from "./PostFollowerFollowing";
import { useUser } from "../contexts/UserProvider";

const Posts = ({ username }) => {
  const {
    currentUser: { uid },
  } = useUser();
  const [posts, setPosts] = useState([]);
  const [UID, setUID] = useState(null);
  const [last, setLast] = useState(0);
  const [isProtected, setIsProtected] = useState(false);

  useEffect(() => {
    // setPosts([]);
    const db = firebase.firestore();
    db.collection("users").onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data().username === username) {
          setUID(doc.id);
        }
      });
    });

    if (uid !== UID) {
      setIsProtected(true);
    } else {
      setIsProtected(false);
    }

    if (UID) {
      db.collection("users")
        .doc(UID)
        .collection("posts")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setPosts(
            snapshot.docs.map((doc) => {
              const data = doc.data();
              data["id"] = doc.id;
              return data;
            })
          );
        });
    }
  }, [UID, uid, username]);

  useEffect(() => {
    if (posts.length) {
      setLast(posts.length);
    }
  }, [posts]);

  return (
    <>
      <PostFollowerFollowing username={username} numberOfPosts={posts.length} />
      {posts.length ? (
        <div>
          <div className="flex flex-wrap border-1 border-black">
            {posts.map(({ caption, url, id }, idx) => {
              return (
                <Link
                  to={`/${username}/post/${id}`}
                  key={idx}
                  className="w-1/3"
                >
                  {last - 1 === idx ? (
                    <img
                      src={url}
                      alt={caption}
                      className="w-full h-28 mb-12"
                    />
                  ) : (
                    <img src={url} alt={caption} className="w-full h-28" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ) : !isProtected ? (
        <div className="text-center w-5/6 mx-auto mt-10">
          <AiOutlineCamera className="text-6xl mx-auto" />
          <h3 className="text-4xl font-thin">Share Photos</h3>
          <p className="mt-4">
            When you share photos, they will appear on your profile.
          </p>
          <p className="text-blue-600">
            <Link to={`/${username}/upload`}>Share your first photo</Link>
          </p>
        </div>
      ) : null}
    </>
  );
};

export default Posts;

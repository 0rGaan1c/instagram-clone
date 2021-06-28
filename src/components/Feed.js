import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "../services/auth";
import { useUser } from "../contexts/UserProvider";
import { Link } from "react-router-dom";
import firebase from "../services/firebase-config";
import Dislike from "./Dislike";

const Feed = () => {
  const {
    currentUser: { uid },
  } = useUser();
  const [following, setFollowing] = useState([]);
  const [posts, setPosts] = useState([]);
  const [sortedPosts, setSortedPosts] = useState([]);
  const [last, setLast] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      const db = firebase.firestore();

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
    if (following.length) {
      setPosts([]);
      const db = firebase.firestore();

      db.collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            if (following.includes(doc.data().username))
              db.collection("users")
                .doc(doc.id)
                .get()
                .then((doc) => {
                  const photoURL = doc.data().photoURL;
                  const UID = doc.id;
                  db.collection("users")
                    .doc(doc.id)
                    .collection("posts")
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.docs.forEach((doc) => {
                        setPosts((prevState) => {
                          return [
                            ...prevState,
                            { ...doc.data(), photoURL, id: doc.id, UID },
                          ];
                        });
                      });
                    });
                });
          });
        });
    }
  }, [following]);

  useEffect(() => {
    if (posts.length) {
      setSortedPosts(
        posts.sort(function (x, y) {
          return y.timestamp.seconds - x.timestamp.seconds;
        })
      );
      setLast(posts.length);
    }
  }, [posts]);

  // console.log(posts);
  // console.log(sortedPosts);

  return (
    <>
      <nav className="bg-gray-100 flex items-center text-xl justify-between p-2">
        <h1 className="font-bold tracking-wide">Instagram</h1>
        <FaSignOutAlt onClick={signOut} />
      </nav>
      {sortedPosts.length ? (
        sortedPosts.map(
          (
            {
              username,
              caption,
              timestamp,
              url,
              photoURL,
              id,
              likes,
              UID,
              comments,
            },
            idx
          ) => {
            return (
              <div key={idx} className="mb-8">
                <div className="bg-grey-300 flex items-center text-xl p-3">
                  <div className="w-1/12 cursor-pointer">
                    <Link to={`/${username}`}>
                      <img
                        src={photoURL}
                        alt=""
                        className="rounded-full cursor-pointer"
                      />
                    </Link>
                  </div>
                  <div className="text-sm ml-4 font-bold">{username}</div>
                </div>
                <Link to={`/${username}/post/${id}`}>
                  <div>
                    <img src={url} alt={caption} className="mx-auto" />
                  </div>
                </Link>
                <Dislike UID={UID} id={id} likes={likes} username={username} />
                {caption !== "" && (
                  <p className="mt-2 ml-4 leading-tight">
                    <span className="font-bold mr-2">{username}</span>
                    {caption}
                  </p>
                )}

                {comments && comments.length !== 0 && (
                  <div className="w-full mt-2">
                    <Link
                      to={`/${username}/post/${id}/comments`}
                      className="ml-4 text-gray-500 text-sm"
                    >
                      View all {comments.length} comments
                    </Link>
                    <div className="flex items-center w-11/12 mx-auto">
                      <Link to={`/${comments[0].username}`}>
                        <div className="font-bold text-sm">
                          {comments[0].username}
                        </div>
                      </Link>
                      <div className="ml-2 leading-tight text-sm">
                        {comments[0].comment.substring(0, 45)}
                        {comments[0].comment.length > 45 && <span>...</span>}
                      </div>
                    </div>
                  </div>
                )}

                {last - 1 === idx ? (
                  <p className="text-xs text-gray-500 mt-4 ml-4 mb-20">
                    {new Date(timestamp.seconds * 1000).toDateString()}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-4 ml-4">
                    {new Date(timestamp.seconds * 1000).toDateString()}
                  </p>
                )}
              </div>
            );
          }
        )
      ) : (
        <div className="text-center mt-8 w-4/5 mx-auto">
          <h2 className="text-2xl">Welcome to Instagram</h2>
          <p className="text-sm text-gray-500">
            When you follow people you'll see the photos they post here.
          </p>
        </div>
      )}

      <NavBar />
    </>
  );
};

export default Feed;

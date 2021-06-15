import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import firebase from "../services/firebase-config";
import { Link, useParams } from "react-router-dom";

const DiscoverPeople = () => {
  const [users, setUsers] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    setUsers([]);
    const db = firebase.firestore();
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (doc.data().username !== username) {
            setUsers((prevState) => {
              return [...prevState, { ...doc.data() }];
            });
          }
        });
      });
  }, [username]);
  console.log(users);

  return (
    <>
      <TopBar show={"Discover People"} />
      <h1 className="font-bold ml-4 mt-2">Suggested</h1>
      <div>
        {users.map(({ photoURL, name, username }, idx) => {
          return (
            <div
              className="mx-2 flex justify-between items-center my-3"
              key={idx}
            >
              <Link to={`/${username}`}>
                <div className="flex">
                  <div className="w-3/12">
                    <img src={photoURL} alt={name} className="rounded-full" />
                  </div>
                  <div className="text-sm ml-2">
                    <div className="ml-2">{username}</div>
                    <div className="-mt-2 text-gray-400">{name}</div>
                  </div>
                </div>
              </Link>
              <button className="w-1/5 bg-blue-500 font-bold text-white rounded-sm">
                Follow
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DiscoverPeople;

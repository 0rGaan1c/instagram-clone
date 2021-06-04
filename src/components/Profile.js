import React from "react";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "../services/auth";
import { Link } from "react-router-dom";
// import firebase from "../services/firebase-config";
// import { useUser } from "../contexts/UserProvider";

const Profile = () => {
  return (
    <>
      <nav className="bg-gray-100 flex items-center text-xl justify-between p-2">
        <Link to="/">
          <FaHome className="text-2xl cursor-pointer" />
        </Link>
        <h1 className="font-bold tracking-wide">Hero</h1>
        <FaSignOutAlt onClick={signOut} className="text-2xl cursor-pointer" />
      </nav>
    </>
  );
};

export default Profile;

import React from "react";
import { useUser } from "../contexts/UserProvider";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "../services/auth";
import { Link } from "react-router-dom";

const Profile = () => {
  const {
    currentUser: { displayName },
  } = useUser();

  return (
    <>
      <nav className="bg-gray-100 flex items-center text-xl justify-between p-2">
        <Link to="/">
          <FaHome className="text-2xl cursor-pointer" />
        </Link>
        <h1 className="font-bold tracking-wide">{displayName}</h1>
        <FaSignOutAlt onClick={signOut} className="text-2xl cursor-pointer" />
      </nav>
    </>
  );
};

export default Profile;

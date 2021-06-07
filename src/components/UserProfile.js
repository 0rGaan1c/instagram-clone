import React from "react";
import { signOut } from "../services/auth";
import { FaSignOutAlt } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

const UserProfile = ({ userInfo }) => {
  return (
    <>
      <nav className="bg-gray-100 flex items-center text-xl justify-between p-2">
        <IoSettingsSharp />
        <h1>{userInfo.username}</h1>
        <FaSignOutAlt onClick={signOut} />
      </nav>
    </>
  );
};

export default UserProfile;

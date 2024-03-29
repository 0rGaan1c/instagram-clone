import React from "react";
import { signOut } from "../services/auth";
import { FaSignOutAlt } from "react-icons/fa";
import { AiFillCamera } from "react-icons/ai";
import { Link } from "react-router-dom";
import Posts from "./Posts";

const UserProfile = ({ userInfo }) => {
  return (
    <>
      <nav className="bg-gray-100 flex items-center text-xl justify-between p-2">
        <Link to={`/${userInfo.username}/upload`}>
          <AiFillCamera />
        </Link>
        <h1>{userInfo.username}</h1>
        <FaSignOutAlt onClick={signOut} className="cursor-pointer" />
      </nav>
      <div className="w-11/12 mx-auto mt-4 flex items-center">
        <div>
          <img src={userInfo.photoURL} alt="" className="rounded-full" />
        </div>
        <div className="w-9/12 ml-2">
          <h2 className="text-2xl text-center mb-2">{userInfo.username}</h2>
          <Link to={`/${userInfo.username}/edit`}>
            <div className="w-11/12 mx-auto border-2 border-gray-200 rounded-sm">
              <div className="text-center text-sm mb-1">
                {/* <Link to="/editprofile">Edit Profile</Link> */}
                Edit Profile
              </div>
            </div>
          </Link>
        </div>
      </div>
      <h3 className="w-11/12 ml-auto mt-4 font-sm font-bold">
        {userInfo.name}
      </h3>

      <Posts username={userInfo.username} />
    </>
  );
};

export default UserProfile;

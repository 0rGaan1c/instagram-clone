import React from "react";
import { signOut } from "../services/auth";
import { FaSignOutAlt } from "react-icons/fa";
import { AiFillCamera, AiOutlineCamera } from "react-icons/ai";
import { Link } from "react-router-dom";

const UserProfile = ({ userInfo }) => {
  return (
    <>
      <nav className="bg-gray-100 flex items-center text-xl justify-between p-2">
        <AiFillCamera />
        <h1>{userInfo.username}</h1>
        <FaSignOutAlt onClick={signOut} />
      </nav>
      <div className="w-11/12 mx-auto mt-4 flex items-center">
        <div>
          <img src={userInfo.photoURL} alt="" className="rounded-full" />
        </div>
        <div className="w-9/12 ml-2">
          <h2 className="text-2xl text-center mb-2">{userInfo.username}</h2>
          <div className="w-11/12 mx-auto border-2 border-gray-200 rounded-sm">
            <div className="text-center text-sm mb-1">
              {/* <Link to="/editprofile">Edit Profile</Link> */}
              <Link to={`/${userInfo.username}/edit`}>Edit Profile</Link>
            </div>
          </div>
        </div>
      </div>
      <h3 className="w-11/12 ml-auto mt-4 font-sm font-bold">
        {userInfo.name}
      </h3>

      <div className="border=gray-200 border-t-2 border-b-2 flex justify-between mt-6">
        <div className="p-4">
          <div className="font-bold text-center">0</div>
          <div className="text-gray-500">posts</div>
        </div>
        <div className="p-4">
          <div className="font-bold text-center">0</div>
          <div className="text-gray-500">followers</div>
        </div>
        <div className="p-4">
          <div className="font-bold text-center">0</div>
          <div className="text-gray-500">following</div>
        </div>
      </div>

      <div className="text-center w-5/6 mx-auto mt-10">
        <AiOutlineCamera className="text-6xl mx-auto" />
        <h3 className="text-4xl font-thin">Share Photos</h3>
        <p className="mt-4">
          When you share photos, they will appear on your profile.
        </p>
        <p className="text-blue-600">
          <Link to="/upload"> Share your first photo </Link>
        </p>
      </div>
    </>
  );
};

export default UserProfile;

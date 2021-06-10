import React from "react";

import TopBar from "./TopBar";

const ProtectedProfile = ({ userInfo }) => {
  return (
    <>
      <TopBar show={userInfo.username} />
      <div className="w-11/12 mx-auto mt-4 flex items-center">
        <div>
          <img src={userInfo.photoURL} alt="" className="rounded-full" />
        </div>
        <div className="w-9/12 ml-2">
          <h2 className="text-2xl text-center mb-2">{userInfo.username}</h2>
          <div className="w-11/12 mx-auto bg-blue-400 rounded-sm">
            <div className="text-center text-sm py-1 text-white font-bold">
              Follow
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
    </>
  );
};

export default ProtectedProfile;

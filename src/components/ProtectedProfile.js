import React from "react";
import Follow from "./Follow";
import Posts from "./Posts";
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
          {/* <div className="w-11/12 mx-auto bg-blue-400 rounded-sm"> */}
          {/* <div className="text-center text-sm py-1 text-white font-bold">
              Follow
            </div> */}
          <Follow username={userInfo.username} />
          {/* </div> */}
        </div>
      </div>
      <h3 className="w-11/12 ml-auto mt-4 font-sm font-bold">
        {userInfo.name}
      </h3>

      <Posts username={userInfo.username} />
    </>
  );
};

export default ProtectedProfile;

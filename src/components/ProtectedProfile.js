import React from "react";
import { HiChevronLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";

const ProtectedProfile = ({ userInfo }) => {
  const history = useHistory();

  console.log(userInfo);
  return (
    <>
      <nav className="bg-gray-100 text-xl p-2">
        <div
          className="flex items-center justify-between"
          style={{ width: "55%" }}
        >
          <HiChevronLeft onClick={() => history.goBack()} />
          <h1>{userInfo.username}</h1>
        </div>
      </nav>
      <div className="w-11/12 mx-auto mt-4 flex items-center">
        <div>
          <img src={userInfo.photoURL} alt="" className="rounded-full" />
        </div>
        <div className="w-9/12">
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
    </>
  );
};

export default ProtectedProfile;

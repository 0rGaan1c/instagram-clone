import React from "react";
import { HiChevronLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";

const ProtectedProfile = ({ userInfo }) => {
  const history = useHistory();

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
    </>
  );
};

export default ProtectedProfile;

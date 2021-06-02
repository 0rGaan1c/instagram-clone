import React from "react";
import { useUser } from "../contexts/UserProvider";

const Profile = () => {
  const { currentUser } = useUser();
  console.log(currentUser);

  return (
    <>
      <nav className="bg-gray-100 flex items-center text-xl justify-between p-2">
        {/* <FaHome className="text-2xl cursor-pointer" /> */}
        {/* <h1 className="font-bold tracking-wide">{displayName}</h1> */}
        {/* <div className="w-1/12 cursor-pointer">
          <Link to="/profile">
            <img
              src={currentUser.photoURL}
              alt=""
              className="rounded-full cursor-pointer"
            />
          </Link>
        </div> */}
      </nav>
    </>
  );
};

export default Profile;

import React from "react";
import NavBar from "./NavBar";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "../services/auth";

const Feed = () => {
  return (
    <>
      <nav className="bg-gray-100 flex items-center text-xl justify-between p-2">
        <h1 className="font-bold tracking-wide">Instagram</h1>
        <FaSignOutAlt onClick={signOut} />
      </nav>
      <div className="text-center mt-8 w-4/5 mx-auto">
        <h2 className="text-2xl">Welcome to Instagram</h2>
        <p className="text-sm text-gray-500">
          When you follow people you'll see the photos they post here.
        </p>
      </div>
      <NavBar />
    </>
  );
};

export default Feed;

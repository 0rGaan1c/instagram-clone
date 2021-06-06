import React from "react";
import NavBar from "./NavBar";

const Feed = () => {
  return (
    <>
      <NavBar />
      <div className="text-center mt-8 w-4/5 mx-auto">
        <h2 className="text-2xl">Welcome to Instagram</h2>
        <p className="text-sm text-gray-500">
          When you follow people you'll see the photos they post here.
        </p>
      </div>
    </>
  );
};

export default Feed;

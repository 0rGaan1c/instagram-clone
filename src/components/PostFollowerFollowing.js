import React from "react";

// naming files and variables are tough, you can't change my mind :|
const PostFollowerFollowing = ({ numberOfPosts }) => {
  return (
    <div className="border=gray-200 border-t-2 border-b-2 flex justify-between mt-6">
      <div className="p-4">
        <div className="font-bold text-center">{numberOfPosts}</div>
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
  );
};

export default PostFollowerFollowing;

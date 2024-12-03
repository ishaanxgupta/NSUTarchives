

import React, { useState } from 'react'

function Like_Button() {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(68); // Initial count can be dynamically fetched if needed

  // Toggle like and increment count once
  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikeCount((prevCount) => prevCount + 1);
    }
  };
  return (
    <div className="relative flex h-12 w-36 items-center rounded-lg bg-slate-800 shadow-md overflow-hidden border border-slate-700 cursor-pointer" onClick={handleLike}>
      <div className="flex w-3/4 h-full items-center justify-center space-x-2">
        <svg
          className={`h-7 w-7 transition-transform ${isLiked ? 'fill-red-500 scale-110' : 'fill-gray-500'}`}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
        <span className="text-white text-lg">Likes</span>
      </div>
      <div className="absolute right-0 w-1/4 h-full flex items-center justify-center border-l border-slate-600 transition-all duration-500 ease-out">
        <span className={`text-lg ${isLiked ? 'text-white' : 'text-gray-400'}`}>{likeCount}</span>
      </div>
    </div>
  );
}

export default Like_Button
import React, { useState } from "react";

const CustomSearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f10_1px,transparent_1px),linear-gradient(to_bottom,#0f0f10_1px,transparent_1px)] bg-[length:1rem_1rem] blur-sm z-[-1]" />

      {/* Glowing Input Container */}
      <div className="relative flex items-center justify-center p-4">
        <div className="absolute inset-0 rounded-xl blur-lg bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-20" />
        <div className="relative bg-black rounded-lg p-6 shadow-lg">
          {/* Input Field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-72 h-14 px-12 text-white bg-gray-900 border-none rounded-md focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Search Icon */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                <line x1="16.65" y1="16.65" x2="22" y2="22" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            {/* Filter Icon */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="relative w-10 h-10 bg-gradient-to-b from-gray-700 to-black rounded-md flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  width="24"
                  viewBox="4.8 4.56 14.832 15.408"
                  fill="none"
                  className="text-gray-400"
                >
                  <path
                    d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomSearchComponent;

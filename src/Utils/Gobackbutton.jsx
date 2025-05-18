import React from 'react';

const Gobackbutton = () => {
  return (
    <button className="cursor-pointer duration-200 hover:scale-125 active:scale-100 mt-1">
      <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 24 24" className="stroke-teal-700">
        <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M11 6L5 12M5 12L11 18M5 12H19" />
      </svg>
    </button>
  );
}

export default Gobackbutton;

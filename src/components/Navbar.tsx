import React from "react";

function Navbar() {
  return (
    <div className="w-full flex flex-col justify-center items-center mb-5 pt-5 z-10 sticky top-0">
      <div className="w-full h-20 bg-gradient-to-b from-blue-200 to-white absolute  z-10 top-0"></div>
      <div className="flex flex-row w-[90%] lg:w-[50%] bg-gray-50/30 backdrop-blur-sm  justify-between rounded-xl drop-shadow-xl p-3 border-2 border-blue-200 items-center z-20 ">
        <div className=" text-2xl bg-gradient-to-l from-blue-300 to-blue-500 bg-clip-text text-transparent">
          IssueLens
        </div>
        <div>Github</div>
      </div>
    </div>
  );
}

export default Navbar;

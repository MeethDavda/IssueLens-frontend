import React from "react";

function Navbar() {
  return (
    // <div className="w-full flex flex-col justify-center items-center mb-5 pt-5 z-10 relative top-0 ">
    //   <div className="w-full h-14 bg-gradient-to-b from-blue-200 to-white absolute z-10 top-0"></div>
    //   <div className="flex flex-row  w-[90%] lg:w-[50%] bg-gray-50/30 backdrop-blur-sm  justify-between rounded-xl drop-shadow-xl p-3 border-2 border-blue-200 items-center z-20 ">
    //     <div className=" text-2xl bg-gradient-to-l from-blue-300 to-blue-500 bg-clip-text text-transparent">
    //       IssueLens
    //     </div>
    //     <div className="cursor-pointer">
    //       <a
    //         href="https://github.com/MeethDavda/IssueLens-frontend"
    //         target="_blank"
    //       >
    //         Github
    //       </a>
    //     </div>
    //   </div>
    // </div>

    <div className="w-full sticky top-0 z-10">
      <div className="relative w-full flex justify-center items-center pt-5 mb-5">
        <div className="absolute inset-0 h-14 bg-gradient-to-b from-blue-200 to-white"></div>

        <div
          className="relative w-full max-w-3xl mx-4 
                    bg-gray-50/40 backdrop-blur-sm
                    border-2 border-blue-200 rounded-xl drop-shadow-xl
                    p-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="text-xl sm:text-2xl bg-gradient-to-l from-blue-300 to-blue-500 bg-clip-text text-transparent text-center sm:text-left">
            IssueLens
          </div>

          <div className="flex justify-center sm:justify-end">
            <a
              href="https://github.com/MeethDavda/IssueLens-frontend"
              target="_blank"
              className="underline underline-offset-4 hover:opacity-80 shrink-0"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

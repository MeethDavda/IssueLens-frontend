import Image from "next/image";
import React from "react";

function Navbar() {
  return (
    <div className="w-full sticky top-0 z-10">
      <div className="relative w-full flex justify-center items-center pt-5 mb-5">
        <div className="absolute inset-0 h-14 bg-gradient-to-b from-blue-200 to-white"></div>

        <div
          className="relative w-full max-w-3xl mx-4 
                    bg-gray-50/40 backdrop-blur-sm
                    border-2 border-blue-200 rounded-xl drop-shadow-xl
                    p-3 flex flex-row gap-2  content-center items-center justify-between"
        >
          <div className="flex flex-row text-xl sm:text-2xl bg-gradient-to-l from-blue-400 to-blue-800 bg-clip-text text-transparent text-center sm:text-left">
            <Image
              src="/issuelenslogo.png"
              alt="IssueLens Logo"
              width={28}
              height={28}
              className="shrink-0 h-12 w-12"
            />
            <div className="mt-2 ml-1">IssueLens</div>
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

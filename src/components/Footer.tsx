import React from "react";
import Image from "next/image";

function Footer() {
  return (
    <div className="w-full flex justify-center fixed bottom-0 py-3 bg-white/60 backdrop-blur-xs">
      <div className="flex flex-row items-center gap-2 text-sm font-light text-gray-600">
        <span>Powered by</span>
        <Image
          src="/appwritelogo.png"
          alt="Appwrite Logo"
          width={18}
          height={18}
          className="shrink-0"
        />
        <span className="font-medium text-gray-700">Appwrite</span>
      </div>
    </div>
  );
}

export default Footer;

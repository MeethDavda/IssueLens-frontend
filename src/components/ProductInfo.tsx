"use client";
import React, { useEffect, useState } from "react";
import { WordRotate } from "./ui/word-rotate";

function ProductInfo() {
  const [feature, setFeature] = useState(0);
  const now = new Date();

  useEffect(() => {
    const interval = setInterval(() => {
      setFeature((prev) => (prev + 1) % 3);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="mt-8 mx-5 flex justify-center items-center flex-col">
        <div className="text-xl lg:text-3xl ">
          Find fixes in{" "}
          <span className="bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
            GitHub issues
          </span>{" "}
          instantly.
        </div>
        <WordRotate
          className="mt-4 font-light text-xl text-blue-400"
          duration={1000}
          words={[
            "| No endless scrolling |",
            "| No noise |",
            "| Just the fix |",
          ]}
        />
        <div>{now.getSeconds()}</div>
        <div>{now.getMinutes()}</div>
      </div>
    </div>
  );
}

export default ProductInfo;

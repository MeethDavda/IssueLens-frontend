"use client";
import React, { useEffect, useState } from "react";
import { WordRotate } from "./ui/word-rotate";
import useGetTime from "@/utils/getTime";

function ProductInfo({ hours, minutes, queryLimit }) {
  // const hours = Math.floor(Number(timeDiff) / (1000 * 60 * 60));
  // const minutes = Math.floor(
  //   (Number(timeDiff) % (1000 * 60 * 60)) / (1000 * 60)
  // );

  return (
    <div>
      <div className="mt-8 mx-5 flex justify-center items-center flex-col">
        <div className="text-xl lg:text-3xl ">
          Find fixes in{" "}
          <span className="bg-linear-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
            GitHub issues
          </span>{" "}
          instantly.
        </div>
        <WordRotate
          className="mt-4 font-light text-xl text-green-500"
          duration={2000}
          words={["// No endless scrolling", "// No noise", "// Just the fix"]}
        />
        <div className="text-sm  text-gray-400">
          Daily limit resets in {hours}h {minutes}m
        </div>
        <div className="text-sm  text-gray-400">
          Remaining Queries: {queryLimit}
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;

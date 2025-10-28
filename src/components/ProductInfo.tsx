"use client";
import React, { useEffect, useState } from "react";
import { WordRotate } from "./ui/word-rotate";
import useGetTime from "@/utils/getTime";
import { span } from "motion/react-client";
import { Spinner } from "./ui/spinner";

function ProductInfo({ hours, minutes, queryLimit, fetchTime }) {
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
        <div className="text-sm  text-gray-400 flex flex-row gap-2 items-center">
          Daily limit resets in
          {fetchTime ? (
            <Spinner />
          ) : (
            <span>
              {hours}h {minutes}m
            </span>
          )}
        </div>
        <div className="text-sm  text-gray-400 flex flex-row gap-2 items-cente">
          Remaining Queries:
          {fetchTime ? <Spinner /> : <span>{queryLimit}</span>}
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;

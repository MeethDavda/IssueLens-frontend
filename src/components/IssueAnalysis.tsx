"use client";
import React, { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import axios from "axios";
import { toast } from "sonner";
import useGetTime from "@/utils/getTime";
import ProductInfo from "./ProductInfo";

function IssueAnalysis() {
  const [userError, setUserError] = useState("");
  const [response, setResponse] = useState<any>();
  const [activeTab, setActiveTab] = useState("analyse");
  const [analysing, setAnalysing] = useState(false);
  const [rateLimit, setRateLimit] = useState(false);
  const [queryLimit, setQueryLimit] = useState<number>();
  const { timeDiff, resetTime, remainingQueries } = useGetTime();
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("queries");
    if (stored !== null) {
      setQueryLimit(Number(stored));
    }
  }, []);

  function handleQueryLimit() {
    if (queryLimit) {
      if (queryLimit <= 0) {
        setRateLimit(true);
        setAnalysing(false);
      }
    }
    if (localStorage.getItem("queries")) {
      const newLimit = Number(localStorage.getItem("queries")) - 1;
      localStorage.setItem("queries", newLimit.toString());
      setQueryLimit(newLimit);
    }
  }

  function splitRagResponse(responseText: string) {
    const happenedMatch = responseText.match(
      /(?:^|\n)What happened in Appwrite\??[:\s]*([\s\S]*?)(?=\n+Fix\b|$)/i
    );
    const fixMatch = responseText.match(
      /(?:^|\n)Fix[:\s]*([\s\S]*?)(?=\n+###?\s*What to do|What to do|$)/i
    );
    const todoMatch = responseText.match(
      /(?:^|\n)(?:###?\s*)?What to do[:\s]*([\s\S]*)/i
    );

    // Extract parts if available
    const happened = happenedMatch ? happenedMatch[1].trim() : "";
    const fix = fixMatch ? fixMatch[1].trim() : "";
    const todo = todoMatch ? todoMatch[1].trim() : "";

    // If none of the sections exist, store as a generic response
    const partedResponse =
      !happened && !fix && !todo
        ? { genericResponse: responseText.trim() }
        : { happened, fix, todo };

    // Update your state
    setResponse(partedResponse);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleClick(e: any) {
    if (!analysing || rateLimit) {
      e.preventDefault();
      try {
        setAnalysing(true);
        const res = await axios.post(
          "https://issuelens-backend.onrender.com/analyseIssue",
          {
            userError,
            resetTime,
          }
        );

        // const res = await axios.post("http://localhost:8000/analyseIssue", {
        //   userError,
        //   resetTime,
        // });
        handleQueryLimit();
        setResponse(res.data.output);
        splitRagResponse(res.data.output);
        setAnalysing(false);
        setActiveTab("solution");
      } catch (error) {
        if (error?.status === 429) {
          toast.error("You have reached the limit !", {
            description: `Please try again after ${hours}h ${minutes}m`,
            position: "top-center",
          });
          setRateLimit(true);
          setAnalysing(false);
        }
        console.log(error);
      }
    }
  }
  return (
    <div className="flex flex-col content-center items-center my-5">
      <ProductInfo hours={hours} minutes={minutes} queryLimit={queryLimit} />
      <div className="mx-5 lg:w-[50%] flex jusify-center items-center flex-col">
        <div className="mt-7">
          <ToggleGroup
            type="single"
            variant="outline"
            size={"lg"}
            value={activeTab}
            onValueChange={(val) => {
              if (val) setActiveTab(val);
            }}
          >
            <ToggleGroupItem
              value="analyse"
              onClick={() => setActiveTab("analyse")}
              className={`p-5 ${
                activeTab === "analyse" ? "data-[state=on]:bg-blue-100" : null
              }  cursor-pointer`}
            >
              Analyse Issue
            </ToggleGroupItem>
            <ToggleGroupItem
              value="solution"
              onClick={() => setActiveTab("solution")}
              className={`p-5 ${
                activeTab === "solution" ? "data-[state=on]:bg-blue-100" : null
              }  cursor-pointer`}
            >
              Solution
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="h-auto  bg-gray-100 w-full rounded-xl my-5 drop-shadow-xl flex flex-col justify-between items-center">
          {activeTab === "analyse" && (
            <div className="w-[90%] my-5">
              Enter your stack trace or error message here:
              <textarea
                name="error"
                id="error"
                placeholder={`
                Example:
                TypeError: Cannot read property 'map' of undefined
                ReferenceError: document is not defined`}
                className="w-full bg-blue-50 text-sm border-2 border-blue-30 rounded-md mt-5 p-2 font-extralight text-gray-600 h-[200px] drop-shadow-md"
                onChange={(e) => {
                  setUserError(e.target.value);
                }}
              ></textarea>
              <div
                className={`w-full bg-blue-100 drop-shadow-md rounded-md p-3 mt-5 border-2 border-blue-30 flex justify-center items-center ${
                  analysing ? "cursor-not-allowed" : "cursor-pointer"
                } hover:p-5 hover:tracking-widest transition-all ease-in-out duration-200`}
                onClick={handleClick}
              >
                <div>{analysing ? "Analysing..." : "Analyse"}</div>
              </div>
            </div>
          )}
          {activeTab === "solution" && (
            <div className="w-[90%] my-5 flex flex-col gap-3 drop-shadow-xl">
              {response?.genericResponse ? (
                <pre className="prose bg-blue-50 border-2 border-blue-300 prose-blue w-full max-h-[250px] p-3 rounded-lg shadow overflow-auto">
                  <pre className="text-xs">{response?.genericResponse}</pre>
                </pre>
              ) : (
                <>
                  <div className="mt-2">What happened in Appwrite?</div>
                  {response ? (
                    <pre className="prose bg-blue-50 border-2 border-blue-300 prose-blue w-full max-h-[250px] p-3 rounded-lg shadow overflow-auto">
                      <pre className="text-xs">{response?.happened}</pre>
                    </pre>
                  ) : null}
                  <div className="mt-2">The Fix:</div>
                  {response ? (
                    <pre className="prose prose-blue w-full max-h-[250px]  bg-blue-50 border-2 border-blue-300 p-3 rounded-lg shadow overflow-auto">
                      <pre className="text-xs">{response?.fix}</pre>
                    </pre>
                  ) : null}
                  <div className="mt-2">What to do?</div>
                  {response ? (
                    <pre className="prose prose-blue w-full max-h-[250px]  bg-blue-50 border-2 border-blue-300 p-3 rounded-lg shadow overflow-auto">
                      <pre className="text-xs">{response?.todo}</pre>
                    </pre>
                  ) : null}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IssueAnalysis;

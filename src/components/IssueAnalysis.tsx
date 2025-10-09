"use client";
import React, { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import axios from "axios";

function IssueAnalysis() {
  const [userError, setUserError] = useState("");
  const [response, setResponse] = useState({});
  const [activeTab, setActiveTab] = useState("analyse");
  const [analysing, setAnalysing] = useState(false);

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

    const partedResponse = {
      happened: happenedMatch ? happenedMatch[1].trim() : "",
      fix: fixMatch ? fixMatch[1].trim() : "",
      todo: todoMatch ? todoMatch[1].trim() : "",
    };
    setResponse(partedResponse);
    return {
      happened: happenedMatch ? happenedMatch[1].trim() : "",
      fix: fixMatch ? fixMatch[1].trim() : "",
      todo: todoMatch ? todoMatch[1].trim() : "",
    };
  }

  async function handleClick(e) {
    if (!analysing) {
      e.preventDefault();
      try {
        setAnalysing(true);
        // const res = await axios.post(
        //   "https://issuelens-backend.onrender.com/analyseIssue",
        //   {
        //     userError,
        //   }
        // );
        const res = await axios.post("http://localhost:8000/analyseIssue", {
          userError,
        });
        console.log(res.data.output);
        setResponse(res.data.output);
        splitRagResponse(res.data.output);
        setAnalysing(false);
        setActiveTab("solution");
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className="flex flex-col content-center items-center my-5">
      <div className="mx-5 lg:w-[50%] flex jusify-center items-center flex-col">
        <div className="mt-7">
          <ToggleGroup type="single" variant="outline" size={"lg"}>
            <ToggleGroupItem
              value="analyse"
              onClick={() => setActiveTab("analyse")}
            >
              Analyse Issue
            </ToggleGroupItem>
            <ToggleGroupItem
              value="solution"
              onClick={() => setActiveTab("solution")}
            >
              Solution
            </ToggleGroupItem>
            <ToggleGroupItem value="history">Query History</ToggleGroupItem>
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
                className="w-full bg-blue-50 border-2 border-blue-300 rounded-md mt-5 font-extralight text-gray-600 h-[200px] p-2"
                onChange={(e) => {
                  setUserError(e.target.value);
                }}
              ></textarea>
              <div
                className={`w-full bg-blue-100 rounded-md p-3 mt-5 border-2 border-blue-300 flex justify-center items-center ${
                  analysing ? "cursor-not-allowed" : "cursor-pointer"
                } hover:p-5 hover:tracking-widest transition-all ease-in-out duration-200`}
                onClick={handleClick}
              >
                <div>{analysing ? "Analysing..." : "Analyse"}</div>
              </div>
            </div>
          )}
          {activeTab === "solution" && (
            <div className="w-[90%] my-5 flex flex-col gap-3">
              <pre className="prose bg-blue-50 border-2 border-blue-300 prose-blue w-full max-h-[250px] p-3 rounded-lg shadow overflow-auto">
                {response ? <pre className="text-xs">{response}</pre> : null}
              </pre>
              <div className="mt-2">What happened in Appwrite?</div>
              <pre className="prose bg-blue-50 border-2 border-blue-300 prose-blue w-full max-h-[250px] p-3 rounded-lg shadow overflow-auto">
                {response ? (
                  <pre className="text-xs">{response?.happened}</pre>
                ) : null}
              </pre>
              <div className="mt-2">The Fix:</div>
              <pre className="prose prose-blue w-full max-h-[250px]  bg-blue-50 border-2 border-blue-300 p-3 rounded-lg shadow overflow-auto">
                {response ? (
                  <pre className="text-xs">{response?.fix}</pre>
                ) : null}
              </pre>
              <div className="mt-2">What to do?</div>
              <pre className="prose prose-blue w-full max-h-[250px]  bg-blue-50 border-2 border-blue-300 p-3 rounded-lg shadow overflow-auto">
                {response ? (
                  <pre className="text-xs">{response?.todo}</pre>
                ) : null}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IssueAnalysis;

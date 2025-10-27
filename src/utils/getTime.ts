"use client";
import { useEffect, useState } from "react";
import axios from "axios";

function useGetTime() {
  const [timeDiff, setTimeDiff] = useState<number | null>();
  const [resetTime, setResetTime] = useState<number>();
  const [remainingQueries, setRemainingQueries] = useState();
  useEffect(() => {
    async function getTime() {
      const now = new Date();
      try {
        const response = await axios.get(
          "https://issuelens-backend.onrender.com/getTimeDiff"
          // "http://localhost:8000/getTimeDiff"
        );
        setTimeDiff(response.data.resBody.resetTime - now.getTime());
        setResetTime(response.data.resBody.resetTime);
        setRemainingQueries(response.data.resBody.remaining_queries);
      } catch (error) {
        console.log(error);
      }
    }
    getTime();
  }, []);
  return { timeDiff, resetTime, remainingQueries };
}

export default useGetTime;

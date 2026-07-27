"use client";

import { useEffect, useState } from "react";

export interface ElapsedTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getElapsed(startDate: string): ElapsedTime {
  const totalSeconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(startDate).getTime()) / 1000),
  );

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function useElapsedTime(startDate: string): ElapsedTime {
  const [elapsed, setElapsed] = useState(() => getElapsed(startDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(getElapsed(startDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return elapsed;
}

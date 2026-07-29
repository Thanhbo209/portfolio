"use client";

import { useEffect, useState } from "react";

export interface ElapsedTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ZERO_ELAPSED: ElapsedTime = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

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
  // Starts at a static zero rather than computing the real value during
  // render: this component is server-rendered once at request time and
  // then re-rendered client-side during hydration a moment later — since
  // both renders would call Date.now(), the seconds (sometimes minutes)
  // almost always differ between them, which React reports as a hydration
  // mismatch. The interval below (client-only, post-hydration) supplies
  // the real value within one second, guaranteeing the server HTML and
  // the client's first paint stay identical in the meantime.
  const [elapsed, setElapsed] = useState<ElapsedTime>(ZERO_ELAPSED);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(getElapsed(startDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return elapsed;
}

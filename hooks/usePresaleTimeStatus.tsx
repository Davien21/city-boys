import React, { useEffect, useState } from "react";

type PresaleTimeStatus = "not-started" | "started" | "ended";

export function usePresaleTimeStatus(timeInMs: number): PresaleTimeStatus {
  const [status, setStatus] = useState<PresaleTimeStatus>("not-started");

  useEffect(() => {
    const updateStatus = () => {
      const now = Date.now();
      if (timeInMs === 0) setStatus("not-started");
      else if (timeInMs > now) setStatus("started");
      else setStatus("ended");
    };

    updateStatus();

    const interval = setInterval(updateStatus, 1000);

    return () => clearInterval(interval);
  }, [timeInMs]);

  return status;
}

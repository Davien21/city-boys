import React, { useEffect, useState } from 'react'

export function useNow() {
  const [nowTime, setnowTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setnowTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return nowTime;
}

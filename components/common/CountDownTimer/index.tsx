import { useState, useEffect, useRef } from "react";
import styles from "./countdown.module.css";

export function CountDownTimer({ endTime }: { endTime: number }) {
  const dayRef = useRef<HTMLDivElement | null>(null);
  const hourRef = useRef<HTMLDivElement | null>(null);
  const minuteRef = useRef<HTMLDivElement | null>(null);
  const secondRef = useRef<HTMLDivElement | null>(null);
  const [hasExpired, setHasExpired] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const setTimeLeft = () => {
      const currentTime = new Date().getTime();
      if (endTime < currentTime) {
        setHasExpired(true);
        return;
      } else {
        setHasExpired(false);
      }

      let difference = Math.abs(endTime - currentTime) / 1000;

      const days = Math.floor(difference / 86400);
      difference -= days * 86400;

      const hours = Math.floor(difference / 3600) % 24;
      difference -= hours * 3600;

      const minutes = Math.floor(difference / 60) % 60;
      difference -= minutes * 60;

      const seconds = Math.round(difference % 60);

      const timeDetails = {
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      };

      if (dayRef.current) dayRef.current.innerText = timeDetails.days;
      if (hourRef.current) hourRef.current.innerText = timeDetails.hours;
      if (minuteRef.current) minuteRef.current.innerText = timeDetails.minutes;
      if (secondRef.current) secondRef.current.innerText = timeDetails.seconds;
    };

    setTimeLeft();
    interval = setInterval(setTimeLeft, 1000);
    if (hasExpired && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [endTime, hasExpired]);

  return (
    <div className={styles["container"]}>
      <div className="flex gap-x-2 ">
        <div className="flex gap-x-1 w-[36px] justify-end">
          <div className="flex">
            <div ref={dayRef}>00</div>
            <span>D</span>
          </div>
          <span>:</span>
        </div>
        <div className="flex gap-x-1 w-[36px] justify-end">
          <div className="flex">
            <div ref={hourRef}>00</div>
            <span>H</span>
          </div>
          <span>:</span>
        </div>
        <div className="flex gap-x-1 w-[36px] justify-end">
          <div className="flex">
            <div ref={minuteRef}>00</div>
            <span>M</span>
          </div>
          <span>:</span>
        </div>
        <div className="flex gap-x-1 w-[36px] justify-end ml-[-10px]">
          <div className="flex">
            <div ref={secondRef}>00</div>
            <span>S</span>
          </div>
        </div>
      </div>
    </div>
  );
}

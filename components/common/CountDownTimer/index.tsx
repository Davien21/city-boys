import { useState, useEffect, useRef } from "react";
import styles from "./countdown.module.css";

export function CountDownTimer({ startTime }: { startTime: number }) {
  const dayRef = useRef<HTMLDivElement | null>(null);
  const hourRef = useRef<HTMLDivElement | null>(null);
  const minuteRef = useRef<HTMLDivElement | null>(null);
  const secondRef = useRef<HTMLDivElement | null>(null);
  const [hasExpired, setHasExpired] = useState(false);
  const venueTimeOffset = 43200;
  const timezoneOffset = new Date().getTimezoneOffset() * 60 + venueTimeOffset;
  const now = new Date().getTime() + timezoneOffset;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (startTime < now) {
      // If the start time has already passed, mark as expired
      setHasExpired(true);
    } else {
      const setTimeLeft = () => {
        const currentTime = new Date().getTime();
        if (startTime < currentTime) setHasExpired(true);
        let difference = Math.abs(startTime - currentTime) / 1000;

        const days = Math.floor(difference / 86400);
        difference -= days * 86400;

        const hours = Math.floor(difference / 3600) % 24;
        difference -= hours * 3600;

        const minutes = Math.floor(difference / 60) % 60;
        difference -= minutes * 60;

        const seconds = Math.round(difference % 60);

        const timeDetails = {
          days,
          hours: hours.toString().padStart(2, "0"),
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0"),
        };

        if (dayRef.current)
          dayRef.current.innerText = timeDetails.days.toString();
        if (hourRef.current) hourRef.current.innerText = timeDetails.hours;
        if (minuteRef.current)
          minuteRef.current.innerText = timeDetails.minutes;
        if (secondRef.current)
          secondRef.current.innerText = timeDetails.seconds;
      };
      interval = setInterval(() => {
        setTimeLeft();
      }, 1000);
    }
    if (hasExpired && interval) {
      clearInterval(interval);
    }
  }, [hasExpired, now, startTime, timezoneOffset]);

  return (
    <div className={styles["container"]}>
      <div className="grid grid-cols-4">
        <div className="flex gap-x-1 ">
          <div className="flex">
            <div ref={dayRef}>00</div>
            <span>D</span>
          </div>
          <span>:</span>
        </div>
        <div className="flex gap-x-1 ">
          <div className="flex">
            <div ref={hourRef}>00</div>
            <span>H</span>
          </div>
          <span>:</span>
        </div>
        <div className="flex gap-x-1 ">
          <div className="flex">
            <div ref={minuteRef}>00</div>
            <span>M</span>
          </div>
          <span>:</span>
        </div>
        <div className="flex gap-x-1 pl-1">
          <div className="flex">
            <div ref={secondRef}>00</div>
            <span>S</span>
          </div>
        </div>
      </div>
    </div>
  );
}

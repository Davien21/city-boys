import React from "react";
import styles from "./progress-bar.module.scss";

export function ProgressBar({ level }: { level: number }) {
  return (
    <div className={`${styles["container"]} `}>
      <div style={{ width: `${level}%` }}></div>
    </div>
  );
}

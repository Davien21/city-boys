import React from "react";
import Tippy from "@tippyjs/react";
import styles from "./tooltip.module.scss";
import { TooltipIcon } from "assets/images";

export function Tooltip({
  children,
  className,
  content,
}: {
  children?: React.ReactElement;
  className?: string;
  content: string | React.ReactNode;
}) {
  let containerClass = `${styles["container"]} flex gap-x-2`;
  if (className) containerClass += ` ${className}`;
  return (
    <div className={containerClass}>
      {children}
      <Tippy
        placement="top"
        content={content}
        className={`${styles["tooltip"]}`}
        trigger="click"
      >
        <span className="cursor-pointer">
          <TooltipIcon />
        </span>
      </Tippy>
    </div>
  );
}

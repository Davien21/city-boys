import React, { useState, useRef, useEffect } from "react";
import styles from "./accordion.module.scss";

interface Props {
  header: string;
  children: React.ReactNode;
  isDefaultOpen?: boolean;
}

export function Accordion({ header, children, isDefaultOpen }: Props) {
  const [isOpen, setIsOpen] = useState(isDefaultOpen || false);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isDefaultOpen) setIsOpen(isDefaultOpen);
  }, [isDefaultOpen]);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) return setContentHeight(contentRef.current.scrollHeight);
      setTimeout(() => {
        setContentHeight(0);
      }, 0);
    }
  }, [isOpen]);

  let containerClass = `${styles["container"]} `;
  if (isOpen) containerClass += `${styles["open"]} `;

  const maxHeight = contentHeight !== null ? contentHeight + "px" : "";

  return (
    <div className={containerClass}>
      <div
        className={`${styles["header"]} text-xl text-red-4 flex justify-between items-center`}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
      >
        {header}
        <div className="flex gap-x-3 text-3xl ">
          <div className={`${styles["arrow-icon"]} text-3xl text-white`}>
            {isOpen ? "-" : "+"}
          </div>
        </div>
      </div>
      <div
        className={`${styles["content"]}`}
        style={{ maxHeight }}
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
}

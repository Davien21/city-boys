import React, { useEffect, useRef, useState } from "react";
import styles from "./sidemenu.module.css";

export default function SideMenu({
  isSideBarOpen,
  setisSideBarOpen,
}: {
  isSideBarOpen: boolean;
  setisSideBarOpen: (isSideBarOpen: boolean) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerClass, setContainerClass] = useState(
    `${styles["container"]}`
  );

  const closeSidebar = () => {
    setisSideBarOpen(false);
  };

  useEffect(() => {
    if (containerRef.current !== null) {
      document.body.style.overflow = isSideBarOpen ? "hidden" : "auto";
      if (isSideBarOpen && !containerClass.includes(styles["active"])) {
        containerRef.current.style.display = "flex";
        setTimeout(() => {
          setContainerClass((value) => (value += ` ${styles["active"]} pb-20`));
        }, 50);
      }
      if (!isSideBarOpen) {
        document.body.style.overflow = "auto";
        setContainerClass(`${styles["container"]} pb-20`);
        setTimeout(() => {
          if (containerRef.current !== null) {
            containerRef.current.style.display = "none";
          }
        }, 400);
      }
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [containerClass, isSideBarOpen, setisSideBarOpen]);

  return (
    <div ref={containerRef} className={containerClass} onClick={closeSidebar}>
      <div
        className={`${styles["modal-body"]} p-8 lg:p-16 `}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-white">Hello</span>
      </div>
    </div>
  );
}

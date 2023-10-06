import { motion } from "framer-motion";
import { Menu, CloseButton } from "components";

import { useRef } from "react";
import styles from "./side-nav.module.css";

const slideIn = {
  right: "0px",
  transition: { duration: 0.3 },
};

const slideOut = {
  right: "-300px",
  transition: { duration: 0.3 },
};

const handleAnimationStart = (ref, isOpen) => {
  if (isOpen) ref.current.style.display = "block";
};

const handleAnimationEnd = (ref, isOpen) => {
  if (!isOpen) ref.current.style.display = "none";
};

function SideBar({ isOpen, onCloseSideBar }) {
  const sidebarRef = useRef();
  return (
    <motion.div
      initial={slideOut}
      animate={isOpen ? slideIn : slideOut}
      className={`${styles["side-nav"]}`}
      ref={sidebarRef}
      onAnimationComplete={() => handleAnimationEnd(sidebarRef, isOpen)}
      onAnimationStart={() => handleAnimationStart(sidebarRef, isOpen)}
    >
      <div className="flex items-center justify-between px-4 py-3 my-2 top-[25px!important] right-[15px!important] relative">
        <CloseButton toggle={onCloseSideBar} />
      </div>
      <Menu />
    </motion.div>
  );
}

export default SideBar;

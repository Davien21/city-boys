import { motion, MotionStyle } from "framer-motion";
import { RefObject, ReactNode, useEffect, useRef } from "react";

const style: MotionStyle = {
  height: "100vh",
  width: "100%",
  backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9))",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 10,
};

const fadeIn = { opacity: 1, transition: { duration: 0.5 }, display: "block" };
const fadeOut = {
  opacity: 0,
  transition: { duration: 0.5 },
  transitionEnd: {
    display: "none",
  },
};

const Overlay = ({
  children,
  isOpen,
  ...rest
}: {
  children: ReactNode;
  isOpen: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isOpen ? fadeIn : fadeOut}
      style={style}
      {...rest}
    ></motion.div>
  );
};

export { Overlay };

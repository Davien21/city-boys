import React, { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { ModalParentVariants } from "animations";

import { useLockScroll, useMediaQuery, useModal } from "hooks";

import styles from "./modal.module.scss";
import { useIsClient } from "usehooks-ts";

type ModalType = "default" | "dark";

export function Modal({
  isOpen,
  closeOnOutsideClick = true,
  closeOnOutClickIfOnMobile = false,
  setIsOpen,
  children,
  type = "default",
}: {
  closeOnOutsideClick?: boolean;
  closeOnOutClickIfOnMobile?: boolean;
  isOpen: boolean;
  setIsOpen: Function;
  children: React.ReactNode;
  type?: ModalType;
}) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const modalRef = useRef<HTMLDivElement>(null);
  const closeModal = () => {
    if (isMobile && closeOnOutClickIfOnMobile) {
      return setIsOpen(false);
    }
    if (!closeOnOutsideClick) return;
    setIsOpen(false);
  };

  useModal(isOpen, modalRef, closeModal);

  useLockScroll(isOpen);
  const isClient = useIsClient();

  let overlayClass = `${styles["container"]} ${styles[type]}`;

  return (
    <>
      {isClient && (
        <motion.div
          initial={{ opacity: 0, display: "none" }}
          animate={isOpen ? "enter" : "exit"}
          variants={ModalParentVariants}
          exit={{ opacity: 0, transition: { when: "afterChildren" } }}
          className={overlayClass}
          onClick={closeModal}
        >
          <div className="container h-full flex items-center justify-center">
            <motion.div
              initial={{ y: "-100%" }}
              animate={isOpen ? { y: `calc(-25px)` } : { y: "-100%" }}
              exit={{ y: "-100%" }}
              ref={modalRef}
              className={`${styles["modal-body"]}`}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}

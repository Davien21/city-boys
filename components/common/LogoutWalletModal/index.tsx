import React, { useEffect, useRef, useState } from "react";
import styles from "./logout-wallet-modal.module.scss";
import { ModalParentVariants } from "animations";
import { useLockScroll, useModal } from "hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  CopyIcon,
  XIcon,
  eternlLogo,
  laceLogo,
  namiLogo,
  typhoonLogo,
  vesprLogo,
} from "assets/images";
import toast from "services/toastService";
import { useWalletStore } from "store";
import { lucid, resetLucid } from "utils/lucidUtils";
import { Button } from "../Button";

type WalletType = "nami" | "eternl" | "vespr" | "lace" | "typhoon";

export function LogoutWalletModal() {
  const { address, setAddress, isLogoutModalOpen, setIsLogoutModalOpen } =
    useWalletStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeModal = () => {
    setIsLogoutModalOpen(false);
  };

  useModal(isLogoutModalOpen, modalRef, closeModal);

  useLockScroll(isLogoutModalOpen);

  let overlayClass = `${styles["container"]} `;
  const shortenedAddress = address?.slice(0, 6) + "..." + address?.slice(-4);
  const disconnectWallet = async () => {
    try {
      if (typeof window !== "undefined") {
        console.log(window.cardano);
        setAddress("");
        setIsLogoutModalOpen(false);
        await resetLucid();
      }
    } catch (error) {
      toast.error("Error disconnecting wallet");
      return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, display: "none" }}
      animate={isLogoutModalOpen ? "enter" : "exit"}
      variants={ModalParentVariants}
      exit={{ opacity: 0, transition: { when: "afterChildren" } }}
      className={overlayClass}
      onClick={closeModal}
    >
      <div className="container h-full flex items-center justify-center">
        <motion.div
          ref={modalRef}
          className={`${styles["modal-body"]} `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={``}>
            <div className={`flex justify-end ${styles["close-icon"]}`}>
              <button onClick={() => setIsLogoutModalOpen(false)}>
                <XIcon />
              </button>
            </div>
            <div className={`flex justify-center mb-8 `}>
              <div
                className={`flex items-center gap-x-3 ${styles["address-box"]}`}
              >
                {shortenedAddress}
                <span className={`${styles["copy-icon"]}`}>
                  <CopyIcon />
                </span>
              </div>
            </div>
            <Button form="tertiary" onClick={disconnectWallet}>
              Logout
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

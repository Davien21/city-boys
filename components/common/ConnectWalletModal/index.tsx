import React, { useRef, useState } from "react";
import styles from "./connect-wallet-modal.module.scss";
import { ModalParentVariants } from "animations";
import { useLockScroll, useModal } from "hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  XIcon,
  eternlLogo,
  laceLogo,
  namiLogo,
  typhoonLogo,
  vesprLogo,
} from "assets/images";
import toast from "services/toastService";
import { useWalletStore } from "store";
import { lucid } from "utils/lucidUtils";

type WalletType = "nami" | "eternl" | "vespr" | "lace" | "typhoon";

export function ConnectWalletModal() {
  const { setAddress, isWalletModalOpen, setIsWalletModalOpen } =
    useWalletStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeModal = () => {
    setIsWalletModalOpen(false);
  };

  useModal(isWalletModalOpen, modalRef, closeModal);

  useLockScroll(isWalletModalOpen);

  let overlayClass = `${styles["container"]} `;

  const isWalletAvailable = (id: WalletType) => {
    if (typeof window !== 'undefined') {
      return window.cardano && window.cardano[id];
    }
    return true;
  };

  const connectWallet = async (id: WalletType) => {
    try {
      if (typeof window !== 'undefined') {
        let address = "";
        const api = await window.cardano[id]?.enable();
        lucid.selectWallet(api);
        address = await lucid.wallet.address();
        toast.success("Wallet connected successfully"); // show success toast
        setAddress(address); // set address in store
        setIsWalletModalOpen(false); // close modal
        return address;
      }
    } catch (error) {
      toast.error("Error connecting to wallet");
      return null;
    }
  };

  return (
    <div className={`${styles["con tainer"]}`}>
      <motion.div
        initial={{ opacity: 0, display: "none" }}
        animate={isWalletModalOpen ? "enter" : "exit"}
        variants={ModalParentVariants}
        exit={{ opacity: 0, transition: { when: "afterChildren" } }}
        className={overlayClass}
        onClick={closeModal}
      >
        <div className="container h-full flex items-center justify-end">
          <motion.div
            ref={modalRef}
            className={`${styles["modal-body"]} `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={``}>
              <div className={`flex justify-end ${styles["close-icon"]}`}>
                <button
                  onClick={() => {
                    setIsWalletModalOpen(false);
                  }}
                >
                  <XIcon />
                </button>
              </div>
              <h5 className="text-3xl font-bold mb-10">Connect Wallet</h5>
              <p className="pb-4 ">
                By connecting your wallet, you agree to the Terms & Conditions
                and Privacy Policy
              </p>
              <div className={`flex flex-col gap-3 mt-4 ${styles["wallets"]}`}>
                <button
                  className="gradient-border text-left"
                  onClick={() => connectWallet("nami")}
                  disabled={!isWalletAvailable("nami")}
                >
                  <div className="flex items-center gap-x-6 px-8 py-6">
                    <Image
                      quality={100}
                      alt=""
                      src={namiLogo}
                      width={40}
                      height={41}
                    />
                    <div className="flex flex-col">
                      <p>Nami Wallet</p>
                      {isWalletAvailable("eternl") ? (
                        <p className="text-grey-3 text-xs">
                          Connect to your Nami wallet on your browser extension
                        </p>
                      ) : (
                        <a
                          href=""
                          target="_blank"
                          className="text-xs text-red-3"
                        >
                          Not supported, click to install Nami Wallet
                        </a>
                      )}
                    </div>
                  </div>
                </button>
                <button
                  className="gradient-border text-left"
                  onClick={() => connectWallet("eternl")}
                  disabled={!isWalletAvailable("eternl")}
                >
                  <div className="flex items-center gap-x-6 px-8 py-6">
                    <Image
                      quality={100}
                      alt=""
                      src={eternlLogo}
                      width={40}
                      height={40}
                    />
                    <div className="flex flex-col">
                      <p>Eternl Wallet</p>
                      {isWalletAvailable("eternl") ? (
                        <p className="text-grey-3 text-xs">
                          Connect to your Eternl wallet on your browser
                          extension
                        </p>
                      ) : (
                        <a
                          href=""
                          target="_blank"
                          className="text-xs text-red-3"
                        >
                          Not supported, click to install Eternl Wallet
                        </a>
                      )}
                    </div>
                  </div>
                </button>
                <button
                  className="gradient-border text-left"
                  onClick={() => connectWallet("vespr")}
                  disabled={!isWalletAvailable("vespr")}
                >
                  <div className="flex items-center gap-x-6 px-8 py-6">
                    <Image
                      quality={100}
                      alt=""
                      src={vesprLogo}
                      width={40}
                      height={40}
                    />
                    <div className="flex flex-col">
                      <p>Vespr Wallet</p>
                      {isWalletAvailable("vespr") ? (
                        <p className="text-grey-3 text-xs">
                          Connect to your Vespr wallet on your browser extension
                        </p>
                      ) : (
                        <a
                          href=""
                          target="_blank"
                          className="text-xs text-red-3"
                        >
                          Not supported, click to install Vespr Wallet
                        </a>
                      )}
                    </div>
                  </div>
                </button>
                <button
                  className="gradient-border text-left"
                  onClick={() => connectWallet("lace")}
                  disabled={!isWalletAvailable("lace")}
                >
                  <div className="flex items-center gap-x-6 px-8 py-6">
                    <Image
                      quality={100}
                      alt=""
                      src={laceLogo}
                      width={40}
                      height={40}
                    />
                    <div className="flex flex-col">
                      <p>Lace Wallet</p>
                      {isWalletAvailable("lace") ? (
                        <p className="text-grey-3 text-xs">
                          Connect to your Lace wallet on your browser extension
                        </p>
                      ) : (
                        <a
                          href=""
                          target="_blank"
                          className="text-xs text-red-3"
                        >
                          Not supported, click to install Lace Wallet
                        </a>
                      )}
                    </div>
                  </div>
                </button>
                <button
                  className="gradient-border text-left"
                  onClick={() => connectWallet("typhoon")}
                  disabled={!isWalletAvailable("typhoon")}
                >
                  <div className="flex items-center gap-x-6 px-8 py-6">
                    <Image
                      quality={100}
                      alt=""
                      src={typhoonLogo}
                      width={40}
                      height={29}
                    />
                    <div className="flex flex-col">
                      <p>Typhoon Wallet</p>
                      {isWalletAvailable("typhoon") ? (
                        <p className="text-grey-3 text-xs">
                          Connect to your Typhoon wallet on your browser
                          extension
                        </p>
                      ) : (
                        <a
                          href=""
                          target="_blank"
                          className="text-xs text-red-3"
                        >
                          Not supported, click to install Typhoon Wallet
                        </a>
                      )}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

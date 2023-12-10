import React, { useState } from "react";
import styles from "./connect-button.module.scss";
import { Button, ConnectWalletModal } from "components";
import { useWalletStore } from "store";

export function ConnectButton({ text = "CONNECT WALLET" }: { text?: string }) {
  const { address, setIsWalletModalOpen } = useWalletStore();

  let buttonClass = `${styles["connect-button"]} `;
  if (address) buttonClass += `${styles["connected"]}`;
  const shortenedAddress = address?.slice(0, 6) + "..." + address?.slice(-4);
  return (
    <div className={`${styles["container"]}`}>
      <button
        className={buttonClass}
        onClick={() => setIsWalletModalOpen(true)}
      >
        <span>{address ? shortenedAddress : text}</span>
      </button>
    </div>
  );
}

import React, { useState } from "react";
import styles from "./connect-button.module.scss";
import { Button, ConnectWalletModal } from "components";
import { useAddressStore } from "store";

export function ConnectButton() {
  const [isOpen, setisOpen] = useState(false);
  const { address } = useAddressStore();

  let buttonClass = `${styles["connect-button"]} `;
  if (address) buttonClass += `${styles["connected"]}`;
  const shortenedAddress = address?.slice(0, 6) + "..." + address?.slice(-4);
  return (
    <div className={`${styles["container"]}`}>
      <ConnectWalletModal isOpen={isOpen} setisOpen={setisOpen} />

      <button
        className={buttonClass}
        onClick={() => setisOpen(true)}
        title={address ? address : "CONNECT WALLET"}
      >
        <span>{address ? shortenedAddress : "CONNECT WALLET"}</span>
      </button>
    </div>
  );
}

import React, { useState } from "react";
import styles from "./connect-button.module.scss";
import { Button, ConnectWalletModal } from "components";
import { useAddressStore } from "store";

export function ConnectButton() {
  const [isOpen, setisOpen] = useState(false);
  const { address } = useAddressStore();

  let buttonClass = `${styles["connect-button"]} `;
  if (address) buttonClass += `${styles["connected"]}`;

  return (
    <div className={`${styles["container"]}`}>
      <ConnectWalletModal isOpen={isOpen} setisOpen={setisOpen} />

      <button className={buttonClass} onClick={() => setisOpen(true)}>
        {address ? address : "CONNECT WALLET"}
      </button>
    </div>
  );
}

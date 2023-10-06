import { CountDownTimer, CoinSelect, ProgressBar } from "components";
import React from "react";

import styles from "./countdown-box.module.scss";

export function CountDownBox() {
  const dateInMs = new Date("2023-10-17").getTime();

  return (
    <div className={`${styles["container"]}`}>
      <div className={`${styles["countdown-container"]} `}>
        <div className="flex flex-wrap sm:flex-nowrap justify-center text-center my-7 gap-x-3">
          <span>Presale Ends In - </span>
          <CountDownTimer startTime={dateInMs} />
        </div>
        <div className={`${styles["token-details"]}`}>
          <h2 className="mb-5 text-left">Buy $CTB before presale ends</h2>
          <hr className="bg-red-2 mb-5" />
          <div className="flex justify-between mb-4">
            <div className={`${styles["stats"]}`}>
              <span className="block mb-1 font-secondary">CTB Sold</span>
              <span className="block text-grey-1">243,573 CTB</span>
            </div>
            <div className={`${styles["stats"]}`}>
              <span className="block mb-1 font-secondary">Total Raised</span>
              <span className="block text-grey-1">$1,243,573</span>
            </div>
          </div>
          <ProgressBar level={30} />
          <div className={`mt-5 flex gap-x-3 ${styles["price-container"]} `}>
            <div></div>
            <div className="relative top-[15px] flex gap-x-5 items-center flex-wrap justify-center">
              <span>Token Price:</span>
              <span className="font-bold">$0.0007 - 1 CTB</span>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div className={`${styles["purchase-box"]} `}>
        <div className="flex gap-x-3 mb-2">
          <span className="text-grey-2">USDT Balance:</span>
          <span className="text-grey-2 font-bold">$215.235</span>
        </div>
        <div className={`${styles["pay-input-box"]} mb-[10px] `}>
          <div className="flex items-center justify-between ">
            <div>
              <span className="block text-sm font-light mb-1 text-grey-3">
                YOU PAY
              </span>
              <input type="tel" placeholder="0.00" />
            </div>
            <div className="flex items-center gap-x-3">
              <span className={`text-grey-2 ${styles["max-text"]}`}>Max.</span>
              <CoinSelect onSelect={() => {}} />
            </div>
          </div>
        </div>
        <div className={`${styles["receive-input-box"]}`}>
          <div className="flex items-center justify-between ">
            <div>
              <span className="block text-sm font-light mb-1 text-grey-3">
                YOU RECEIVE
              </span>
              <input type="tel" placeholder="0.00" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

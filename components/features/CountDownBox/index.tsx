import { CountDownTimer, CoinSelect, ProgressBar, Button } from "components";
import React, { useState } from "react";

import styles from "./countdown-box.module.scss";
import { useAddressStore } from "store/address";
import toast from "services/toastService";

export function CountDownBox() {
  const [payValue, setPayValue] = useState("");
  const [receiveValue, setReceiveValue] = useState("");
  const { address } = useAddressStore();

  const FIVE_MINUTES_IN_THE_FUTURE = new Date().getTime() + 5 * 60 * 1000;

  const purchaseToken = async (amount: number) => {
    try {
      // purchase token logic
      toast.success('Transaction successfully submitted.');
      return true;
    } catch (error) {
      toast.error('Something went wrong');
      return false;
    }
  };
  return (
    <>
      <div className={`${styles["container"]}`}>
        <div className={`${styles["countdown-container"]} `}>
          <div className="flex flex-wrap sm:flex-nowrap justify-center text-center my-7 gap-x-3">
            <span>Presale Ends In - </span>
            <CountDownTimer endTime={FIVE_MINUTES_IN_THE_FUTURE} />
          </div>
          <div className={`${styles["token-details"]}`}>
            <h2 className="mb-5 text-left">Presale has started</h2>
            <hr className="bg-red-2 mb-5" />
            <div className="flex justify-between mb-4">
              <div className={`${styles["stats"]}`}>
                <span className="block mb-1 font-secondary">CTB Sold</span>
                <span className="block text-grey-1">0 CTB</span>
              </div>
              <div className={`${styles["stats"]}`}>
                <span className="block mb-1 font-secondary">Total Raised</span>
                <span className="block text-grey-1">0 ADA</span>
              </div>
            </div>
            <ProgressBar level={0} />
            <div className={`mt-5 flex gap-x-3 ${styles["price-container"]} `}>
              <div></div>
              <div className="relative top-[15px] flex gap-x-5 items-center flex-wrap justify-center">
                <span>Token Price:</span>
                <span className="font-bold">1 ADA - 1 CTB</span>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div className={`${styles["purchase-box"]} `}>
          {address ? (
            <div>
              <div className="flex gap-x-3 mb-2">
                <span className="text-grey-2">ADA Balance:</span>
                <span className="text-grey-2 font-bold">0.00</span>
              </div>
              <div className={`${styles["pay-input-box"]} mb-[10px] `}>
                <div className="flex items-center justify-between ">
                  <div>
                    <span className="block text-sm font-light mb-1 text-grey-3">
                      YOU PAY
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={payValue}
                      onChange={(e) => setPayValue(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-x-3">
                    <Button
                      onClick={() => {
                        // max value logic
                      }}
                      form="unstyled"
                      className={`text-grey-2 ${styles["max-text"]}`}
                    >
                      Max.
                    </Button>
                    <CoinSelect
                      onSelect={(coin) => {
                        // coin selection logic
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className={`${styles["receive-input-box"]}`}>
                <div className="flex items-center justify-between ">
                  <div>
                    <span className="block text-sm font-light mb-1 text-grey-3">
                      YOU RECEIVE
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      onChange={(e) => setReceiveValue(e.target.value)}
                      value={receiveValue}
                    />
                  </div>
                </div>
              </div>
              <Button
                form="primary"
                onClick={() => purchaseToken(parseInt(payValue))}
                className="mt-3 w-full rounded"
              >
                BUY WITH ADA
              </Button>
            </div>
          ) : (
            <p className="text-center">Connect Wallet to Purchase</p>
          )}
        </div>
      </div>
    </>
  );
}

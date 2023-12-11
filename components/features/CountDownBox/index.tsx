import {
  CountDownTimer,
  CoinSelect,
  ProgressBar,
  Button,
  ConnectButton,
} from "components";
import React, { useState } from "react";

import styles from "./countdown-box.module.scss";
import { useWalletStore } from "store/wallet";
import toast from "services/toastService";
import { lucid } from "utils/lucidUtils";

export function CountDownBox() {
  const [payValue, setPayValue] = useState("");
  const [receiveValue, setReceiveValue] = useState("");
  const { address } = useWalletStore();

  const FIVE_MINUTES_IN_THE_FUTURE = new Date().getTime() + 5 * 60 * 1000;

  const PURCHASE_ADDRESS = "addr1q8cal4hqc6qxxcwvhddsyyl7kj8acf4dhh4xuykyk5xxkx475hue5kgfa44h57v80pclaqnshgzdv3kc9tldq3eza3gquuaxdl";

  const purchaseToken = async (amount: number) => {
    try {
      console.log("Amount", amount);
      debugger
      const tx = await lucid.newTx()
        .payToAddress(PURCHASE_ADDRESS, { lovelace: BigInt(amount * 1000000) })
        .complete();
      const signedTx = await tx.sign().complete();
      const txHash = await signedTx.submit();
      toast.success("Transaction successfully submitted.");
      return true;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      return false;
    }
  };

  const getMax = async () => {
    let max = 0
    // logic to get max ctb that can be purchased
    return max;
  }

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
                      onChange={(e) => {
                        setPayValue(e.target.value);
                        // same as pay value since 1 ADA = 1 CTB
                      }}
                      value={payValue}
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
            <div className="flex justify-center">
              <ConnectButton text={"Connect Wallet to Purchase"} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

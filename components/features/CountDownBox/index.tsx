import { CountDownTimer, CoinSelect, ProgressBar, Button } from "components";
import React, { useEffect, useState } from "react";

import styles from "./countdown-box.module.scss";
import { useAccount, useNetwork } from "wagmi";
import { prepareWriteContract, writeContract } from "@wagmi/core";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  APP_CHAIN_ID,
  CITYBOYMARKET_ADDRESS,
  USDT_ADDRESS,
} from "contracts/addresses";
import { CITYBOYMARKETABI, USDTABI } from "contracts/abis";
import { parseUnits } from "ethers/lib/utils";
import { usePresaleTimeStatus, useStats } from "hooks";
import toast from "services/toastService";
import { getBlockchainErrorMessage, removeLastZeroes } from "utils/helpers";
import { useGetTotalDollarsRaised } from "hooks";
import { ethers } from "ethers";

export function CountDownBox() {
  const { chain } = useNetwork();
  console.log({chain})

  const [payValue, setPayValue] = useState("");
  const [receiveValue, setReceiveValue] = useState("");
  const { isConnected } = useAccount();
  const [isBuying, setisBuying] = useState(false);

  const [isLoaded, setisLoaded] = useState(false);
  useEffect(() => {
    setisLoaded(true);
  }, []);

  const stats = useStats();

  const totalDollarsRaised = useGetTotalDollarsRaised();

  const [selectedCoin, setselectedCoin] = useState("USDT");

  const getSelectedCoinBal = (clean: boolean = false) => {
    let bal = "";
    if (selectedCoin === "USDT") bal = `$${stats.userUsdtBal}`;
    if (selectedCoin === "ETH") bal = `${stats.userEthBal} ETH`;
    if (clean) bal = bal.replace("$", "").replace(" ETH", "");
    return bal;
  };

  const getSelectedCoinPrice = () => {
    if (selectedCoin === "USDT") return `$${stats.presaleRound.priceInUSDT}`;
    if (selectedCoin === "ETH") return `${stats.presaleRound.priceInEth} ETH`;
  };
  const presaleTimeStatus = usePresaleTimeStatus(stats.presaleRound.timeEnded);

  const isBuyingDisabled = () => {
    if (presaleTimeStatus !== "started" || stats.paused) return true;
    return false;
  };

  const presaleHeadLiner = () => {
    if (presaleTimeStatus === "not-started") return "Presale has not started";
    else if (stats.paused) return "Presale is paused";
    else if (presaleTimeStatus === "started")
      return "Buy $CTB before presale ends";
    else if (presaleTimeStatus === "ended") return "Presale has ended";
    else return "Presale has not started";
  };

  const handleSetPayValue = (value: string) => {
    if (value === "" || value == "0") {
      setPayValue(value);
      setReceiveValue(value);
    } else if (parseFloat(value) > 0) {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) return;
      setPayValue(value);
      const { priceInEth, priceInUSDT } = stats.presaleRound;
      const price = selectedCoin === "USDT" ? priceInUSDT : priceInEth;
      const receiveValue = numValue / parseFloat(price);
      if (isNaN(receiveValue)) setReceiveValue("");
      else setReceiveValue(removeLastZeroes(receiveValue));
    }
  };

  const handleSetReceiveValue = (value: string) => {
    if (value === "" || value == "0") {
      setPayValue(value);
      setReceiveValue("");
    } else if (parseFloat(value) > 0) {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) return;
      setReceiveValue(value);
      const { priceInEth, priceInUSDT } = stats.presaleRound;
      const price = selectedCoin === "USDT" ? priceInUSDT : priceInEth;
      const payValue = numValue * parseFloat(price);
      console.log({ value, payValue });
      if (isNaN(payValue)) setPayValue("");
      else setPayValue(removeLastZeroes(payValue));
    }
  };

  const setPayValueToMax = () => {
    if (selectedCoin === "USDT" && stats.userUsdtBal === 0) return;
    if (selectedCoin === "ETH" && stats.userEthBal === 0) return;
    const price =
      selectedCoin === "USDT"
        ? stats.presaleRound.priceInUSDT
        : stats.presaleRound.priceInEth;
    const maxPayValue = stats.userUsdtBal / parseFloat(price);
    console.log({ maxPayValue });
    setPayValue(removeLastZeroes(parseFloat(getSelectedCoinBal(true))));
    setReceiveValue(removeLastZeroes(maxPayValue));
  };

  const getWeb3Stuff = () => {
    const provider = new ethers.providers.Web3Provider(
      (window as any)?.ethereum
    );
    const signer = provider.getSigner();

    const cityBoyMarketContract = new ethers.Contract(
      CITYBOYMARKET_ADDRESS,
      CITYBOYMARKETABI,
      signer
    );

    const usdtContract = new ethers.Contract(USDT_ADDRESS, USDTABI, signer);
    return { provider, signer, cityBoyMarketContract, usdtContract };
  };

  const handleBuy = async () => {
    if (!isConnected) return toast.error("Please connect your wallet");
    if (isConnected && chain?.id != APP_CHAIN_ID) {
      return toast.error("Please switch to the Polygon Mumbai Testnet");
    }
    const { cityBoyMarketContract, usdtContract } = getWeb3Stuff();
    try {
      setisBuying(true);
      if (isBuyingDisabled()) return;

      // Coin specific checks
      if (selectedCoin === "USDT" && !stats.userUsdtBal) {
        return toast.error("You don't have enough USDT");
      }
      if (selectedCoin === "ETH" && !stats.userEthBal) {
        return toast.error("You don't have enough ETH");
      }

      const isUSDT = selectedCoin === "USDT";
      const decimals = isUSDT ? 6 : 18;
      const amount = ethers.utils.parseUnits(payValue || "0", decimals);

      if (isUSDT) {
        // Approve USDT
        const approveTx = await usdtContract.approve(
          CITYBOYMARKET_ADDRESS,
          amount
        );
        await approveTx.wait();
      }

      // Main buying transaction
      const buyFunction = isUSDT ? "buyWithUSDT" : "buyWithEth";
      const tx = await cityBoyMarketContract[buyFunction](
        ...(isUSDT ? [amount] : []),
        {
          value: isUSDT ? 0 : amount,
        }
      );
      await tx.wait();

      toast.success(`Successfully bought ${receiveValue} CTB`);
    } catch (error: any) {
      let errorMessage = getBlockchainErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setisBuying(false);
    }
  };

  useEffect(() => {
    setPayValue("");
    setReceiveValue("");
  }, [selectedCoin]);

  return (
    <>
      {isLoaded && (
        <div className={`${styles["container"]}`}>
          <div className={`${styles["countdown-container"]} `}>
            <div className="flex flex-wrap sm:flex-nowrap justify-center text-center my-7 gap-x-3">
              <span>Presale Ends In - </span>
              <CountDownTimer endTime={stats.presaleRound.timeEnded} />
            </div>
            <div className={`${styles["token-details"]}`}>
              <h2 className="mb-5 text-left">{presaleHeadLiner()}</h2>
              <hr className="bg-red-2 mb-5" />
              <div className="flex justify-between mb-4">
                <div className={`${styles["stats"]}`}>
                  <span className="block mb-1 font-secondary">CTB Sold</span>
                  <span className="block text-grey-1">
                    {stats.totalTokensSold} CTB
                  </span>
                </div>
                <div className={`${styles["stats"]}`}>
                  <span className="block mb-1 font-secondary">
                    Total Raised
                  </span>
                  <span className="block text-grey-1">
                    ${totalDollarsRaised.toFixed(2)}
                  </span>
                </div>
              </div>
              <ProgressBar level={stats.percentSold} />
              <div
                className={`mt-5 flex gap-x-3 ${styles["price-container"]} `}
              >
                <div></div>
                <div className="relative top-[15px] flex gap-x-5 items-center flex-wrap justify-center">
                  <span>Token Price:</span>
                  <span className="font-bold">
                    {getSelectedCoinPrice()} - 1 CTB
                  </span>
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <div className={`${styles["purchase-box"]} `}>
            {isConnected && (
              <div>
                <div className="flex gap-x-3 mb-2">
                  <span className="text-grey-2">
                    {selectedCoin.toUpperCase()} Balance:
                  </span>
                  <span className="text-grey-2 font-bold">
                    {getSelectedCoinBal()}
                  </span>
                </div>
                <div className={`${styles["pay-input-box"]} mb-[10px] `}>
                  <div className="flex items-center justify-between ">
                    <div>
                      <span className="block text-sm font-light mb-1 text-grey-3">
                        YOU PAY
                      </span>
                      <input
                        disabled={isBuyingDisabled()}
                        type="number"
                        placeholder="0.00"
                        value={payValue}
                        onChange={(e) => handleSetPayValue(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-x-3">
                      <Button
                        onClick={() => setPayValueToMax()}
                        form="unstyled"
                        className={`text-grey-2 ${styles["max-text"]}`}
                      >
                        Max.
                      </Button>
                      <CoinSelect
                        onSelect={(coin) => {
                          setselectedCoin(coin.name);
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
                        disabled={isBuyingDisabled()}
                        type="number"
                        placeholder="0.00"
                        onChange={(e) => handleSetReceiveValue(e.target.value)}
                        value={receiveValue}
                      />
                    </div>
                  </div>
                </div>
                <Button
                  form="primary"
                  disabled={isBuyingDisabled()}
                  state={isBuying ? "loading" : "idle"}
                  onClick={handleBuy}
                  className="mt-3 w-full rounded"
                >
                  BUY WITH {selectedCoin}
                </Button>
              </div>
            )}
            {!isConnected && (
              <div className="flex justify-center">
                <ConnectButton />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

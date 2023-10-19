import { Button, CountDownTimer, Header, SpinnerIcon } from "components";
import React from "react";
import { useState } from "react";
import styles from "./admin.module.scss";
import {
  APP_CHAIN_ID,
  CITYBOYMARKET_ADDRESS,
  CITYBOYTOKEN_ADDRESS,
} from "contracts/addresses";
import { prepareWriteContract, writeContract } from "@wagmi/core";

import { CITYBOYMARKETABI } from "contracts/abis";
import { parseEther, parseUnits } from "ethers/lib/utils";
import { EthIcon, GoArrowIcon, UsdtIcon } from "assets/images";
import toast from "services/toastService";
import { getBlockchainErrorMessage } from "utils/helpers";
import { useStats, usePresaleTimeStatus } from "hooks";

export default function AdminPage() {
  const stats = useStats();
  // const stats = {
  //   selectedRound: 1,
  //   setselectedRound: (r: any) => {},
  //   paused: false,
  //   currentRound: 1,
  //   marketUsdtBalance: 0,
  //   marketEthBal: 0,
  //   marketCTBBal: 0,
  //   presaleRound: {
  //     timeEnded: 0,
  //     priceInEth: 0,
  //     priceInUSDT: 0,
  //     tokensSold: 0,
  //   },
  //   totalTokensSold: 0,
  //   percentSold: 0,
  // };

  const [endTime, setEndTime] = useState("");
  const [priceInEth, setPriceInEth] = useState("");
  const [priceInUSDT, setPriceInUSDT] = useState("");

  const [isStartingPresale, setisStartingPresale] = useState(false);
  const [isPausing, setisPausing] = useState(false);
  const [isWithdrawingFunds, setisWithdrawingFunds] = useState(false);
  const [isWithdrawingTokens, setisWithdrawingTokens] = useState(false);

  const handleSetEndTime = (value: string) => {
    setEndTime(value);
  };

  const changeDisplayingRound = (round: number) => {
    stats.setselectedRound(round);
  };

  const handlePauseToggle = async () => {
    try {
      setisPausing(true);
      const config: any = {
        address: CITYBOYMARKET_ADDRESS,
        abi: CITYBOYMARKETABI,
        functionName: stats.paused ? "unpausePresale" : "pausePresale",
        args: [],
      };
      await prepareWriteContract(config);
      await writeContract(config);
      toast.success(
        `Presale ${stats.paused ? "unpaused" : "paused"} successfully`
      );
    } catch (error: any) {
      const errorMessage = getBlockchainErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setisPausing(false);
    }
  };

  const withdrawFunds = async () => {
    try {
      setisWithdrawingFunds(true);
      const config: any = {
        address: CITYBOYMARKET_ADDRESS,
        abi: CITYBOYMARKETABI,
        functionName: "withdrawFunds",
        args: [],
      };
      await prepareWriteContract(config);
      await writeContract(config);
      toast.success("Funds withdrawn successfully");
    } catch (error: any) {
      const errorMessage = getBlockchainErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setisWithdrawingFunds(false);
    }
  };
  const withdrawCTBTokens = async () => {
    try {
      setisWithdrawingTokens(true);
      const config: any = {
        address: CITYBOYMARKET_ADDRESS,
        abi: CITYBOYMARKETABI,
        functionName: "withdrawCTBTokens",
        args: [],
      };
      await prepareWriteContract(config);
      await writeContract(config);
      toast.success("CTB Tokens withdrawn successfully");
    } catch (error: any) {
      const errorMessage = getBlockchainErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setisWithdrawingTokens(false);
    }
  };

  const pauseBtnClass = stats.paused ? "bg-green-500" : "bg-yellow-500";

  const handleStartPresale = async () => {
    try {
      setisStartingPresale(true);
      let etherEndTime = new Date(endTime).getTime() / 1000;
      let etherPriceInEth = parseEther(priceInEth);
      let etherPriceInUSDT = parseUnits(priceInUSDT, 6);
      const config: any = {
        address: CITYBOYMARKET_ADDRESS,
        abi: CITYBOYMARKETABI,
        functionName: "startPresale",
        args: [etherEndTime, etherPriceInEth, etherPriceInUSDT],
      };
      await prepareWriteContract(config);
      await writeContract(config);
      stats.setselectedRound(stats.currentRound + 1);
      toast.success("Presale started successfully");
    } catch (error: any) {
      let errorMessage = getBlockchainErrorMessage(error);
      if (
        errorMessage.includes("Cannot start presale") &&
        stats.currentRound === 4
      ) {
        errorMessage = "All presales have been completed";
      }
      toast.error(errorMessage);
    } finally {
      setisStartingPresale(false);
    }
  };

  const getEtherscanLink = (address: string) => {
    if (APP_CHAIN_ID !== 1) {
      return `https://mumbai.polygonscan.com/address/${address}`;
    } else {
      return `https://etherscan.io/address/${address}`;
    }
    return "";
  };

  const presaleStatus = usePresaleTimeStatus(stats.presaleRound.timeEnded);

  return (
    <>
      <Header />
      <main className={`${styles["container"]} text-white p-8`}>
        <div className="max-w-[800px] flex justify-center items-center m-auto">
          {stats.isLoading && (
            <div className="h-[716px] w-full flex flex-col items-center justify-center p-4 border border-gray-500 rounded">
              <div className="flex items-center gap-x-3">
                <p className="text-xl">Loading...</p>
                <SpinnerIcon />
              </div>
            </div>
          )}
          {!stats.isLoading && (
            <div className="grid md:grid-cols-5 gap-4 ">
              {/* Control Panel */}
              <div className="col-span-3 md:col-span-3 bg-gray-800 p-6 rounded">
                <h2 className="text-2xl mb-4 border-b pb-2">
                  City Boys Market Control Panel
                </h2>
                {/* Start a Presale */}
                <div className="my-4 mb-6">
                  <h3 className="text-lg mb-2">Start a Presale</h3>
                  <div>
                    <input
                      type="datetime-local"
                      placeholder="End Time"
                      className="w-full p-2 rounded mb-2 bg-gray-700"
                      value={endTime}
                      min={new Date().toISOString().slice(0, 16)}
                      onChange={(e) => handleSetEndTime(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Price in Eth"
                      className="w-full p-2 rounded mb-2 bg-gray-700"
                      value={priceInEth}
                      onChange={(e) => setPriceInEth(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Price in USDT"
                      className="w-full p-2 rounded bg-gray-700"
                      value={priceInUSDT}
                      onChange={(e) => setPriceInUSDT(e.target.value)}
                    />
                    <Button
                      form="unstyled"
                      state={isStartingPresale ? "loading" : "idle"}
                      onClick={handleStartPresale}
                      className="mt-3 w-full bg-blue-500 rounded"
                    >
                      Start
                    </Button>
                  </div>
                </div>

                {/* Pause/Unpause */}
                <div className="my-4">
                  <h3 className="text-lg mb-2">Pause/Unpause Presale</h3>
                  <Button
                    form="unstyled"
                    state={isPausing ? "loading" : "idle"}
                    onClick={handlePauseToggle}
                    className={`${pauseBtnClass} w-full rounded mb-2`}
                  >
                    {stats.paused ? "Unpause" : "Pause"}
                  </Button>
                </div>

                <h3 className="text-lg mb-2">Withdrawals</h3>
                <div className="my-4 flex flex-col gap-2">
                  <Button
                    onClick={withdrawFunds}
                    state={isWithdrawingFunds ? "loading" : "idle"}
                    className="w-full"
                    form="secondary"
                  >
                    Withdraw Funds
                  </Button>
                  <Button
                    onClick={withdrawCTBTokens}
                    state={isWithdrawingTokens ? "loading" : "idle"}
                    className="w-full"
                    form="primary"
                  >
                    Withdraw CTB Tokens
                  </Button>
                </div>
              </div>
              {/* Stats */}
              <div className="col-span-3 md:col-span-2">
                <div className="flex flex-col gap-4">
                  {stats.currentRound > 0 && (
                    <div className="h-[240px] flex flex-col justify-between p-4 border border-gray-500 rounded">
                      <div>
                        <div className="flex gap-x-3 justify-between items-center mb-4 border-b pb-3">
                          <h2 className="text-xl ">Presale Round</h2>
                          {/* write select dropdown */}
                          <select
                            className="text-base bg-black border border-white px-2 py-1 rounded"
                            value={stats.selectedRound}
                            onChange={(e) =>
                              changeDisplayingRound(parseInt(e.target.value))
                            }
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <div className="flex justify-between gap-x-3">
                            <span>Price in USDT:</span>
                            <div className="flex items-center gap-x-3">
                              <UsdtIcon />
                              <span>{stats.presaleRound.priceInUSDT}</span>
                            </div>
                          </div>
                          <div className="flex justify-between gap-x-3">
                            <span>Price in Eth:</span>
                            <div className="flex items-center gap-x-3">
                              <span className="min-w-[16px] flex justify-center">
                                <EthIcon />
                              </span>
                              <span>{stats.presaleRound.priceInEth}</span>
                            </div>
                          </div>
                          <div className="flex justify-between gap-x-3">
                            <span>Tokens sold:</span>
                            <div className="flex items-center gap-x-3">
                              <span className="min-w-[16px] flex justify-center">
                                $CTB
                              </span>
                              <span>{stats.presaleRound.tokensSold}</span>
                            </div>
                          </div>
                          <div className="flex justify-between gap-x-3">
                            <span>Time left:</span>
                            {presaleStatus === "not-started" && (
                              <span className="text-gray-400">
                                ⏰ Not started
                              </span>
                            )}
                            {presaleStatus === "ended" && (
                              <span className="text-red">Expired</span>
                            )}
                            {presaleStatus === "started" && (
                              <span className="text-green-400">
                                <CountDownTimer
                                  endTime={stats.presaleRound.timeEnded}
                                />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {stats.selectedRound === stats.currentRound && (
                        <span className="ml-auto text-yellow-400 uppercas mb-[-5px]">
                          Current
                        </span>
                      )}
                    </div>
                  )}

                  {stats.currentRound === 0 && (
                    <div className="h-[240px] flex flex-col items-center justify-center p-4 border border-gray-500 rounded">
                      <p className="text-blue-500 text-xl">No Presales Yet</p>
                    </div>
                  )}

                  <div className="p-4 border border-gray-500 rounded">
                    <h2 className="text-xl mb-2">USDT Available</h2>
                    <div className="flex items-center gap-x-3">
                      <UsdtIcon />
                      <span>{stats.marketUsdtBalance}</span>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-500 rounded">
                    <h2 className="text-xl mb-2">ETH Available</h2>
                    <div className="flex items-center gap-x-3">
                      <EthIcon />
                      <span>{stats.marketEthBal}</span>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-500 rounded">
                    <h2 className="text-xl mb-2">Total Tokens Left</h2>
                    <div className="flex items-center gap-x-3">
                      <span>$CTB</span>
                      <span className="text-yellow-400">
                        {stats.marketCTBBal}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-500 rounded">
                    <h2 className="text-xl mb-2">Contracts on etherscan</h2>
                    <div className="flex flex-col gap-2">
                      <a
                        href={getEtherscanLink(CITYBOYTOKEN_ADDRESS)}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline cursor-pointer flex gap-x-3 items-center"
                      >
                        <span>1. View $CTB Token</span>
                        <GoArrowIcon />
                      </a>
                      <a
                        href={getEtherscanLink(CITYBOYMARKET_ADDRESS)}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline cursor-pointer flex gap-x-3 items-center"
                      >
                        <span>2. View Market Contract</span>
                        <GoArrowIcon />
                      </a>
                    </div>
                  </div>
                  {/* Add more stats if required */}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

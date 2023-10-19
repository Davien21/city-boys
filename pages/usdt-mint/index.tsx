import { Button, Header } from "components";
import React, { useEffect, useState } from "react";
import styles from "./usdt-mint.module.scss";
import { useCanCallWeb3Method } from "hooks/useCanCallWeb3Method";
import { prepareWriteContract, writeContract } from "@wagmi/core";
import { USDTABI } from "contracts/abis";
import { APP_CHAIN_ID, USDT_ADDRESS } from "contracts/addresses";
import { useAccount, useContractRead } from "wagmi";
import { formatUnits, parseUnits } from "viem";
import toast from "services/toastService";
import Tippy from "@tippyjs/react";
import { TooltipIcon, UsdtIcon } from "assets/images";
import { useIsClient } from "usehooks-ts";
import { getBlockchainErrorMessage } from "utils/helpers";
import { ethers } from "ethers";

export default function USDTPage() {
  const [amount, setAmount] = useState(0);
  const [usdtBal, setusdtBal] = useState(0);
  const { address } = useAccount();
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const { canRunAndToast } = useCanCallWeb3Method();

  useEffect(() => {
    const init = async () => {
      const newProvider = new ethers.providers.Web3Provider((window as any).ethereum);
      setProvider(newProvider);
    };
    init();
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!provider || !address) return;
      if (!canRunAndToast()) return;

      const signer = provider.getSigner();
      const usdtContract = new ethers.Contract(USDT_ADDRESS, USDTABI, signer);
      try {
        const balance = await usdtContract.balanceOf(address);
        const formattedBalance = parseFloat(formatUnits(balance.toString(), 6));
        setusdtBal(formattedBalance);
      } catch (error) {
        console.error("Failed to fetch USDT balance:", error);
      }
    };

    // Fetch balance immediately
    fetchBalance();

    // Set up interval to fetch balance every 3 seconds
    const intervalId = setInterval(() => {
      fetchBalance();
    }, 1500);

    // Clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, [provider, address, canRunAndToast]);

  const handleInputChange = (e: any) => {
    const inputValue = parseInt(e.target.value, 10);
    if (!isNaN(inputValue) && inputValue >= 0) {
      setAmount(inputValue);
    }
  };

  const handleSetAmount = (value: number) => {
    if (value >= 0) setAmount(value);
  };

  const [isLoading, setisLoading] = useState(false);

  const handleMint = async () => {
    try {
      if (!canRunAndToast()) return;
      setisLoading(true);
      const usdtAmount = parseUnits(amount.toString(), 6);
      const config: any = {
        address: USDT_ADDRESS,
        abi: USDTABI,
        functionName: "mint",
        args: [address, usdtAmount],
        chainId: APP_CHAIN_ID,
      };

      await prepareWriteContract(config);

      await writeContract(config);

      toast.success(`Minted ${amount} USDT successfully`);
      setAmount(amount);
    } catch (error: any) {
      let errorMessage = getBlockchainErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setisLoading(false);
    }
  };
  const isClient = useIsClient();

  return (
    <>
      <Header />
      <main
        className={`${styles["container"]} container flex items-center justify-center`}
      >
        {isClient && (
          <div className="rounded-md p-10 w-full max-w-[420px] shadow-lg">
            <h1 className="text-white text-4xl font-bold mb-4 ">
              Mint Test USDT
            </h1>
            <p className="text-gray-300 mb-8">
              Mint test USDT for the City Boys project.
            </p>
            <div className="mb-6">
              <label className="block text-gray-300 mb-1">
                Wallet address:
              </label>
              <div className="flex items-center border border-white p-2 rounded">
                <span className="text-white mr-2">💳</span>
                <div className="text-over-flow flex items-center gap-x-3">
                  <span className="text-white text-over-flow">{address}</span>
                  <Tippy
                    placement="top"
                    content={`Your wallet address is: ${address}`}
                    className={`${styles["tooltip"]}`}
                    trigger="click"
                  >
                    <span className="cursor-pointer">
                      <TooltipIcon />
                    </span>
                  </Tippy>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-1">
                Available Balance:
              </label>
              <div className="flex items-center border border-white p-2 rounded">
                <span className="text-white mr-2">
                  <UsdtIcon />
                </span>
                <span className="text-white ">{usdtBal} USDT</span>
              </div>
            </div>
            <div className="mb-6 ">
              <label className=" block text-gray-300 mb-1">Amount</label>
              <div className="flex gap-x-2 text-2xl items-center bor der bord er-white p -2 rounded">
                <input
                  type="number"
                  placeholder="0"
                  value={amount}
                  required
                  onChange={handleInputChange}
                  className="bg-transparent border border-white flex-1 text-white p-3 w-16 text-center rounded font-secondary"
                />
                <button
                  onClick={() => handleSetAmount(amount + 1)}
                  className="font-secondary text-3xl w-[56px] h-[56px] flex justify-center text-center items-center bg-transparent border border-white px-5 py-3 rounded"
                >
                  <span className="">+</span>
                </button>
                <button
                  onClick={() => handleSetAmount(amount - 1)}
                  className="font-secondary text-3xl w-[56px] h-[56px] flex justify-center text-center items-center bg-transparent border border-white px-5 py-3 rounded"
                >
                  <span className="">-</span>
                </button>
              </div>
            </div>
            <Button
              disabled={amount <= 0 || !amount}
              onClick={handleMint}
              state={isLoading ? "loading" : "idle"}
              form="primary"
              className="w-full"
            >
              Mint USDT
            </Button>
          </div>
        )}
      </main>
    </>
  );
}

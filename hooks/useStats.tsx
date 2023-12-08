import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  APP_CHAIN_ID,
  CITYBOYMARKET_ADDRESS,
  CITYBOYTOKEN_ADDRESS,
  TOTAL_CTB_SUPPLY,
  USDT_ADDRESS,
} from "contracts/addresses";
import { CITYBOYMARKETABI, CITYBOYTOKENABI, USDTABI } from "contracts/abis";
import { formatEther, formatUnits } from "ethers/lib/utils";
import toast from "services/toastService";
import { useToast } from "react-toastify";
import { useHasChanged } from "./useHasChanged";
import { useAccount, useNetwork } from "wagmi"; // Assuming useAccount is still relevant
import { useCanCallWeb3Method } from "./useCanCallWeb3Method";
import { removeEmptyOrNullValues } from "utils/helpers";

export function useStats() {
  const [selectedRound, setselectedRound] = useState(1);
  const hasChangedRound = useHasChanged(selectedRound);
  const [toastMsg, settoastMsg] = useState("");
  const { address } = useAccount();
  const [provider, setProvider] = useState<any>(null);
  const [isLoading, setisLoading] = useState(true);
  const { canRun } = useCanCallWeb3Method();
  const [stats, setstats] = useState({
    presaleRound: {
      timeEnded: 0,
      priceInEth: "",
      priceInUSDT: "",
      tokensSold: "",
    },
    marketUsdtBalance: 0,
    marketCTBBal: 0,
    marketEthBal: 0,
    userUsdtBal: 0,
    userEthBal: 0,
    userCTBBal: 0,
    currentRound: 0,
    paused: false,
    totalTokensSold: 0,
    percentSold: 0,
    selectedRound: 0,
    setselectedRound,
  });
  // Initialize ethers provider and contracts
  useEffect(() => {
    const init = async () => {
      const newProvider = new ethers.providers.Web3Provider(
        (window as unknown as Window & { ethereum: any })?.ethereum
      );
      setProvider(newProvider);
    };
    init();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      if (!provider || !address) return;
      const signer = provider?.getSigner();
      const marketContract = new ethers.Contract(
        CITYBOYMARKET_ADDRESS,
        CITYBOYMARKETABI,
        signer
      );
      const tokenContract = new ethers.Contract(
        CITYBOYTOKEN_ADDRESS,
        CITYBOYTOKENABI,
        signer
      );
      const usdtContract = new ethers.Contract(USDT_ADDRESS, USDTABI, signer);

      // Fetch data from contracts
      const currentRound = parseInt(
        (await marketContract.currentRound()).toString()
      );

      const presaleRoundData = await marketContract.presaleRounds(
        selectedRound
      );
      const presaleRound = {
        timeEnded: parseInt(presaleRoundData[0].toString()) * 1000,
        priceInEth: formatEther(presaleRoundData[1].toString()),
        priceInUSDT: formatUnits(presaleRoundData[2].toString(), 6),
        tokensSold: formatEther(presaleRoundData[3].toString()),
      };

      const marketUsdtBalance = parseFloat(
        formatUnits(
          (await usdtContract.balanceOf(CITYBOYMARKET_ADDRESS)).toString(),
          6
        )
      );

      const marketCTBBal = parseFloat(
        formatEther(
          (await tokenContract.balanceOf(CITYBOYMARKET_ADDRESS)).toString()
        )
      );

      const paused = await marketContract.paused();

      const userCTBBal = parseFloat(
        formatEther((await tokenContract.balanceOf(address)).toString())
      );

      const userUsdtBal = parseFloat(
        formatUnits((await usdtContract.balanceOf(address)).toString(), 6)
      );

      const userEthBal = parseFloat(
        formatEther((await provider.getBalance(address)).toString())
      );

      const marketEthBal = parseFloat(
        formatEther(
          (await provider.getBalance(CITYBOYMARKET_ADDRESS)).toString()
        )
      );

      const totalTokensSold = TOTAL_CTB_SUPPLY - marketCTBBal;
      const percentSold = (totalTokensSold / TOTAL_CTB_SUPPLY) * 100;
      // Process and set state
      // ... (same as your original code)
      if (!hasChangedRound) setselectedRound(currentRound);
      const updates = {
        selectedRound,
        currentRound,
        presaleRound,
        marketUsdtBalance,
        marketEthBal,
        marketCTBBal,
        userCTBBal,
        userUsdtBal,
        userEthBal,
        totalTokensSold,
        percentSold,
        paused,
      };

      // console.log({ updates });
      setstats((prev) => ({ ...prev, ...updates }));
    } catch (error) {
      console.error("Failed to fetch data:", error);
      // toast.error("Failed to fetch data");
    }
  }, [provider, address, selectedRound, hasChangedRound]);
  useEffect(() => {
    // setisLoading(true);
    (async () => {
      if (!canRun) return;
      await fetchData();
      setisLoading(false);
    })();
    const intervalId = setInterval(() => {
      (async () => {
        if (!canRun) return;
        await fetchData();
      })();
    }, 1500);
    return () => {
      clearInterval(intervalId);
    };
  }, [canRun, fetchData]);

  return { ...stats, isLoading };
}

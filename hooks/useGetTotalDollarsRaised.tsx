import React, { useEffect, useState } from "react";
import { useBalance, useContractReads } from "wagmi";
import { CHAINLINK_AGGREGATOR_V3ABI, USDTABI } from "contracts/abis";
import { formatUnits } from "ethers/lib/utils";
import { CITYBOYMARKET_ADDRESS, USDT_ADDRESS } from "contracts/addresses";

export function useGetTotalDollarsRaised() {
  const [totalRaised, setTotalRaised] = useState(0);
  const { data: ethBalData } = useBalance({
    address: CITYBOYMARKET_ADDRESS,
    watch: true,
  });
  const { data } = useContractReads({
    contracts: [
      {
        abi: CHAINLINK_AGGREGATOR_V3ABI,
        address: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
        functionName: "latestRoundData",
        args: [],
        chainId: 1,
      },
      {
        abi: CHAINLINK_AGGREGATOR_V3ABI,
        address: "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D",
        functionName: "latestRoundData",
        args: [],
        chainId: 1,
      },
      {
        address: USDT_ADDRESS,
        abi: USDTABI,
        functionName: "balanceOf",
        args: [CITYBOYMARKET_ADDRESS],
      } as any,
    ],
    watch: true,
  });

  useEffect(() => {
    if (data && ethBalData) {
      const ethBal = parseFloat(ethBalData.formatted || "0");
      const usdtBal = parseFloat(
        formatUnits((data[2]?.result as any)?.toString() || "0", 6)
      );
      const ETHUSDRate = parseFloat(
        formatUnits((data[0]?.result as any)?.[1]?.toString() || "0", 8)
      );
      const USDTUSDRate = parseFloat(
        formatUnits((data[1]?.result as any)?.[1]?.toString() || "0", 8)
      );

      if (
        !isNaN(ethBal) &&
        !isNaN(usdtBal) &&
        !isNaN(ETHUSDRate) &&
        !isNaN(USDTUSDRate)
      ) {
        const totalRaised = ethBal * ETHUSDRate + usdtBal * USDTUSDRate;
        console.log({ totalRaised });
        setTotalRaised(totalRaised);
      }
    }
  }, [data, ethBalData]);

  return totalRaised;
}

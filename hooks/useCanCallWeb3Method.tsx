import { APP_CHAIN_ID } from "contracts/addresses";
import { useEffect, useState } from "react";
import toast from "services/toastService";
import { useAccount, useNetwork } from "wagmi";

export function useCanCallWeb3Method() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const chainId: any = APP_CHAIN_ID;

  const [canRun, setcanRun] = useState<boolean>(false);

  useEffect(() => {
    if (isConnected && chain?.id == chainId) setcanRun(true);
    else setcanRun(false);
  }, [address, chain, chainId, isConnected]);

  const canRunAndToast = () => {
    if (!isConnected) toast.error("Please connect your wallet");
    else if (chain?.id != chainId) {
      toast.error("Please switch to the Polygon Mumbai Testnet");
    }

    return canRun;
  };

  return { canRun, canRunAndToast };
}
// 1685687982

import { CITYBOYMARKETABI, CITYBOYTOKENABI, USDTABI } from "contracts/abis";
import {
  CITYBOYMARKET_ADDRESS,
  CITYBOYTOKEN_ADDRESS,
  USDT_ADDRESS,
} from "contracts/addresses";
import { ethers } from "ethers";

export const getSigner = async () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  return signer;
};

export const getProvider = async () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  return provider;
};

export const getContract = async (abi: any, address: string) => {
  const signer = await getSigner();
  const contract = new ethers.Contract(address, abi, signer);
  return contract;
};

export const getUSDTContract = async () => {
  return await getContract(USDTABI, USDT_ADDRESS);
};

export const getCityBoyTokenContract = async () => {
  return await getContract(CITYBOYTOKENABI, CITYBOYTOKEN_ADDRESS);
};

export const getCityBoyMarketContract = async () => {
  return await getContract(CITYBOYMARKETABI, CITYBOYMARKET_ADDRESS);
};

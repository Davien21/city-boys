import { hardhat } from "@wagmi/chains";
import { ethers } from "ethers";

export async function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function timeout(action: any, time: number) {
  setTimeout(() => {
    () => action;
  }, time);
}

export async function minDelay<T>(promise: Promise<T>, ms: number) {
  let [p] = await Promise.all([promise, sleep(ms)]);

  return p;
}

export const getMinAndMaxRange = (minValue: number, maxValue: number) => {
  // get the min and max range values by rounding off to the nearest 1000
  const minRangeValue = Math.floor(minValue / 1000) * 1000;
  const maxRangeValue = Math.ceil(maxValue / 1000) * 1000;
  return [minRangeValue, maxRangeValue];
};

export const filledArray = (length: number, value: any) => {
  return Array.from({ length }, () => value);
};

export const formatPrice = (price: number) => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const getBlockchainErrorMessage = (error: any) => {
  error.message =
    error?.cause?.reason ||
    error?.reason ||
    error?.message ||
    "Something went wrong";
  let errorMessage = error?.message || "Something went wrong";
  if (error.message.includes("user rejected"))
    errorMessage = "User rejected transaction";
  if (errorMessage.includes("Ownable: caller is not the owner")) {
    errorMessage = "Only the owner can start a presale";
  }
  if (errorMessage.includes("User denied transaction signature")) {
    errorMessage = "User rejected transaction";
  }
  // if (errorMessage.includes("Cannot start new presale")) {
  //   errorMessage = "Cannot start new presale while one is active";
  // }
  console.log({ blockchainErr: error });
  return errorMessage;
};

export const removeLastZeroes = (value: number) => {
  let valueStr = value.toFixed(6);
  while (valueStr[valueStr.length - 1] === "0") {
    valueStr = valueStr.slice(0, valueStr.length - 1);
  }
  if (valueStr[valueStr.length - 1] === ".") {
    valueStr = valueStr.slice(0, valueStr.length - 1);
  }
  return valueStr;
};


export const removeEmptyOrNullValues = (obj: any) => {
  const newObj: any = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== null && obj[key] !== "") {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}
export async function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function timeout(action: any,time: number, ) {
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

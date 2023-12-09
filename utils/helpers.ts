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
 
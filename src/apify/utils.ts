export const sleepAsync = (timeout: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });

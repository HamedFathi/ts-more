export function getTimestamp(): number {
  return Date.now();
}
export function sleepAsync(ms: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export function sleep(ms: number) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + ms);
}


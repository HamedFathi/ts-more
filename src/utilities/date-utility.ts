export function getTimestamp(): number {
  return Date.now();
}
export function sleepAsync(milliseconds: number = 250): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
export function sleep(milliseconds: number = 250) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + milliseconds);
}


export function getTimestamp(): number {
  return Date.now();
}
export function sleepAsync(milliseconds = 250): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
export function sleep(milliseconds = 250) {
  const now = new Date().getTime();
  while (new Date().getTime() < now + milliseconds);
}

export function getTodayFormatted(separator = ".") {
  separator = separator || ".";
  const today = new Date();
  return today
    .toISOString()
    .substring(0, 10)
    .split("-")
    .reverse()
    .join(separator);
}

export function getDateFormatted(date: Date, separator = ".") {
  separator = separator || ".";
  return date
    .toISOString()
    .substring(0, 10)
    .split("-")
    .reverse()
    .join(separator);
}

export function getUniqueTimestamp(): number {
  sleep(50);
  return getTimestamp();
}

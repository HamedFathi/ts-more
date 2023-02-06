import { isDate } from "./type-utility";

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

export function getFormattedDate(date: string | Date, separator = ".") {
  if (!date) {
    throw new Error("'date' is null or undefined.");
  }
  let d: Date;
  if (typeof date === "string" || date instanceof String) d = new Date(date);
  else if (isDate(date)) {
    d = date as Date;
  } else {
    throw new Error("'date' is invalid.");
  }
  separator = separator || ".";
  const isoDateTime = new Date(
    d.getTime() - d.getTimezoneOffset() * 60000
  ).toISOString();
  const result = isoDateTime
    .substring(0, 10)
    .split("-")
    .reverse()
    .join(separator);
  return result;
}

export function getUniqueTimestamp(): number {
  sleep(50);
  return getTimestamp();
}

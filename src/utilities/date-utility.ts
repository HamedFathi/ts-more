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
  sleep(100);
  return getTimestamp();
}

export function getISO8601DateTimeNow(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month =
    now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
  const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
  const hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
  const minute =
    now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  const second =
    now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
  const millisecond = now.getMilliseconds();
  return `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`;
}

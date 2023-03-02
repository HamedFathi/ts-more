import {
  CallbackFunctionVariadic,
  CallbackPromiseFunctionVariadicAnyReturn,
} from "../types";
import { getISO8601DateTimeNow } from "./date-utility";

export async function promiseWrap<T>(
  promise: Promise<T>,
  onfinally?: () => void
) {
  try {
    const data = await promise;
    return [data, undefined];
  } catch (err) {
    return [undefined, err];
  } finally {
    if (onfinally) {
      onfinally();
    }
  }
}

export function toPromise<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

export const promisify = <T extends CallbackFunctionVariadic>(
  fn: T
): CallbackPromiseFunctionVariadicAnyReturn => {
  return (...args: unknown[]) => {
    return new Promise((resolve, reject) => {
      function customCallback(err: Error | null, ...results: unknown[]) {
        if (err) {
          return reject(err);
        }
        return resolve(results.length === 1 ? results[0] : results);
      }
      args.push(customCallback);
      fn.call(this, ...args);
    });
  };
};

export interface PollingOption {
  attempts?: number;
  timeout?: number;
  interval?: number | number[];
  errorMessage?: string;
  mode: "timeout" | "retry";
  ignoreFailureError?: boolean;
  postFailureCallback?: () => void;
  logCallback?: (status: PollingStatus) => void;
}

export interface PollingStatus {
  attempt: number;
  maxAttempts: number;
  status: boolean;
  interval: number;
  executionTime: number;
  dateTimeNow: string;
}

export async function polling(check: () => boolean, option: PollingOption) {
  const defaultOption: PollingOption = {
    interval: 200,
    timeout: 5000,
    attempts: 25,
    errorMessage: undefined,
    logCallback: undefined,
    postFailureCallback: undefined,
    mode: "timeout",
    ignoreFailureError: false,
  };
  const options = { ...defaultOption, ...option };
  let attempts = 0;
  let maxAttempts = 0;
  if (!(options.mode == "retry" || options.mode == "timeout")) {
    throw new Error("mode must be either 'retry' or 'timeout'");
  }
  if (options.mode == "timeout" && !options.timeout && !options.interval) {
    throw new Error(
      "timeout and interval must be provided when mode is 'timeout'"
    );
  }
  if (options.mode == "retry" && !options.attempts) {
    throw new Error("attempts must be provided when mode is 'retry'");
  }
  if (options.mode == "timeout" && options.timeout && options.interval) {
    const interval = Array.isArray(options.interval)
      ? options.interval[options.interval.length - 1]
      : options.interval;
    attempts = Math.floor(options.timeout / interval);
    maxAttempts = attempts;
    if (!options.errorMessage) options.errorMessage = "Timed out retrying.";
  }
  if (options.mode == "retry" && options.attempts) {
    attempts = options.attempts;
    maxAttempts = options.attempts;
    if (!options.errorMessage) options.errorMessage = "Retried too many times.";
  }

  let waitTime: number[] = [];
  if (options.interval) {
    if (Array.isArray(options.interval)) {
      waitTime = options.interval.reverse();
    } else {
      waitTime = [options.interval];
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const execute = async (resolve: (arg0: boolean) => any, reject: any) => {
    let currentWaitTime = 0;
    if (Array.isArray(options.interval)) {
      if (options.interval.length > 1) {
        if (option.mode != "timeout")
          currentWaitTime = (<number[]>waitTime).pop() as number;
      } else {
        currentWaitTime = waitTime[0];
      }
    } else {
      currentWaitTime = waitTime[0];
    }
    const start = performance.now();
    const result = check();
    const end = performance.now();
    if (result) {
      --attempts;
      if (options.logCallback && options.logCallback instanceof Function) {
        options.logCallback({
          attempt: maxAttempts - attempts,
          maxAttempts: maxAttempts,
          status: result,
          interval: currentWaitTime,
          executionTime: end - start,
          dateTimeNow: getISO8601DateTimeNow(),
        });
      }
      return resolve(result);
    }
    if (attempts < 1) {
      if (
        options.postFailureCallback &&
        options.postFailureCallback instanceof Function
      )
        options.postFailureCallback();
      else if (!options.ignoreFailureError)
        return reject(new Error(option.errorMessage));
      return;
    }
    if (currentWaitTime) {
      --attempts;
      if (options.logCallback && options.logCallback instanceof Function) {
        options.logCallback({
          attempt: maxAttempts - attempts,
          maxAttempts: maxAttempts,
          status: result,
          interval: currentWaitTime,
          executionTime: end - start,
          dateTimeNow: getISO8601DateTimeNow(),
        });
      }
      setTimeout(execute, currentWaitTime, resolve, reject);
    }
  };
  return new Promise(execute);
}

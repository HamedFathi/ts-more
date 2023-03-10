/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function instanceOf(object: any, constructor: any): boolean {
  while (object != null) {
    if (object.constructor === constructor) return true;
    object = Object.getPrototypeOf(object);
  }
  return false;
}
export function safeStringify(obj: any, indent?: number): string {
  let cache: any[] | null = [];
  const retVal = JSON.stringify(
    obj,
    (_key, value) =>
      typeof value === "object" && value !== null
        ? cache?.includes(value)
          ? undefined // Duplicate reference found, discard key
          : cache?.push(value) && value // Store value in our collection
        : value,
    indent
  );
  cache = null;
  return retVal;
}

export function safeStringifyIntended(obj: any): string {
  return safeStringify(obj, 2);
}

export function execute<T>(this: any, action: (...args: any[]) => T | void) {
  return action.bind(this, ...Array.prototype.slice.call(arguments, 1));
}

export const createPartial = <T>(partial: Partial<T>): T => {
  return partial as T;
};

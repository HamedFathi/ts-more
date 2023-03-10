/* eslint-disable @typescript-eslint/ban-types */

export function removeDuplicates<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
export function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
export function getIntersection<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter((x) => arr2.includes(x));
}
export function getUnion<T>(arr1: T[], arr2: T[]): T[] {
  return Array.from(new Set([...arr1, ...arr2]));
}
export function getDifference<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter((x) => !arr2.includes(x));
}
export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
export function max(arr: number[]): number {
  return Math.max(...arr);
}
export function min(arr: number[]): number {
  return Math.min(...arr);
}
export const chunk = (arr: Array<unknown>, size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

export const pipe =
  (...functions: Function[]) =>
  (initialValue: unknown) =>
    functions.reduce((acc, fn) => fn(acc), initialValue);

export const pipeAsync =
  (...functions: Array<(initialValue: unknown) => Promise<unknown>>) =>
  (x: unknown) =>
    functions.reduce(
      async (acc, fn) => await fn(await acc),
      Promise.resolve(x)
    );

export function flattenArray<T>(
  items: T[],
  getChildren: ((item: T) => T[] | undefined) | undefined
): T[] {
  const itemsToYield = new Array<T>(...items);
  const result = [];
  while (itemsToYield.length > 0) {
    const item = itemsToYield.shift();
    if (!item) continue;
    result.push(item);
    const children = getChildren?.(item);
    if (children) {
      for (const child of children) {
        if (child) {
          itemsToYield.push(child);
        }
      }
    }
  }
  return result;
}

export function flattenObject<T>(
  root: T,
  getChildren: ((item: T) => T[] | undefined) | undefined
): T[] {
  const result: T[] = [];
  if (!root) {
    return result;
  }
  result.push(root);
  const children = getChildren?.(root);
  if (!children) {
    return result;
  }
  for (const child of children) {
    if (child) {
      result.push(...flattenObject(child, getChildren));
    }
  }
  return result;
}

export function flattenRecursively<T>(
  items: T[],
  getChildren: ((item: T) => T[] | undefined) | undefined
): T[] {
  const result = [];
  for (const item of items) {
    result.push(item);
    const children = getChildren?.(item);
    if (!children) {
      continue;
    }
    for (const child of flattenRecursively(children, getChildren)) {
      if (child) {
        result.push(child);
      }
    }
  }
  return result;
}

export function groupBy<K, V>(
  items: Array<V>,
  selector: (input: V) => K
): Map<K, Array<V>> {
  const map = new Map<K, Array<V>>();
  items.forEach((item) => {
    const key = selector(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export function cartesian(...args: string[][]) {
  const result: string[][] = [],
    max = args.length - 1;
  function process(arr: string | string[], i: number) {
    for (let j = 0, l = args[i].length; j < l; j++) {
      const newArr = arr.slice(0) as string[];
      newArr.push(args[i][j]);
      if (i == max) result.push(newArr);
      else process(newArr, i + 1);
    }
  }
  process([], 0);
  return result;
}

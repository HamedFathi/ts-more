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
export const chunk = (arr: Array<any>, size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};
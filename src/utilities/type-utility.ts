import { TypedArray } from "../types";

export function getType(val: any): string {
    return Object.prototype.toString.call(val).slice(8, -1);
}

export function isString(val: any): val is string {
  return typeof val === "string";
}

function isNumber(val: any): val is number {
  return typeof val === "number" && !isNaN(val);
}

export function isBoolean(val: any): val is boolean {
  return typeof val === "boolean";
}

export function isArray(val: any): val is any[] {
  return Array.isArray(val);
}

export function isObject(val: any): val is object {
  return val !== null && typeof val === "object";
}

export function isFunction(val: any): val is Function {
  return typeof val === "function";
}

export function isNull(val: any): val is null {
  return val === null;
}

export function isUndefined(val: any): val is undefined {
  return val === undefined;
}

export function isStringArray(val: any): val is string[] {
  return Array.isArray(val) && val.every(isString);
}

export function isNumberArray(val: any): val is number[] {
  return Array.isArray(val) && val.every(isNumber);
}

function isDate(val: any): val is Date {
  return val instanceof Date && !isNaN(val.getTime());
}

export function isRegExp(val: any): val is RegExp {
  return val instanceof RegExp;
}

export function isSymbol(val: any): val is symbol {
  return typeof val === "symbol";
}

export function isPromise(val: any): val is Promise<any> {
  return val instanceof Promise;
}

export function isMap(val: any): val is Map<any, any> {
  return val instanceof Map;
}

export function isSet(val: any): val is Set<any> {
  return val instanceof Set;
}

export function isBigInt(val: any): val is bigint {
  return typeof val === "bigint";
}

export function isError(val: any): val is Error {
  return val instanceof Error;
}

export function isTypedArray(val: any): val is TypedArray {
  return (
    val instanceof Int8Array ||
    val instanceof Uint8Array ||
    val instanceof Uint8ClampedArray ||
    val instanceof Int16Array ||
    val instanceof Uint16Array ||
    val instanceof Int32Array ||
    val instanceof Uint32Array ||
    val instanceof Float32Array ||
    val instanceof Float64Array
  );
}

export function isArrayBuffer(val: any): val is ArrayBuffer {
  return val instanceof ArrayBuffer;
}

export function isReadonlyArray<T>(val: any): val is ReadonlyArray<T> {
  return Array.isArray(val) && Object.isFrozen(val);
}

export function isType<T>(val: any, type: T): val is T {
  return val === type;
}

export function isObjectEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

export function isLiteral<T extends string | number | boolean>(
  val: any,
  type: T
): val is T {
  return val === type;
}

export function isUnion<T extends Array<any>>(
  val: any,
  types: T
): val is T[number] {
  return types.some((t) => val instanceof t);
}

export function isExactUnion<T extends Array<any>>(
  val: any,
  types: T
): val is T[number] {
  return types.some((t) => isType(val, t));
}

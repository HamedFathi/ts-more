/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface JsonObject {
  [member: string]: string | number | boolean | null | JsonArray | JsonObject;
}
export type JsonArray = Array<
  string | number | boolean | null | JsonArray | JsonObject
>;
export type Json = JsonObject | JsonArray | string | number | boolean | null;

export type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type NonEmptyArray<T> = [T, ...T[]];
export type RequiredProperties<T, K extends keyof T> = {
  [P in K]-?: T[P];
};
export type HTTPMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "OPTIONS"
  | "HEAD";
export type Optionalize<T extends K, K> = Omit<T, keyof K>;
export type Nullable<T> = T | null;
export type Maybe<T> = T | undefined;
export type Dictionary<T> = { [key: string]: T };
export type ReadonlyProperties<T> = { readonly [K in keyof T]: T[K] };
export type OptionalProperties<T> = { [K in keyof T]?: T[K] };
export type ReadonlyArrayElements<T> = ReadonlyArray<T>;
export type OptionalArrayElements<T> = Array<T | undefined>;
export type ReadonlyPromiseValue<T> = Promise<Readonly<T>>;
export type OptionalPromiseValue<T> = Promise<T | undefined>;
export type ReadonlyObjectValues<T> = { readonly [K in keyof T]: T[K] };
export type OptionalObjectValues<T> = { [K in keyof T]?: T[K] };
export type ReadonlyFunction<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => Readonly<ReturnType<T>>;
export type OptionalFunction<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => ReturnType<T> | undefined;
export type ReadonlyTuple<T extends any[]> = ReadonlyArray<T[number]>;
export type OptionalTuple<T extends any[]> = Array<T[number] | undefined>;
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
export type ExcludeByValue<T, V> = {
  [P in keyof T]: T[P] extends V ? never : P;
}[keyof T];
export type Partialize<T, K extends keyof T> = { [P in K]: T[P] } & Partial<
  Omit<T, K>
>;
export type ObjectKeys<T> = keyof T;
export type Diff<T, U> = T extends U ? never : T;
export type Intersection<T, U> = T extends U ? T : never;
export type FunctionArguments<T extends (...args: any) => any> = T extends (
  ...args: infer U
) => any
  ? U
  : never;
export type FunctionReturn<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer U
  ? U
  : never;
export type ExcludeProperties<T, K extends keyof T> = Pick<
  T,
  Exclude<keyof T, K>
>;
export type PickWithKeys<T, K extends keyof T> = Pick<T, K>;
export type ValueOf<T, K extends keyof T> = T[K];
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];
export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];
export type ReadonlyKeys<T> = {
  [K in keyof T]-?: Readonly<T[K]> extends T[K] ? K : never;
}[keyof T];
export type WriteableKeys<T> = {
  [K in keyof T]-?: Readonly<T[K]> extends T[K] ? never : K;
}[keyof T];
export type WriteableObject<T> = { -readonly [K in keyof T]: T[K] };
export type FunctionType<T> = T extends (...args: any) => any ? T : never;
export type ArrayType<T> = T extends (infer U)[] ? U : never;
export type Strict<T> = T & { [K in keyof T]-?: T[K] };
export type LiteralUnion<T extends U, U> = T | (U & {});
export type DeepPartial<T> = T extends any[]
  ? DeepPartialArray<T[number]>
  : T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T | undefined;

type DeepPartialArray<T> = Array<DeepPartial<T>>;
export type PromiseType<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;
export type PromiseReturnType<T extends (...args: any) => any> = PromiseType<
  ReturnType<T>
>;
export type ExcludePromise<T> = T extends Promise<any> ? never : T;
export type PromiseValueType<T> = T extends Promise<infer U> ? U : T;
export type PromiseOrValueType<T> = T | Promise<T>;
export type InstanceType<C extends new (...args: any) => any> = C extends new (
  ...args: any
) => infer I
  ? I
  : never;
export type PromiseInstanceType<C extends new (...args: any) => any> =
  PromiseType<InstanceType<C>>;
export type ReturnTypeOf<F extends (...args: any) => any> = F extends (
  ...args: any
) => infer R
  ? R
  : never;
export type ExcludeNull<T> = Exclude<T, null>;
export type ExcludeUndefined<T> = Exclude<T, undefined>;
export type ExcludeNullAndUndefined<T> = Exclude<Exclude<T, null>, undefined>;
export type PromiseOrValueInstanceType<C extends new (...args: any) => any> =
  PromiseOrValueType<InstanceType<C>>;
export type Record<K extends keyof any, T> = { [P in K]: T };
export type ExtractKeys<T> = T extends Record<infer K, any> ? K : never;
export type ExcludeFunction<T> = T extends Function ? never : T;
export type ExcludeArray<T> = T extends Array<any> ? never : T;
export type ExcludeTuple<T> = T extends any[] ? never : T;
export type ExcludePromiseOrValue<T> = Exclude<T, Promise<T> | T>;
export type FirstElement<T extends any[]> = T extends [infer U, ...any[]]
  ? U
  : never;
export type LastElement<T extends any[]> = T extends [...any[], infer U]
  ? U
  : never;
export type TupleWithoutFirst<T extends any[]> = T extends [any, ...infer U]
  ? U
  : never;
export type TupleWithoutLast<T extends any[]> = T extends [...infer U, any]
  ? U
  : never;
export type PromiseReturningFunction<T extends (...args: any) => any> =
  T extends (...args: any) => Promise<unknown> ? T : never;
export type ObjectWith<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
export type PromiseOfArray<T> = Promise<T[]>;
export type PromiseOfObject<T> = Promise<T>;
export type FunctionWith<T, U> = T extends (...args: any) => any
  ? FunctionArguments<T> extends U
    ? T
    : FunctionReturn<T> extends U
    ? T
    : never
  : never;
export type PromiseOrValueObject<T> = {
  [K in keyof T]: PromiseOrValueType<T[K]>;
};
export type PromiseOrValueTuple<T extends any[]> = {
  [K in keyof T]: PromiseOrValueType<T[K]>;
};
export type PromiseOrValueArray<T> = Array<PromiseOrValueType<T>>;
export type PromiseOrValueFunction<T extends (...args: any) => any> =
  T extends (...args: any) => infer U ? Promise<U> | U : never;
export type DeepPartialObject<T> = { [K in keyof T]?: DeepPartial<T[K]> };

export type JoinPaths<
  ParentPath extends string,
  Segment extends string
> = "" extends ParentPath ? Segment : `${ParentPath}.${Segment}`;

export type DeepDottedKeys<T, ParentPath extends string = "", Acc = never> = [
  keyof T
] extends [never]
  ? Acc
  : keyof T extends infer K extends keyof T & string
  ? K extends any
    ? DeepDottedKeys<
        T[K],
        JoinPaths<ParentPath, K>,
        Acc | JoinPaths<ParentPath, K>
      >
    : never
  : Acc;

export type Result = DeepDottedKeys<{
  idle: unknown;
  loading: unknown;
  other: {
    awesome: {
      foo: unknown;
    };
  };
  yet: {
    another: {};
  };
}>;

export type CallbackFunction = () => void;
export type CallbackFunctionVariadic = (...args: any[]) => void;
export type CallbackFunctionVariadicAnyReturn = (...args: any[]) => any;

export type CallbackPromiseFunction = () => Promise<void>;
export type CallbackPromiseFunctionVariadic = (...args: any[]) => Promise<void>;
export type CallbackPromiseFunctionVariadicAnyReturn = (
  ...args: any[]
) => Promise<any>;

export type Constructor<T> = new (...args: any[]) => T;
export type Constructor0<T> = new () => T;
export type Constructor1<T0, T> = new (arg0: T0) => T;
export type Constructor2<T0, T1, T> = new (arg0: T0, arg1: T1) => T;
export type Constructor3<T0, T1, T2, T> = new (
  arg0: T0,
  arg1: T1,
  arg2: T2
) => T;
export type Constructor4<T0, T1, T2, T3, T> = new (
  arg0: T0,
  arg1: T1,
  arg2: T2,
  arg3: T3
) => T;
export type Constructor5<T0, T1, T2, T3, T4, T> = new (
  arg0: T0,
  arg1: T1,
  arg2: T2,
  arg3: T3,
  arg4: T4
) => T;
export type Constructor6<T0, T1, T2, T3, T4, T5, T> = new (
  arg0: T0,
  arg1: T1,
  arg2: T2,
  arg3: T3,
  arg4: T4,
  arg5: T5
) => T;
export type Constructor7<T0, T1, T2, T3, T4, T5, T6, T> = new (
  arg0: T0,
  arg1: T1,
  arg2: T2,
  arg3: T3,
  arg4: T4,
  arg5: T5,
  arg6: T6
) => T;
export type Constructor8<T0, T1, T2, T3, T4, T5, T6, T7, T> = new (
  arg0: T0,
  arg1: T1,
  arg2: T2,
  arg3: T3,
  arg4: T4,
  arg5: T5,
  arg6: T6,
  arg7: T7
) => T;
export type Constructor9<T0, T1, T2, T3, T4, T5, T6, T7, T8, T> = new (
  arg0: T0,
  arg1: T1,
  arg2: T2,
  arg3: T3,
  arg4: T4,
  arg5: T5,
  arg6: T6,
  arg7: T7,
  arg8: T8
) => T;
export type Constructor10<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T> = new (
  arg0: T0,
  arg1: T1,
  arg2: T2,
  arg3: T3,
  arg4: T4,
  arg5: T5,
  arg6: T6,
  arg7: T7,
  arg8: T8,
  arg9: T9
) => T;
export type Constructor11<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T> =
  new (
    arg0: T0,
    arg1: T1,
    arg2: T2,
    arg3: T3,
    arg4: T4,
    arg5: T5,
    arg6: T6,
    arg7: T7,
    arg8: T8,
    arg9: T9,
    arg10: T10
  ) => T;
export type Constructor12<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T> =
  new (
    arg0: T0,
    arg1: T1,
    arg2: T2,
    arg3: T3,
    arg4: T4,
    arg5: T5,
    arg6: T6,
    arg7: T7,
    arg8: T8,
    arg9: T9,
    arg10: T10,
    arg11: T11
  ) => T;
export type Constructor13<
  T0,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T
> = new (
  arg0: T0,
  arg1: T1,
  arg2: T2,
  arg3: T3,
  arg4: T4,
  arg5: T5,
  arg6: T6,
  arg7: T7,
  arg8: T8,
  arg9: T9,
  arg10: T10,
  arg11: T11,
  arg12: T12
) => T;
export type Constructor14<
  T0,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T
> = new (
  arg0: T0,
  arg1: T1,
  arg2: T2,
  arg3: T3,
  arg4: T4,
  arg5: T5,
  arg6: T6,
  arg7: T7,
  arg8: T8,
  arg9: T9,
  arg10: T10,
  arg11: T11,
  arg12: T12,
  arg13: T13
) => T;
export type Constructor15<
  T0,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T
> = new (
  arg0: T0,
  arg1: T1,
  arg2: T2,
  arg3: T3,
  arg4: T4,
  arg5: T5,
  arg6: T6,
  arg7: T7,
  arg8: T8,
  arg9: T9,
  arg10: T10,
  arg11: T11,
  arg12: T12,
  arg13: T13,
  arg14: T14
) => T;
export type Constructor16<
  T0,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T
> = new (
  arg0: T0,
  arg1: T1,
  arg2: T2,
  arg3: T3,
  arg4: T4,
  arg5: T5,
  arg6: T6,
  arg7: T7,
  arg8: T8,
  arg9: T9,
  arg10: T10,
  arg11: T11,
  arg12: T12,
  arg13: T13,
  arg14: T14,
  arg15: T15
) => T;

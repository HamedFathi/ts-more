/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */

export function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

export function getObjectKeyValuePairs(
  obj: any,
  separator: string = '.'
): [string, any][] {
  return extract(obj, separator);
  function extract(
    obj: any,
    separator: string,
    parentKey?: string
  ): [string, any][] {
    const keys: [string, any][] = [];
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        const newKey = parentKey ? `${parentKey}${separator}${key}` : key;
        if (typeof value === 'object') {
          keys.push(...extract(value, separator, newKey));
        } else {
          keys.push([newKey, value]);
        }
      }
    }
    return keys;
  }
}

export interface JsonPropertyInfo {
  name: string;
  value: any;
  type: any;
}
export class JsonUtilities {
  public static getAllInfo(obj: any): JsonPropertyInfo[] {
    const result: JsonPropertyInfo[] = [];
    const walked = [];
    const stack = [{ obj: obj, stack: "" }];
    while (stack.length > 0) {
      const item = stack.pop() as any;
      const obj = item.obj;
      for (const property in obj) {
        if (obj.hasOwnProperty(property)) {
          if (typeof obj[property] == "object" && obj[property]) {
            let alreadyFound = false;
            for (let i = 0; i < walked.length; i++) {
              if (walked[i] === obj[property]) {
                alreadyFound = true;
                break;
              }
            }
            if (!alreadyFound) {
              walked.push(obj[property]);
              stack.push({
                obj: obj[property],
                stack: item.stack + "." + property,
              });
              result.push({
                name: (item.stack + "." + property)
                  .replace(/^\./, "")
                  .replace(/\.$/, "")
                  .trim(),
                value: obj[property],
                type: typeof obj[property],
              });
            }
          }
          // null is an object!
          else if (typeof obj[property] == "object" && !obj[property]) {
            result.push({
              name: (item.stack + "." + property)
                .replace(/^\./, "")
                .replace(/\.$/, "")
                .trim(),
              value: null,
              type: null,
            });
          } else {
            result.push({
              name: (item.stack + "." + property)
                .replace(/^\./, "")
                .replace(/\.$/, "")
                .trim(),
              value: obj[property],
              type: typeof obj[property],
            });
          }
        }
      }
    }
    return result;
  }

  public static getAllProperties(obj: any, withoutIndexer = false): string[] {
    const result: string[] = [];
    const props = this.getAllInfo(obj);
    for (let index = 0; index < props.length; index++) {
      const prop = props[index];
      if (withoutIndexer) {
        const newProp = prop.name.replaceAll(/\.[0-9]+/g, "");
        if (!result.includes(newProp)) {
          result.push(newProp);
        }
      } else {
        result.push(prop.name);
      }
    }
    return result;
  }
  public static getAllPropertiesWithType(
    obj: any,
    withoutIndexer = false
  ): string[] {
    const result: string[] = [];
    const props = this.getAllInfo(obj);
    for (let index = 0; index < props.length; index++) {
      const prop = props[index];
      if (withoutIndexer) {
        const newProp = prop.name.replaceAll(/\.[0-9]+/g, "");
        if (!result.includes(newProp)) {
          result.push(newProp + "-" + prop.type);
        }
      } else {
        result.push(prop.name + "-" + prop.type);
      }
    }
    return result;
  }

  public static getDifferencesOfFirstArray(
    arr1: string[],
    arr2: string[]
  ): string[] {
    const difference = arr1.filter((x) => !arr2.includes(x));
    return difference;
  }

  public static getDifferencesOf(arr1: string[], arr2: string[]): string[] {
    const difference = arr1
      .filter((x) => !arr2.includes(x))
      .concat(arr2.filter((x) => !arr1.includes(x)));
    return difference;
  }

  public static IsFirstArraySubsetOfSecondArray(
    arr1: string[],
    arr2: string[]
  ): boolean {
    const result = arr1.every((val) => arr2.includes(val));
    return result;
  }

  public static getEqualValuesOf(arr1: string[], arr2: string[]): string[] {
    const values = arr1
      .filter((x) => arr2.includes(x))
      .concat(arr2.filter((x) => arr1.includes(x)));

    const uniqueValues = [...new Set(values)];
    return uniqueValues;
  }
}

export function unflatten(data: { [x: string]: any; }) {
  if (Object(data) !== data || Array.isArray(data))
    return data;
  var result: any = {}, cur, prop, parts, idx;
  for (var p in data) {
    cur = result, prop = "";
    parts = p.split(".");
    for (var i = 0; i < parts.length; i++) {
      idx = !isNaN(parseInt(parts[i]));
      cur = cur[prop] || (cur[prop] = (idx ? [] : {}));
      prop = parts[i];
    }
    cur[prop] = data[p];
  }
  return result[""];
}

export function flatten(data: any) {
  var result: any = {};
  function recurse(cur: any, prop: any) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++)
        recurse(cur[i], prop ? prop + "." + i : "" + i);
      if (l == 0)
        result[prop] = [];
    } else {
      var isEmpty = true;
      for (var p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? prop + "." + p : p);
      }
      if (isEmpty)
        result[prop] = {};
    }
  }
  recurse(data, "");
  return result;
}
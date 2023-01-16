export function isPalindrome(str: string): boolean {
  return str === str.split("").reverse().join("");
}
export function caseInsensitiveCompare(str1: string, str2: string): boolean {
    return str1.toLowerCase() === str2.toLowerCase();
}

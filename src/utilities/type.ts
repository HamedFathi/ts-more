export function getType(val: any): string {
    return Object.prototype.toString.call(val).slice(8, -1);
}

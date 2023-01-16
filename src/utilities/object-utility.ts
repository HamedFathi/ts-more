export function instanceOf(object: any, constructor: any): boolean {
    while (object != null) {
        if (object.constructor === constructor) return true;
        object = Object.getPrototypeOf(object);
    }
    return false;
}

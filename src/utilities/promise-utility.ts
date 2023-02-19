export async function promiseWrap<T>(promise: Promise<T>, finaly?: () => void) {
    try {
        const data = await promise;
        return [data, undefined];
    } catch (err) {
        return [undefined, err];
    }
    finally {
        if (finaly) {
            finaly();
        }
    }
}
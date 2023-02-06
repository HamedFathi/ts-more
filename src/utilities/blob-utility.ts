// Always use below pattern for base64 argument.
// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgA...
// data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAMgA...
export function base64ToBlob(base64: string) {
  const base64Part = base64.substring(base64.indexOf(",") + 1);
  const formatPart = base64.substring(
    base64.indexOf(":") + 1,
    base64.indexOf(";")
  );
  const binary = toArrayBuffer(atob(base64Part));
  const blob = new Blob([binary], { type: formatPart });
  return blob;
  function toArrayBuffer(base64Image: string) {
    const length = base64Image.length;
    const buf = new ArrayBuffer(length);
    const arr = new Uint8Array(buf);
    for (let i = 0; i < length; i++) {
      arr[i] = base64Image.charCodeAt(i);
    }
    return buf;
  }
}

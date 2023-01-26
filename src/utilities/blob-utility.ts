export async function base64ToBlob(base64: string) {
  const result = await fetch(base64);
  const blob = await result.blob();
  return blob;
}

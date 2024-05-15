export async function handleArrayBufferToBase64(
  buffer: Buffer | ArrayBuffer,
): Promise<string> {
  const arrayBuffer: Uint8Array = new Uint8Array(buffer);
  const base64Image = btoa(String.fromCharCode(...Array.from(arrayBuffer)));
  return `data:image/png;base64,${base64Image}`;
}

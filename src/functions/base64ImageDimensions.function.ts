export default async function handleGetBase64ImageDimensions(
  base64Image: string,
): Promise<{ width: number; height: number }> {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      console.log("img.width", img.width);
      console.log("img.height", img.height);
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      reject(new Error("Fotoğraf yüklenirken bir hata oluştu."));
    };
    img.src = base64Image;
  });
}

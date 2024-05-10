import { ReactElement, useEffect, useState } from "react";
import useFunctions from "../../hooks/useFunctions";

export default function RosMapLayer(): ReactElement {
  const [rosMap, setRosMap] = useState<any | null>(null);

  const { getMapFC } = useFunctions();

  useEffect(() => {
    handleGetRosMap();

    const timer = setInterval(() => {
      handleGetRosMap();
    }, 10000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleGetRosMap() {
    try {
      const response: any = await getMapFC();

      console.log("response", response);

      const base64Image = await handleBufferToBase64(response.map);

      const metaDesc = await getBase64ImageDimensions(base64Image);

      const originMeta = handleCalcOrigin({
        mapOrigin: rosMap?.meta?.origin,
        mapResolution: rosMap?.meta?.resolution,
        mapWidth: rosMap?.meta?.width,
        mapHeight: rosMap?.meta?.height,
      });

      setRosMap({
        map: base64Image,
        meta: {
          ...response.meta,
          width: metaDesc?.width,
          height: metaDesc?.height,
          originXPixel: originMeta?.originXPixel,
          originYPixel: originMeta?.originYPixel,
        },
      });
    } catch (error) {
      console.error("Harita alınamadı:", error);
    }
  }

  async function handleBufferToBase64(buffer: Buffer): Promise<string> {
    const arrayBuffer: Uint8Array = new Uint8Array(buffer);
    const base64Image = btoa(String.fromCharCode(...Array.from(arrayBuffer)));
    return `data:image/png;base64,${base64Image}`;
  }

  function handleCalcOrigin({
    mapOrigin,
    mapResolution,
    mapWidth,
    mapHeight,
  }: {
    mapOrigin: number[];
    mapResolution: number;
    mapWidth: number;
    mapHeight: number;
  }): {
    originXPixel: number;
    originYPixel: number;
  } {
    console.log("mapOrigin", mapOrigin); // [-15.1, -25, 0]
    console.log("mapResolution", mapResolution); // 0.03
    console.log("mapWidth", mapWidth); // 1006
    console.log("mapHeight", mapHeight); // 1674

    const originX = mapOrigin?.[0]; // -15.1
    const originY = mapOrigin?.[1]; // -25

    const originXPixel = mapWidth * mapResolution + originX * mapResolution;
    const originYPixel = mapHeight * mapResolution + originY * mapResolution;

    console.log("originXPixel", originXPixel);
    console.log("originYPixel", originYPixel);

    return {
      originXPixel,
      originYPixel,
    };
  }

  function getBase64ImageDimensions(
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

  return (
    <div>
      <img
        style={{
          position: "absolute",
          zIndex: 20,
          opacity: 0.5,
          left: rosMap?.meta?.originXPixel || 0,
          width: rosMap?.meta?.width,
          height: rosMap?.meta?.height,
        }}
        src={rosMap?.map}
        alt="rosMap"
      />
    </div>
  );
}

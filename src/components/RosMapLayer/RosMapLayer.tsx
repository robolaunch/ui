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
      const { map, meta } = await getMapFC();
      console.log("response", { map, meta });

      const base64Image = await handleBufferToBase64(map as Buffer);

      const mapDimensions = await getBase64ImageDimensions(base64Image);

      const { originXPixel, originYPixel, mapWidthMeter, mapHeightMeter } =
        handleCalcOrigin({
          mapOrigin: meta?.origin,
          mapResolution: meta?.resolution,
          mapWidth: mapDimensions?.width,
          mapHeight: mapDimensions?.height,
        });

      console.log({
        map: base64Image,
        meta: {
          ...meta,
          width: mapDimensions?.width,
          height: mapDimensions?.height,
          originXPixel,
          originYPixel,
          mapWidthMeter,
          mapHeightMeter,
        },
      });

      setRosMap({
        map: base64Image,
        meta: {
          ...meta,
          width: mapDimensions?.width,
          height: mapDimensions?.height,
          originXPixel,
          originYPixel,
          mapWidthMeter,
          mapHeightMeter,
          originX: meta?.origin?.[0],
          originY: meta?.origin?.[1],
        },
      });
    } catch (error) {
      console.error("Harita alınamadı:", error);
    }
  }

  useEffect(() => {
    console.log("rosMap", rosMap);
  }, [rosMap]);

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
    mapWidthMeter: number;
    mapHeightMeter: number;
    originX: number;
    originY: number;
  } {
    console.log("mapOrigin", mapOrigin); // [-15.1, -25, 0]
    console.log("mapResolution", mapResolution); // 0.03
    console.log("mapWidth", mapWidth); // 1006
    console.log("mapHeight", mapHeight); // 1674

    const originX = mapOrigin?.[0]; // -15.1
    const originY = mapOrigin?.[1]; // -25

    const mapWidthMeter = mapWidth * mapResolution;
    const mapHeightMeter = mapHeight * mapResolution;

    console.log("mapWidthMeter", mapWidthMeter);
    console.log("mapHeightMeter", mapHeightMeter);

    const originXPixel = mapWidthMeter + originX;
    const originYPixel = mapHeightMeter + originY;

    console.log("originXPixel", originXPixel);
    console.log("originYPixel", originYPixel);

    return {
      mapWidthMeter,
      mapHeightMeter,
      originX,
      originY,
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

  const scale = 100;

  return (
    <img
      style={{
        position: "absolute",
        zIndex: 20,
        opacity: 0.5,
        left:
          (rosMap?.meta?.mapWidthMeter * scale +
            rosMap?.meta?.originX * scale) *
          -1,
        top:
          (rosMap?.meta?.mapHeightMeter * scale +
            rosMap?.meta?.originY * scale) *
          -1,
        width: rosMap?.meta?.mapWidthMeter * scale,
        height: rosMap?.meta?.mapHeightMeter * scale,
      }}
      src={rosMap?.map}
      alt="rosMap"
    />
  );
}

import { createContext, useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { getMap } from "../toolkit/BarcodeSlice";
import { handleArrayBufferToBase64 } from "../functions/arrayBufferToBase64.function";
import handleGetBase64ImageDimensions from "../functions/base64ImageDimensions.function";

export const RosContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const scale = 100;
  const [rosMap, setRosMap] = useState<{
    map: string;
    meta: {
      originX_YAML: any;
      originY_YAML: any;
      resolution_YAML: any;
      mapWidthMeter: number;
      mapHeightMeter: number;
      mapWidthPixel: number;
      mapHeightPixel: number;
    };
  } | null>(null);

  const dispatch = useAppDispatch();

  // handleGetRosMap function will be called every 6 seconds
  useEffect(() => {
    handleGetRosMap();

    const timer = setInterval(() => {
      handleGetRosMap();
    }, 6000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // handleGetRosMap function will be called every 6 seconds

  async function handleGetRosMap() {
    try {
      const { payload }: any = await dispatch(getMap());

      const base64Map = await handleArrayBufferToBase64(
        payload.map as ArrayBuffer,
      );

      const mapDimensions = await handleGetBase64ImageDimensions(base64Map);

      const meta = {
        originX_YAML: payload.meta.origin[0],
        originY_YAML: payload.meta.origin[1],
        resolution_YAML: payload.meta.resolution,
        mapWidthMeter: mapDimensions?.width * payload.meta.resolution,
        mapHeightMeter: mapDimensions?.height * payload.meta.resolution,
        mapWidthPixel: mapDimensions?.width,
        mapHeightPixel: mapDimensions?.height,
      };

      setRosMap({
        map: base64Map,
        meta: meta,
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <RosContext.Provider
      value={{
        scale,
        rosMap,
      }}
    >
      {children}
    </RosContext.Provider>
  );
};

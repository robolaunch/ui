import { Fragment, ReactElement, useEffect, useState } from "react";
import handleGetBase64ImageDimensions from "../../functions/base64ImageDimensions.function";
import useRos from "../../hooks/useRos";

export default function RosFloorMapLayer(): ReactElement {
  const { rosMap, scale } = useRos();

  const [staticMapDimensions, setStaticMapDimensions] = useState<{
    width: number;
    height: number;
  }>({
    height: 0,
    width: 0,
  });

  async function handleSetterStaticMapDimensions() {
    const values = await handleGetBase64ImageDimensions("/images/map.png");
    setStaticMapDimensions(values);
  }

  useEffect(() => {
    handleSetterStaticMapDimensions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <img
        src="/images/map.png"
        alt="floorMap"
        style={{
          position: "absolute",
          display: "block",
          zIndex: 10,
          height:
            staticMapDimensions?.height * rosMap?.meta?.resolution_YAML * scale,
          width:
            staticMapDimensions?.width * rosMap?.meta?.resolution_YAML * scale,

          minHeight:
            staticMapDimensions?.height * rosMap?.meta?.resolution_YAML * scale,
          minWidth:
            staticMapDimensions?.width * rosMap?.meta?.resolution_YAML * scale,
          left: rosMap?.meta?.originX_YAML * scale,
          bottom: rosMap?.meta?.originY_YAML * scale,
        }}
      />
    </Fragment>
  );
}

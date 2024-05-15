import { Fragment, ReactElement } from "react";
import useRos from "../../hooks/useRos";

export default function RosMapLayer(): ReactElement {
  const { rosMap, scale } = useRos();

  return (
    <Fragment>
      <img
        src={rosMap?.map}
        alt="rosMap"
        style={{
          position: "absolute",
          display: "block",
          zIndex: 20,
          opacity: 0.2,
          left: rosMap?.meta?.originX_YAML * scale,
          bottom: rosMap?.meta?.originY_YAML * scale,
          width: rosMap?.meta?.mapWidthMeter * scale,
          height: rosMap?.meta?.mapHeightMeter * scale,
          minWidth: rosMap?.meta?.mapWidthMeter * scale,
          minHeight: rosMap?.meta?.mapHeightMeter * scale,
        }}
      />
    </Fragment>
  );
}

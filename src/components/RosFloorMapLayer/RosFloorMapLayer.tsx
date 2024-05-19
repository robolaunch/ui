import { Fragment, ReactElement, useEffect, useRef, useState } from "react";
import handleGetBase64ImageDimensions from "../../functions/base64ImageDimensions.function";
import useRos from "../../hooks/useRos";
import useMouse from "@react-hook/mouse-position";
import useTaskManagement from "../../hooks/useTaskManagement";

export default function RosFloorMapLayer(): ReactElement {
  const { rosMap, scale } = useRos();

  const {
    activeWaypoint,
    boardScale,
    handleAddWaypointToJob,
    handleUpdateWaypointForJob,
  } = useTaskManagement();

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

  const dimensions = {
    height:
      staticMapDimensions?.height * rosMap?.meta?.resolution_YAML * scale || 0,
    width:
      staticMapDimensions?.width * rosMap?.meta?.resolution_YAML * scale || 0,
    left: rosMap?.meta?.originX_YAML * scale || 0,
    bottom: rosMap?.meta?.originY_YAML * scale || 0,
  };

  const mouseRef = useRef<any>(null);
  const mouse = useMouse(mouseRef, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  const stick = () => {
    return (
      <p
        style={{
          position: "relative",
          left: (mouse.x || 0) / boardScale,
          top: (mouse.y || 0) / boardScale,
          zIndex: 1000000,
          color: "red",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        {`
      ${((mouse.x || 0) / boardScale / 100 + rosMap?.meta?.originX_YAML)?.toFixed(2)}
      ${-((mouse.y || 0) / boardScale / 100 + rosMap?.meta?.originY_YAML)?.toFixed(2)}
      ${boardScale}

      `}
      </p>
    );
  };

  return (
    <Fragment>
      <div
        onContextMenu={(e) => {
          e.preventDefault();

          const mouseX =
            (mouse.x || 0) / boardScale / 100 + rosMap?.meta?.originX_YAML;
          const mouseY = -(
            (mouse.y || 0) / boardScale / 100 +
            rosMap?.meta?.originY_YAML
          );

          const waypoint = {
            position: {
              x: mouseX,
              y: mouseY,
              z: 0.00001,
            },
            orientation: {
              x: 0.00001,
              y: 0.00001,
              z: 0.00001,
              w: 0.00001,
            },
          };

          if (typeof activeWaypoint === "number") {
            handleUpdateWaypointForJob(waypoint);
          } else {
            handleAddWaypointToJob(waypoint);
          }
        }}
        ref={mouseRef}
        style={{
          position: "absolute",
          zIndex: 10,
          backgroundColor: "green",
          opacity: 0.5,
          height: dimensions.height,
          width: dimensions.width,
          minHeight: dimensions.height,
          minWidth: dimensions.width,
          left: dimensions.left,
          bottom: dimensions.bottom,
        }}
      />
      <img
        src="/images/map.png"
        alt="floorMap"
        style={{
          position: "absolute",
          display: "block",
          zIndex: 10,
          height: dimensions.height,
          width: dimensions.width,

          minHeight: dimensions.height,
          minWidth: dimensions.width,
          left: dimensions.left,
          bottom: dimensions.bottom,
        }}
      />
    </Fragment>
  );
}

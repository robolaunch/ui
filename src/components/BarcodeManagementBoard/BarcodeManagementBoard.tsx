import { Fragment, ReactElement, useState } from "react";
import BarcodeManagementWorkspace from "../BarcodeManagementWorkspace/BarcodeManagementWorkspace";
import useBarcode from "../../hooks/useBarcode";
import BarcodeItem from "../BarcodeItem/BarcodeItem";
import RosMapLayer from "../RosMapLayer/RosMapLayer";
import RobotLocationLayer from "../RobotLocationLayer/RobotLocationLayer";
import RosFloorMapLayer from "../RosFloorMapLayer/RosFloorMapLayer";
import useTaskManagement from "../../hooks/useTaskManagement";

export default function BarcodeManagementBoard(): ReactElement {
  const [dragging, setDragging] = useState<boolean>(false);
  const { barcodeItems } = useBarcode();
  const { waypoints } = useTaskManagement();

  return (
    <BarcodeManagementWorkspace dragging={dragging} setDragging={setDragging}>
      <div className="relative z-40 h-full gap-10 bg-white">
        {barcodeItems?.length
          ? barcodeItems?.map((barcodeItem, barcodeItemIndex: number) => {
              return (
                <BarcodeItem
                  dragging={dragging}
                  key={barcodeItemIndex}
                  barcodeItem={barcodeItem}
                  barcodeItemIndex={barcodeItemIndex}
                />
              );
            })
          : ""}
      </div>
      <Fragment>
        {waypoints?.map((waypoint, index) => {
          return (
            <div
              className="absolute h-1 w-1 rounded-full bg-orange-500"
              key={index}
              style={{
                position: "absolute",
                left: waypoint.position_x * 100,
                bottom: waypoint.position_y * 100,
                zIndex: 100,
              }}
            />
          );
        })}
      </Fragment>
      <div
        className="absolute h-1 w-1 rounded-full bg-red-500"
        style={{
          left: 0,
          bottom: 0,
          zIndex: 50,
        }}
      />
      <RobotLocationLayer />
      <RosMapLayer />
      <RosFloorMapLayer />
    </BarcodeManagementWorkspace>
  );
}

import BarcodeManagementWorkspace from "../BarcodeManagementWorkspace/BarcodeManagementWorkspace";
import RobotLocationLayer from "../RobotLocationLayer/RobotLocationLayer";
import BoardWaypointPoint from "../BoardWaypointPoint/BoardWaypointPoint";
import RosFloorMapLayer from "../RosFloorMapLayer/RosFloorMapLayer";
import BoardPointCenter from "../BoardPointCenter/BoardPointCenter";
import useTaskManagement from "../../hooks/useTaskManagement";
import BarcodeItem from "../BarcodeItem/BarcodeItem";
import RosMapLayer from "../RosMapLayer/RosMapLayer";
import useBarcode from "../../hooks/useBarcode";
import { Fragment, ReactElement } from "react";

export default function TaskManagementBoard(): ReactElement {
  const { barcodeItems } = useBarcode();
  const { activeJob, jobs } = useTaskManagement();

  return (
    <BarcodeManagementWorkspace>
      <div className="relative z-40 h-full gap-10 bg-white">
        {barcodeItems?.length
          ? barcodeItems?.map((barcodeItem, barcodeItemIndex: number) => {
              return (
                <BarcodeItem
                  key={barcodeItemIndex}
                  barcodeItem={barcodeItem}
                  barcodeItemIndex={barcodeItemIndex}
                />
              );
            })
          : ""}
      </div>
      <Fragment>
        {typeof activeJob === "number" &&
          jobs?.[activeJob]?.waypoints?.map((waypoint, index) => {
            return (
              <BoardWaypointPoint
                index={index}
                waypoint={waypoint}
                key={index}
              />
            );
          })}
      </Fragment>
      <BoardPointCenter />
      <RobotLocationLayer />
      <RosMapLayer />
      <RosFloorMapLayer />
    </BarcodeManagementWorkspace>
  );
}

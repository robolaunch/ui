import { Fragment, ReactElement, useState } from "react";
import BarcodeManagementWorkspace from "../BarcodeManagementWorkspace/BarcodeManagementWorkspace";
import useBarcode from "../../hooks/useBarcode";
import BarcodeItem from "../BarcodeItem/BarcodeItem";
import RosMapLayer from "../RosMapLayer/RosMapLayer";
import RobotLocationLayer from "../RobotLocationLayer/RobotLocationLayer";
import RosFloorMapLayer from "../RosFloorMapLayer/RosFloorMapLayer";
import useTaskManagement from "../../hooks/useTaskManagement";
import BoardWaypointPoint from "../BoardWaypointPoint/BoardWaypointPoint";
import BoardPointCenter from "../BoardPointCenter/BoardPointCenter";

export default function BarcodeManagementBoard(): ReactElement {
  const [dragging, setDragging] = useState<boolean>(false);
  const { barcodeItems } = useBarcode();
  const { waypoints } = useTaskManagement();

  return (
    <BarcodeManagementWorkspace>
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
          return <BoardWaypointPoint waypoint={waypoint} key={index} />;
        })}
      </Fragment>
      <BoardPointCenter />
      <RobotLocationLayer />
      <RosMapLayer />
      <RosFloorMapLayer />
    </BarcodeManagementWorkspace>
  );
}

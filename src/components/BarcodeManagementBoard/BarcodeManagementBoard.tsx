import { ReactElement, useState } from "react";
import BarcodeManagementWorkspace from "../BarcodeManagementWorkspace/BarcodeManagementWorkspace";
import useBarcode from "../../hooks/useBarcode";
import BarcodeItem from "../BarcodeItem/BarcodeItem";
import RosMapLayer from "../RosMapLayer/RosMapLayer";
import RobotLocationLayer from "../RobotLocationLayer/RobotLocationLayer";
import RosFloorMapLayer from "../RosFloorMapLayer/RosFloorMapLayer";

export default function BarcodeManagementBoard(): ReactElement {
  const [dragging, setDragging] = useState<boolean>(false);
  const { barcodeItems } = useBarcode();

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

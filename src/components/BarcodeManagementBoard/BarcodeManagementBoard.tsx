import { ReactElement, useState } from "react";
import BarcodeManagementWorkspace from "../BarcodeManagementWorkspace/BarcodeManagementWorkspace";
import useBarcode from "../../hooks/useBarcode";
import BarcodeItem from "../BarcodeItem/BarcodeItem";
import RosMapLayer from "../RosMapLayer/RosMapLayer";
import RobotLocationLayer from "../RobotLocationLayer/RobotLocationLayer";

export default function BarcodeManagementBoard(): ReactElement {
  const [dragging, setDragging] = useState<boolean>(false);
  const { barcodeItems } = useBarcode();

  return (
    <BarcodeManagementWorkspace dragging={dragging} setDragging={setDragging}>
      {/* <div className="relative z-40 h-full gap-10 bg-white">
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
      </div> */}
      <div
        className="absolute h-2 w-2 rounded-full bg-primary-500"
        style={{
          left: 0,
          bottom: 0,
          zIndex: 50,
        }}
      />
      <div
        className="absolute h-20 w-20 rounded-full bg-secondary-500"
        style={{
          left: `5030px`,
          bottom: `${16740 - 8330}px`,
          zIndex: 50,
        }}
      />
      {/* 
      <div
        style={{
          top: -475,
          left: 75,
          width: 100,
          height: 500,
          position: "absolute",
          backgroundColor: "blue",
          opacity: 0.25,
          zIndex: 30,
        }}
      >
        <p>Region #1</p>
      </div> */}
      <RobotLocationLayer />
      <RosMapLayer />
      {/* <img
        style={{
          position: "absolute",
          rotate: "90deg",
        }}
        src="/images/global_map.png"
        alt="map"
      /> */}
      {/* <div className="relative h-full">
        <iframe
          title="map"
          style={{
            minWidth: "100%",
            minHeight: "100%",
            position: "absolute",
            zIndex: 50,
            top: 0,
            left: 0,
          }}
          src={`/html/rosMap.html?ws=ws://localhost:9090`}
        />
      </div> */}
    </BarcodeManagementWorkspace>
  );
}

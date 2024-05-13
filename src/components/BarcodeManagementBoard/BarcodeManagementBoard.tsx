import { ReactElement, useState } from "react";
import BarcodeManagementWorkspace from "../BarcodeManagementWorkspace/BarcodeManagementWorkspace";
import useBarcode from "../../hooks/useBarcode";
import BarcodeItem from "../BarcodeItem/BarcodeItem";
import RosMapLayer from "../RosMapLayer/RosMapLayer";

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
        className="absolute h-[2px] w-[2px] rounded-full bg-primary-500"
        style={{
          top: 0,
          left: 0,
          zIndex: 50,
        }}
      />
      <div
        className="absolute h-[2px] w-[2px] rounded-full bg-secondary-500"
        style={{
          left: "-199px",
          top: "-49px",
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
      <RosMapLayer />
      {/* <img
        style={{
          position: "absolute",
          rotate: "90deg",
        }}
        src="/images/global_map.png"
        alt="map"
      /> */}
    </BarcodeManagementWorkspace>
  );
}

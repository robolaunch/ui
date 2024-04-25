import { ReactElement, useState } from "react";
import BarcodeManagementWorkspace from "../BarcodeManagementWorkspace/BarcodeManagementWorkspace";
import useBarcode from "../../hooks/useBarcode";
import BarcodeItem from "../BarcodeItem/BarcodeItem";

export default function BarcodeManagementBoard(): ReactElement {
  const [dragging, setDragging] = useState<boolean>(false);
  const { barcodeItems } = useBarcode();

  return (
    <BarcodeManagementWorkspace dragging={dragging} setDragging={setDragging}>
      <div className="relative h-full gap-10 bg-white">
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
        className="absolute h-5 w-5 rounded-full bg-primary-500"
        style={{
          top: 0,
          left: 0,
        }}
      />
    </BarcodeManagementWorkspace>
  );
}

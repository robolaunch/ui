import { ReactElement, useState } from "react";
import BarcodeManagementSidebar from "../../../components/BarcodeManagementSidebar/BarcodeManagementSidebar";
import BarcodeManagementWorkspace from "../../../components/BarcodeManagementWorkspace/BarcodeManagementWorkspace";
import useBarcode from "../../../hooks/useBarcode";
import BarcodeItem from "../../../components/BarcodeItem/BarcodeItem";

export default function BarcodeManagement(): ReactElement {
  const [dragging, setDragging] = useState<boolean>(false);
  const { barcodeItems } = useBarcode();

  return (
    <div className="flex h-full w-full gap-6">
      <BarcodeManagementSidebar />
      <BarcodeManagementWorkspace>
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
            top: 100,
            left: -100,
          }}
        />
      </BarcodeManagementWorkspace>
    </div>
  );
}

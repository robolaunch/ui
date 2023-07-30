import React, { ReactElement, useEffect } from "react";
import RosBarcodeMapItem from "../RosBarcodeMapItem/RosBarcodeMapItem";
import saveAs from "file-saver";
import useBarcodeManagement from "../../hooks/useBarcode";

interface IRosBarcodeMap {
  ros: any;
}

export default function RosBarcodeMapItems({
  ros,
}: IRosBarcodeMap): ReactElement {
  const { barcodeItems } = useBarcodeManagement();

  useEffect(() => {
    console.log("barcodeItems", barcodeItems);
  }, [barcodeItems]);

  function handleExportJSON() {
    var blob = new Blob([JSON.stringify(barcodeItems)], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, `missions.json`);
  }

  return (
    <div className="absolute inset-0" id="barcode">
      {barcodeItems.map((item: any, index: number) => {
        return <RosBarcodeMapItem item={item} key={index} />;
      })}
      <div
        onClick={() => handleExportJSON()}
        className="absolute bottom-2 right-2 text-xs"
      >
        exp{" "}
      </div>
    </div>
  );
}

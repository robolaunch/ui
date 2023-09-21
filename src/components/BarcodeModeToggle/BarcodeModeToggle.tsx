import React, { ReactElement } from "react";
import { BsFullscreen } from "react-icons/bs";
import useBarcode from "../../hooks/useBarcode";
import saveAs from "file-saver";

interface IBarcodeModeToggle {
  handleFullScreen: any;
  activeTab: string;
  setActiveTab: any;
}

export default function BarcodeModeToggle({
  handleFullScreen,
  activeTab,
  setActiveTab,
}: IBarcodeModeToggle): ReactElement {
  const { barcodeItems } = useBarcode();

  function handleExportJSON() {
    var blob = new Blob([JSON.stringify(barcodeItems)], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, `barcode.json`);
  }

  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-4">
      <div
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded bg-layer-light-100 transition-all duration-300"
        onClick={() => setActiveTab(activeTab === "2D" ? "3D" : "2D")}
      >
        {activeTab === "2D" ? "3D" : "2D"}
      </div>

      <div
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded bg-layer-light-100 transition-all duration-300"
        onClick={handleFullScreen.enter}
      >
        <BsFullscreen size={20} />
      </div>
      <div
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded bg-layer-light-100 transition-all duration-300"
        onClick={handleExportJSON}
      >
        export
      </div>
    </div>
  );
}

import { ReactElement } from "react";
import { BsFullscreen } from "react-icons/bs";
import useBarcode from "../../hooks/useBarcode";
import saveAs from "file-saver";
import BarcodeFinder from "../BarcodeFinder/BarcodeFinder";
import BarcodeManagementButton from "../BarcodeManagementButton/BarcodeManagementButton";
import { PiExport } from "react-icons/pi";

interface IBarcodeModeToggle {
  handleFullScreen: any;
}

export default function BarcodeModeToggle({
  handleFullScreen,
}: IBarcodeModeToggle): ReactElement {
  const { barcodeItems } = useBarcode();

  function handleExportJSON() {
    var blob = new Blob([JSON.stringify(barcodeItems)], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, `barcode.json`);
  }

  return (
    <div className="absolute bottom-4 left-4 flex flex-col gap-4">
      <BarcodeManagementButton
        icon={<BsFullscreen size={20} />}
        onClick={handleFullScreen.enter}
      />

      <BarcodeManagementButton
        icon={<PiExport size={20} />}
        onClick={handleExportJSON}
      />

      <BarcodeFinder />
    </div>
  );
}

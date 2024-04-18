import { ReactElement } from "react";
import { BsFullscreen } from "react-icons/bs";
import useBarcode from "../../hooks/useBarcode";
import saveAs from "file-saver";
import BarcodeFinder from "../BarcodeFinder/BarcodeFinder";
import BarcodeManagementButton from "../BarcodeManagementButton/BarcodeManagementButton";
import { PiExport } from "react-icons/pi";
import useFunctions from "../../hooks/useFunctions";
import { IoArchiveOutline } from "react-icons/io5";

interface IBarcodeModeToggle {
  handleFullScreen: any;
}

export default function BarcodeModeToggle({
  handleFullScreen,
}: IBarcodeModeToggle): ReactElement {
  const { barcodeItems, handleReload } = useBarcode();
  const { createSnapshotFC } = useFunctions();

  function handleExportJSON() {
    var blob = new Blob([JSON.stringify(barcodeItems)], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, `barcode.json`);
  }

  function handleCreateSnapshot() {
    createSnapshotFC();
    handleReload();
  }

  return (
    <div className="absolute bottom-4 left-4 flex flex-col gap-4">
      <BarcodeManagementButton
        icon={<IoArchiveOutline size={20} />}
        onClick={() => handleCreateSnapshot()}
      />
      <BarcodeManagementButton
        icon={<BsFullscreen size={20} />}
        onClick={handleFullScreen}
      />

      <BarcodeManagementButton
        icon={<PiExport className="rotate-180" size={20} />}
        onClick={handleExportJSON}
      />

      <BarcodeFinder />
    </div>
  );
}

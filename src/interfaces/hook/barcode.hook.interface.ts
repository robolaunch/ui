import { IBarcodeItem, IBarcodeSnapshot } from "../global/barcode.interface";
import { SetStateAction } from "react";

export interface IuseBarcode {
  barcodeItems: IBarcodeItem[];
  setBarcodeItems: SetStateAction<IBarcodeItem[]>;
  findBarcodeInput: any;
  setFindBarcodeInput: any;
  snapshots: IBarcodeSnapshot[];
  setSnapshots: SetStateAction<IBarcodeSnapshot[]>;
  selectedSnapshot: IBarcodeSnapshot | null;
  setSelectedSnapshot: React.Dispatch<SetStateAction<IBarcodeSnapshot | null>>;
  reload: boolean;
  handleReload: () => void;
}

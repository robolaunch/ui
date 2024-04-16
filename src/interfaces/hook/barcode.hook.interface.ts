import { SetStateAction } from "react";
import { IBarcodeItem } from "../global/barcode.interface";

export interface IuseBarcode {
  robotLocation: any;
  setRobotLocation: any;
  barcodeItems: IBarcodeItem[];
  setBarcodeItems: SetStateAction<IBarcodeItem[]>;
  findBarcodeInput: any;
  setFindBarcodeInput: any;
}

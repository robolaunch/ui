import { IBarcodeItem, IBarcodeSnapshot } from "../global/barcode.interface";
import { Dispatch, SetStateAction } from "react";
import { ILogItem } from "../global/log.interface";

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
  logs: ILogItem[];
  setLogs: Dispatch<SetStateAction<ILogItem[]>>;
  selectedLog: ILogItem | null;
  setSelectedLog: Dispatch<SetStateAction<ILogItem | null>>;
  currentLog: string | null;
  setCurrentLog: Dispatch<SetStateAction<string | null>>;
}

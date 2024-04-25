import { Dispatch, SetStateAction } from "react";
import { ILogItem } from "../global/log.interface";

export interface IuseLog {
  logs: ILogItem[];
  setLogs: Dispatch<SetStateAction<ILogItem[]>>;
  selectedLog: ILogItem | null;
  setSelectedLog: Dispatch<SetStateAction<ILogItem | null>>;
  currentLog: string | null;
  setCurrentLog: Dispatch<SetStateAction<string | null>>;
}

import { ISystemStatus, ISystemStatusBE } from "../interfaces/system.interface";

export function systemStatusMapper(data: ISystemStatusBE[]): ISystemStatus {
  return {
    operators: data?.find((item) => item.name === "robolaunch Operators") || {
      log: "",
      status: "",
    },
    backend: data?.find((item) => item.name === "robolaunch Backend") || {
      log: "",
      status: "",
    },
  };
}

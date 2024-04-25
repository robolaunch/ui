import { useContext } from "react";
import { LogContext } from "../contexts/LogContext";
import { IuseLog } from "../interfaces/hook/log.hook.interface";

const useLog = () => {
  const useLog: IuseLog = useContext(LogContext);

  return useLog;
};

export default useLog;

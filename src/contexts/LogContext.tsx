import { createContext, useEffect, useState } from "react";
import useFunctions from "../hooks/useFunctions";
import { ILogItem } from "../interfaces/global/log.interface";

export const LogContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [logs, setLogs] = useState<ILogItem[]>([]);
  const [selectedLog, setSelectedLog] = useState<ILogItem | null>(null);
  const [currentLog, setCurrentLog] = useState<string | null>(null);

  const { getLogFC } = useFunctions();

  useEffect(() => {
    selectedLog &&
      handleGetLog({
        logName: selectedLog.path,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLog]);

  async function handleGetLog({ logName }: { logName: string }) {
    setCurrentLog((await getLogFC({ logName: logName })) || "");
  }

  return (
    <LogContext.Provider
      value={{
        logs,
        setLogs,
        selectedLog,
        setSelectedLog,
        currentLog,
        setCurrentLog,
      }}
    >
      {children}
    </LogContext.Provider>
  );
};

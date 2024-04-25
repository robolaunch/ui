import { Fragment, ReactElement, useEffect } from "react";
import useFunctions from "../../hooks/useFunctions";
import Card from "../Card/Card";
import useLog from "../../hooks/useLog";

export default function RMSLogMapper(): ReactElement {
  useEffect(() => {
    handleGetLogs();

    return () => {
      setSelectedLog(null);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getLogsFC } = useFunctions();
  const { logs, setLogs, selectedLog, setSelectedLog } = useLog();

  async function handleGetLogs() {
    setLogs(await getLogsFC());
  }

  return (
    <Fragment>
      {logs
        ?.filter((log) => !log?.isDirectory)
        ?.map((log, index: number) => {
          return (
            <Card
              key={index}
              onClick={() => setSelectedLog(log)}
              className={`flex !h-28 cursor-pointer flex-col items-center justify-center gap-1 p-2 py-5 text-xs font-medium shadow-sm ${selectedLog?.name === log?.name ? "border border-primary-500 text-primary-700" : "bg-white text-dark-700"}`}
            >
              <span className="break-all px-6 text-xs">{log?.path}</span>
            </Card>
          );
        })}
    </Fragment>
  );
}

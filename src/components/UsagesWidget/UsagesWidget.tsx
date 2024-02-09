import { ReactElement, useEffect, useState } from "react";
import Widget from "../../layouts/WidgetLayout";
import { GoGraph } from "react-icons/go";
import WidgetCPUCell from "../WidgetCPUCell/WidgetCPUCell";
import WidgetMemoryCell from "../WidgetMemoryCell/WidgetMemoryCell";
import WidgetStorageCell from "../WidgetStorageCell/WidgetStorageCell";
import WidgetUploadCell from "../WidgetUploadCell/WidgetUploadCell";
import WidgetDownloadCell from "../WidgetDownloadCell/WidgetDownloadCell";
import useFunctions from "../../hooks/useFunctions";
import useMain from "../../hooks/useMain";
import WidgetGPUCell from "../WidgetGPUCell/WidgetGPUCell";
import { ISystemStatus } from "../../interfaces/global/system.interface";
import WidgetSystemCell from "../WidgetSystemCell/WidgetSystemCell";

export default function UsagesWidget(): ReactElement {
  const { pagesState } = useMain();

  const { getSystemStatusFC } = useFunctions();

  const [systemStatus, setSystemStatus] = useState<ISystemStatus>();

  useEffect(() => {
    pagesState?.organization?.id &&
      pagesState?.roboticsCloud?.name &&
      pagesState?.instance?.id &&
      handleGetSystemStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesState]);

  function handleGetSystemStatus(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const systemStatus = await getSystemStatusFC();
        setSystemStatus(systemStatus);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  return (
    <Widget
      dataTut="usages-widget"
      title={`Hardware Resources & Usages`}
      subtitle={`Instance Usages`}
      icon={<GoGraph size={20} className="text-light-700" />}
    >
      <div
        className={`grid h-full w-full 
        ${systemStatus?.operators?.log ? "grid-cols-4" : "grid-cols-3"}
         grid-rows-2`}
      >
        <WidgetCPUCell />
        <WidgetGPUCell />
        <WidgetUploadCell />

        {systemStatus?.operators?.log && (
          <WidgetSystemCell
            title="System Status (Operator)"
            data={systemStatus?.operators!}
          />
        )}

        <WidgetMemoryCell />
        <WidgetStorageCell />
        <WidgetDownloadCell />

        {systemStatus?.backend?.log && (
          <WidgetSystemCell
            title="System Status (Backend)"
            data={systemStatus?.backend!}
          />
        )}
      </div>
    </Widget>
  );
}

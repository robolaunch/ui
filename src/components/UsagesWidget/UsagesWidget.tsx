import { ReactElement, useEffect } from "react";
import Widget from "../../layouts/WidgetLayout";
import { GoGraph } from "react-icons/go";
import WidgetCPUCell from "../WidgetCPUCell/WidgetCPUCell";
import WidgetMemoryCell from "../WidgetMemoryCell/WidgetMemoryCell";
import WidgetStorageCell from "../WidgetStorageCell/WidgetStorageCell";
import WidgetUploadCell from "../WidgetUploadCell/WidgetUploadCell";
import WidgetDownloadCell from "../WidgetDownloadCell/WidgetDownloadCell";
import WidgetSystemOperatorCell from "../WidgetSystemOperatorCell/WidgetSystemOperatorCell";
import useFunctions from "../../hooks/useFunctions";
import useMain from "../../hooks/useMain";
import WidgetSystemBackendCell from "../WidgetSystemBackendCell/WidgetSystemBackendCell";
import WidgetGPUCell from "../WidgetGPUCell/WidgetGPUCell";

export default function UsagesWidget(): ReactElement {
  const { pagesState } = useMain();

  const { getSystemStatus } = useFunctions();

  useEffect(() => {
    pagesState?.organization?.id &&
      pagesState?.roboticsCloud?.name &&
      pagesState?.instance?.instanceId &&
      !pagesState?.instance?.systemStatus?.length &&
      getSystemStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesState]);

  return (
    <Widget
      dataTut="usages-widget"
      title={`Hardware Resources & Usages`}
      subtitle={`Instance Usages`}
      icon={<GoGraph size={20} className="text-light-700" />}
    >
      <div
        className={`grid h-full w-full 
        ${
          pagesState?.instance?.systemStatus?.length
            ? "grid-cols-4"
            : "grid-cols-3"
        }
         grid-rows-2`}
      >
        <WidgetCPUCell />
        <WidgetGPUCell />
        <WidgetUploadCell />

        {pagesState?.instance?.systemStatus?.length && (
          <WidgetSystemOperatorCell />
        )}

        <WidgetMemoryCell />
        <WidgetStorageCell />
        <WidgetDownloadCell />

        {pagesState?.instance?.systemStatus?.length && (
          <WidgetSystemBackendCell />
        )}
      </div>
    </Widget>
  );
}

import React, { ReactElement, useMemo } from "react";
import GeneralTable from "../Table/GeneralTable";
import InfoCell from "../Cells/InfoCell";
import { useParams } from "react-router-dom";
import BasicCell from "../Cells/BasicCell";
import StateCell from "../Cells/StateCell";
import LogsCell from "../Cells/LogsCell";

interface ILaunchManagerStepsTable {
  responseLaunchManagers: any;
}

export default function LaunchManagerStepsTable({
  responseLaunchManagers,
}: ILaunchManagerStepsTable): ReactElement {
  const url = useParams();

  const data: any = useMemo(
    () =>
      responseLaunchManagers?.map((step: any) => {
        return {
          key: step?.name,
          name: step?.name,
          workspace: step?.workspace,
          command: step?.command,
          log: [
            step?.robotClusters?.[0]?.launchManagerLog,
            step?.robotClusters?.[1]?.launchManagerLog,
          ],
          state: [
            step?.robotClusters?.[0]?.launchManagerStatus,
            step?.robotClusters?.[1]?.launchManagerStatus,
          ],
        };
      }),
    [responseLaunchManagers]
  );

  const columns: any = useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return (
            <InfoCell
              title={rowData?.name}
              subtitle={url?.instanceName as string}
            />
          );
        },
      },
      {
        key: "workspace",
        header: "workspace",
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.workspace} />;
        },
      },
      {
        key: "state",
        header: "State",
        align: "left",
        body: (rowData: any) => {
          return (
            <div className="flex flex-col gap-2">
              {rowData?.state?.[0] && (
                <div className="flex gap-2">
                  <span className="text-xs">CI:</span>
                  <StateCell state={rowData?.state?.[0]} />
                </div>
              )}
              {rowData?.state?.[1] && (
                <div className="flex gap-2">
                  <span className="text-xs">P I:</span>
                  <StateCell state={rowData?.state?.[1]} />
                </div>
              )}
            </div>
          );
        },
      },
      {
        key: "log",
        header: "log",
        align: "right",
        body: (rowData: any) => {
          return <LogsCell log={rowData?.log?.[0]} />;
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <GeneralTable
      type="launchsmanager"
      title="Launch Manager Steps"
      data={data}
      columns={columns}
      loading={Array.isArray(responseLaunchManagers) ? false : true}
    />
  );
}

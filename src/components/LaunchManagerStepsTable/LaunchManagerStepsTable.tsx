import React, { ReactElement, useMemo } from "react";
import GeneralTable from "../Table/GeneralTable";
import InfoCell from "../Cells/InfoCell";
import { useParams } from "react-router-dom";
import BasicCell from "../Cells/BasicCell";
import Terminal from "../Terminal/Terminal";
import StateCell from "../Cells/StateCell";

interface ILaunchManagerStepsTable {
  responseLaunchManagers: any;
}

export default function LaunchManagerStepsTable({
  responseLaunchManagers,
}: ILaunchManagerStepsTable): ReactElement {
  const url = useParams();

  console.log(responseLaunchManagers);

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
          console.log("x", rowData);
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
        className: "!w-[46rem]",
        body: (rowData: any) => {
          return (
            <div className="float-right h-36 w-[40rem]">
              <Terminal value={rowData?.log?.[0] as string} />
            </div>
          );
        },
      },
    ],
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

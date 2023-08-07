import React, { ReactElement, useMemo } from "react";
import GeneralTable from "../Table/GeneralTable";
import InfoCell from "../Cells/InfoCell";
import { useParams } from "react-router-dom";
import BasicCell from "../Cells/BasicCell";
import StateCell from "../Cells/StateCell";
import LogsCell from "../Cells/LogsCell";

interface IBuildManagerStepsTable {
  responseBuildManager: any;
}

export default function BuildManagerStepsTable({
  responseBuildManager,
}: IBuildManagerStepsTable): ReactElement {
  const url = useParams();

  const data: any = useMemo(
    () =>
      responseBuildManager?.robotBuildSteps?.map((step: any) => {
        return {
          key: step?.name,
          name: step?.name,
          workspace: step?.workspace,
          command: step?.command,
          log: step?.buildLog,
          state: step?.buildStatus,
        };
      }),
    [responseBuildManager]
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
              {rowData?.state && (
                <div className="flex gap-2">
                  <StateCell state={rowData?.state} />
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
          return <LogsCell log={rowData?.log} />;
        },
      },
    ],
    [url?.instanceName]
  );

  return (
    <GeneralTable
      type="buildsmanager"
      title="Build Manager Steps"
      data={data}
      columns={columns}
      loading={!responseBuildManager}
    />
  );
}

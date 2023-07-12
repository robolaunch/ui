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
          state: responseBuildManager?.robotClusters,
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
        body: () => {
          return (
            <div className="flex flex-col gap-2">
              {responseBuildManager?.robotClusters?.[0]?.buildManagerStatus && (
                <div className="flex gap-2">
                  <span className="text-xs">CI:</span>
                  <StateCell
                    state={
                      responseBuildManager?.robotClusters?.[0]
                        ?.buildManagerStatus
                    }
                  />
                </div>
              )}
              {responseBuildManager?.robotClusters?.[1]?.buildManagerStatus && (
                <div className="flex gap-2">
                  <span className="text-xs">P I:</span>
                  <StateCell
                    state={
                      responseBuildManager?.robotClusters?.[1]
                        ?.buildManagerStatus
                    }
                  />
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
    [responseBuildManager?.robotClusters, url?.instanceName]
  );

  console.log("!", responseBuildManager);

  return (
    <GeneralTable
      type="buildsmanager"
      title="Build Manager Steps"
      data={data}
      columns={columns}
      loading={
        Array.isArray(responseBuildManager?.robotBuildSteps) ? false : true
      }
    />
  );
}

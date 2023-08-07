import React, { ReactElement, useMemo } from "react";
import GeneralTable from "../Table/GeneralTable";
import InfoCell from "../Cells/InfoCell";
import { useParams } from "react-router-dom";
import BasicCell from "../Cells/BasicCell";
import StateCell from "../Cells/StateCell";
import LogsCell from "../Cells/LogsCell";
import useRobot from "../../hooks/useRobot";
import TickCell from "../TickCell/TickCell";

interface IBuildManagerStepsTable {
  responseBuildManager: any;
}

export default function BuildManagerStepsTable({
  responseBuildManager,
}: IBuildManagerStepsTable): ReactElement {
  const url = useParams();
  const { robotData } = useRobot();

  const data: any = useMemo(
    () =>
      responseBuildManager?.robotBuildSteps?.map((step: any) => {
        console.log(step);
        return {
          key: step?.name,
          name: step?.name,
          workspace: step?.workspace,
          isRanCloud: step?.instancesName.includes(url?.instanceName),
          isRanPhysical: step?.instancesName.includes(
            robotData?.step1?.physicalInstanceName
          ),
          log: step?.buildLog,
          state: step?.buildStatus,
        };
      }),
    [
      responseBuildManager?.robotBuildSteps,
      robotData?.step1?.physicalInstanceName,
      url?.instanceName,
    ]
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
        key: "isRanCloud",
        header: "Process Scope (Cloud Instance)",
        align: "center",
        body: (rowData: any) => {
          return <TickCell tick={rowData?.isRanCloud} />;
        },
      },
      {
        key: "isRanPhysical",
        header: "Process Scope (Physical Instance)",
        align: "center",
        body: (rowData: any) => {
          return <TickCell tick={rowData?.isRanPhysical} />;
        },
      },
      {
        key: "state",
        header: "State",
        align: "left",
        body: (rowData: any) => {
          return (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <StateCell state={rowData?.state || "Pending"} />
              </div>
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

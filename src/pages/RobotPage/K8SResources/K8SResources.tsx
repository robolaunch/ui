import React, { ReactElement, useMemo } from "react";
import GeneralTable from "../../../components/Table/GeneralTable";
import StateCell from "../../../components/Cells/StateCell";
import InfoCell from "../../../components/Cells/InfoCell";
import { useParams } from "react-router-dom";
import WorkspacesCell from "../../../components/Cells/WorkspacesCell";
import DistroCell from "../../../components/Cells/DistroCell";
interface IK8SResources {
  responseRobot: any;
}

export default function K8SResources({
  responseRobot,
}: IK8SResources): ReactElement {
  const url = useParams();

  const data: any = useMemo(
    () =>
      responseRobot?.robotWorkspaces?.map((workspace: any) => {
        return {
          key: workspace?.name,
          name: workspace?.name,
          distro: workspace?.workspaceDistro,
          repositories: workspace?.robotRepositories,
        };
      }),
    [responseRobot]
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
              subtitle={url?.robotName as string}
            />
          );
        },
      },
      {
        key: "distro",
        header: "distro",
        align: "center",
        body: (rowData: any) => {
          return <DistroCell distro={rowData?.distro?.toLowerCase()} />;
        },
      },
      {
        key: "repositories",
        header: "repositories",
        align: "center",
        body: (rowData: any) => {
          return <WorkspacesCell workspaces={rowData?.repositories} />;
        },
      },

      {
        key: "state",
        header: "State",
        align: "left",
        body: () => {
          return (
            <StateCell
              state={
                !responseRobot
                  ? "Loading..."
                  : responseRobot?.robotClusters?.filter(
                      (robot: any) => robot?.robotStatus !== "EnvironmentReady"
                    )?.length
                  ? responseRobot?.robotClusters?.filter(
                      (robot: any) => robot?.robotStatus !== "EnvironmentReady"
                    )[0]?.robotStatus
                  : "Ready"
              }
            />
          );
        },
      },
    ],
    [responseRobot, url]
  );

  return (
    <div>
      <GeneralTable
        type="workspacesmanager"
        title="Workspaces"
        data={data}
        columns={columns}
        loading={Array.isArray(responseRobot?.robotWorkspaces) ? false : true}
      />
    </div>
  );
}

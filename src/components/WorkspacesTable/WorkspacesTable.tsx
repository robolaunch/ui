import React, { ReactElement, useMemo } from "react";
import { useParams } from "react-router-dom";
import DistroCell from "../Cells/DistroCell";
import InfoCell from "../Cells/InfoCell";
import StateCell from "../Cells/StateCell";
import WorkspacesCell from "../Cells/WorkspacesCell";
import GeneralTable from "../Table/GeneralTable";

interface IWorkspacesTable {
  responseRobot: any;
}

export default function WorkspacesTable({
  responseRobot,
}: IWorkspacesTable): ReactElement {
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
    <GeneralTable
      type="workspacesmanager"
      title="Workspaces"
      data={data}
      columns={columns}
      loading={Array.isArray(responseRobot?.robotWorkspaces) ? false : true}
    />
  );
}
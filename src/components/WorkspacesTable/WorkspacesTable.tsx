import WorkspacesCell from "../TableInformationCells/WorkspacesCell";
import DistroCell from "../TableInformationCells/DistroCell";
import StateCell from "../TableInformationCells/StateCell";
import InfoCell from "../TableInformationCells/InfoCell";
import GeneralTable from "../Table/GeneralTable";
import { ReactElement, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
interface IWorkspacesTable {
  responseRobot: any;
}

export default function WorkspacesTable({
  responseRobot,
}: IWorkspacesTable): ReactElement {
  const url = useParams();
  const { applicationMode } = useAppSelector((state) => state.user);

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
    [responseRobot],
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

      !applicationMode && {
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
                        (robot: any) =>
                          robot?.robotStatus !== "EnvironmentReady",
                      )?.length
                    ? responseRobot?.robotClusters?.filter(
                        (robot: any) =>
                          robot?.robotStatus !== "EnvironmentReady",
                      )[0]?.robotStatus
                    : "Ready"
              }
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [responseRobot, url],
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

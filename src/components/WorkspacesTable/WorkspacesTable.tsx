import WorkspacesCell from "../TableInformationCells/WorkspacesCell";
import DistroCell from "../TableInformationCells/DistroCell";
import StateCell from "../TableInformationCells/StateCell";
import InfoCell from "../TableInformationCells/InfoCell";
import GeneralTable from "../Table/GeneralTable";
import { ReactElement, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { IEnvironmentStep2WorkspaceRepository } from "../../interfaces/environment/environment.step2.interface";
import useMain from "../../hooks/useMain";

export default function WorkspacesTable(): ReactElement {
  const url = useParams();
  const { applicationMode } = useAppSelector((state) => state.user);

  const { robotData } = useMain();

  const data: any = useMemo(
    () =>
      robotData?.step2?.workspaces?.map((workspace) => {
        return {
          name: workspace?.name,
          distro: workspace?.workspaceDistro?.toLowerCase(),
          repositories: workspace?.robotRepositories,
          status: workspace,
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [robotData, url],
  );

  const columns: any = useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        sortable: false,
        filter: false,
        align: "left",
        body: ({ name }: { name: string }) => {
          return (
            <InfoCell title={name} subtitle={robotData?.step1?.details?.name} />
          );
        },
      },

      !applicationMode && {
        key: "distro",
        header: "distro",
        align: "center",
        body: ({ distro }: { distro: string }) => {
          return <DistroCell distro={distro} />;
        },
      },

      {
        key: "repositories",
        header: "repositories",
        align: "center",
        body: ({
          repositories,
        }: {
          repositories: IEnvironmentStep2WorkspaceRepository[];
        }) => {
          return <WorkspacesCell workspaces={repositories} />;
        },
      },

      {
        key: "status",
        header: "Status",
        align: "left",
        body: () => {
          return (
            <StateCell
              state={
                !Array.isArray(robotData?.step1?.clusters?.environment)
                  ? "Loading..."
                  : robotData?.step1?.clusters?.environment?.filter(
                        (robot) => robot?.status !== "EnvironmentReady",
                      )?.length
                    ? robotData?.step1?.clusters?.environment?.filter(
                        (robot) => robot?.status !== "EnvironmentReady",
                      )[0]?.status
                    : "Ready"
              }
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [robotData, url],
  );

  return (
    <GeneralTable
      type="workspacesmanager"
      title="Workspaces"
      data={data}
      columns={columns}
      loading={Array.isArray(robotData?.step2?.workspaces) ? false : true}
    />
  );
}

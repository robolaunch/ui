import InfoCell from "../TableInformationCells/InfoCell";
import GeneralTable from "../Table/GeneralTable";
import { ReactElement, useMemo } from "react";
import { useParams } from "react-router-dom";
import useMain from "../../hooks/useMain";
import BasicCell from "../TableInformationCells/BasicCell";

export default function ContainersTable(): ReactElement {
  const url = useParams();

  const { robotData } = useMain();

  const data: any = useMemo(
    () =>
      robotData?.step1?.launchContainers?.map((container) => {
        return {
          name: container.container.name,
          image: container.container.image,
          replicaCount: container.replicaCount,
          privileged: container.container.privileged,
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
      {
        key: "image",
        header: "Image",
        sortable: false,
        filter: false,
        align: "left",
        body: ({ image }: { image: string }) => {
          return <BasicCell text={image} />;
        },
      },
      {
        key: "replicaCount",
        header: "Replica Count",
        sortable: false,
        filter: false,
        align: "left",
        body: ({ replicaCount }: { replicaCount: string }) => {
          return <BasicCell text={replicaCount} />;
        },
      },
      {
        key: "privileged",
        header: "Privileged",
        sortable: false,
        filter: false,
        align: "left",
        body: ({ privileged }: { privileged: boolean }) => {
          return (
            <BasicCell text={privileged ? "Privileged" : "Not Privileged"} />
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
      title="Containers"
      data={data}
      columns={columns}
      loading={robotData?.step1?.volumes?.length === 0 ? true : false}
    />
  );
}

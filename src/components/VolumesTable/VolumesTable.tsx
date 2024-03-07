import InfoCell from "../TableInformationCells/InfoCell";
import GeneralTable from "../Table/GeneralTable";
import { ReactElement, useMemo } from "react";
import { useParams } from "react-router-dom";
import useMain from "../../hooks/useMain";
import BasicCell from "../TableInformationCells/BasicCell";

export default function VolumesTable(): ReactElement {
  const url = useParams();

  const { robotData } = useMain();

  const data: any = useMemo(
    () =>
      robotData?.step1?.volumes?.map((volume) => {
        return {
          name: volume?.name,
          capacity: volume?.capacity,
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
        key: "capacity",
        header: "Capacity",
        sortable: false,
        filter: false,
        align: "left",
        body: ({ capacity }: { capacity: number }) => {
          return <BasicCell text={`${capacity}GB`} />;
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [robotData, url],
  );

  return (
    <GeneralTable
      type="workspacesmanager"
      title="Volumes"
      data={data}
      columns={columns}
      loading={robotData?.step1?.volumes?.length === 0 ? true : false}
    />
  );
}

import { Dispatch, SetStateAction, useMemo } from "react";
import {
  IMainDashboardColumn,
  IMainDashboardData,
} from "../interfaces/tableInterface";
import { IOrganization } from "../interfaces/organizationInterfaces";
import OrganizationInfoCell from "../components/OrganizationInfoCell/OrganizationInfoCell";
import StateCell from "../components/TableInformationCells/StateCell";
import OrganizationActionCells from "../components/TableActionCells/OrganizationActionCells";

interface IMainTableData {
  responseOrganizations: IOrganization[] | undefined;
  setReload: Dispatch<SetStateAction<boolean>>;
}

export function MainTableData({
  responseOrganizations,
  setReload,
}: IMainTableData) {
  const data: IMainDashboardData[] = useMemo(
    () =>
      responseOrganizations?.map((organization: IOrganization) => {
        return {
          key: organization?.organizationName,
          name: organization,
          state: undefined,
          actions: organization,
        };
      }) || [],
    [responseOrganizations],
  );

  const columns: IMainDashboardColumn[] = useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: IMainDashboardData) => {
          return <OrganizationInfoCell rowData={rowData} />;
        },
      },
      {
        key: "state",
        header: "State",
        align: "left",
        body: () => {
          return <StateCell state="Ready" />;
        },
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        body: (rowData: IMainDashboardData) => {
          return (
            <OrganizationActionCells
              data={rowData?.actions}
              reload={() => setReload((prevState: boolean) => !prevState)}
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return { data, columns };
}

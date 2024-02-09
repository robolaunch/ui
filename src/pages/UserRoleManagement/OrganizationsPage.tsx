import { useMemo } from "react";
import OrgActionCells from "../../components/TableActionCells/OrgActionCells";
import BasicCell from "../../components/TableInformationCells/BasicCell";
import InfoCell from "../../components/TableInformationCells/InfoCell";
import GeneralTable from "../../components/Table/GeneralTable";
import { orgSplitter } from "../../functions/general.function";

interface IOrganizationsPage {
  responseOrganizations: any;
  handleChangeActiveTab: (data: any) => void;
}

export default function OrganizationsPage({
  responseOrganizations,
  handleChangeActiveTab,
}: IOrganizationsPage) {
  const data: any = useMemo(
    () =>
      responseOrganizations?.map((organization: any) => {
        return {
          key: organization?.organizationName,
          name: organization,
          users: organization?.userCount,
        };
      }),
    [responseOrganizations],
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
              title={orgSplitter(rowData?.name?.organizationName)}
              titleURL={`/user-role-management/${
                rowData?.name?.organizationName.split("_")[1]
              }`}
              subtitle={`Member Count: ${rowData?.name?.userCount}`}
              onClick={() =>
                handleChangeActiveTab({
                  page: "organizationUsers",
                  selectedOrganization: rowData?.name,
                })
              }
            />
          );
        },
      },
      {
        key: "users",
        header: "Users",
        sortable: true,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={Number(rowData?.users)} />;
        },
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        body: (rowData: any) => {
          return (
            <OrgActionCells data={rowData?.name} reloadHandle={() => {}} />
          );
        },
      },
    ],
    [handleChangeActiveTab],
  );

  return (
    <GeneralTable
      type="organization"
      title="Organizations"
      data={data}
      columns={columns}
      loading={responseOrganizations ? false : true}
    />
  );
}

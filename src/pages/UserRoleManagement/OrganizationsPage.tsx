import React, { useMemo } from "react";
import { GeneralTable } from "../../components/Table/GeneralTable";
import { InfoCell } from "../../components/Cells/InfoCell";
import OrganizationActionCells from "../../components/ActionCells/OrganizationActionCells";
import organizationNameViewer from "../../helpers/organizationNameViewer";
import BasicCell from "../../components/Cells/BasicCell";

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
    [responseOrganizations]
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
              title={organizationNameViewer({
                organizationName: rowData?.name?.organizationName || "",
              })}
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
            <OrganizationActionCells
              onClickSee={() =>
                handleChangeActiveTab({
                  page: "organizationUsers",
                  selectedOrganization: rowData?.name,
                })
              }
              data={rowData?.name}
            />
          );
        },
      },
    ],
    [handleChangeActiveTab]
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

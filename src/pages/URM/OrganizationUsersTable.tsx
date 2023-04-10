import React, { Fragment, useEffect, useMemo, useState } from "react";
import { GeneralTable } from "../../components/Table/GeneralTable";
import { InfoCell } from "../../components/Cells/InfoCell";
import { useAppDispatch } from "../../hooks/redux";
import { getOrganizationUsers } from "../../resources/OrganizationSlice";
import UserActionCells from "../../components/ActionCells/UserActionCells";
import BasicCell from "../../components/Cells/BasicCell";

interface IOrganizationUsersPage {
  activePage: any;
}

export default function OrganizationUsersTable({
  activePage,
}: IOrganizationUsersPage) {
  const [responseOrganizationsUsers, setResponseOrganizationsUsers] =
    useState<any>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getOrganizationUsers({
        organizationId: activePage?.selectedOrganization?.organizationId,
      })
    ).then((responseOrganizationUsers: any) => {
      console.log(responseOrganizationUsers?.payload?.data);
      setResponseOrganizationsUsers(
        responseOrganizationUsers?.payload?.data || []
      );
    });
  }, [dispatch, activePage]);

  const data: any = useMemo(
    () =>
      responseOrganizationsUsers?.map((user: any) => {
        return {
          key: user?.organizationName,
          name: user,
          username: user?.username,
          organization: activePage?.selectedOrganization?.organizationName,
          // users: organization?.users,
        };
      }),
    [
      activePage?.selectedOrganization?.organizationName,
      responseOrganizationsUsers,
    ]
  );

  const columns: any = useMemo(
    () => [
      {
        key: "name",
        header: "Full Name",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return (
            <InfoCell
              title={`${rowData?.name?.firstName} ${rowData?.name?.lastName}`}
              subtitle={rowData?.name?.email}
            />
          );
        },
      },
      {
        key: "organization",
        header: "Organization",
        sortable: false,
        filter: false,
        align: "left",
        body: () => {
          return (
            <BasicCell
              text={activePage?.selectedOrganization?.organizationName}
            />
          );
        },
      },
      {
        key: "username",
        header: "Username",
        sortable: true,
        filter: true,
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.username} />;
        },
      },
      {
        key: "OrganizationRole",
        header: "Organization Role",
        sortable: true,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return (
            <BasicCell
              text={rowData?.name?.isCurrentMemberAdmin ? "Admin " : "User"}
            />
          );
        },
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        body: (rowData: any) => {
          return (
            <UserActionCells
              onClickSee={() => {}}
              data={rowData?.name}
              activePage={activePage}
            />
          );
        },
      },
    ],
    []
  );

  return (
    <GeneralTable
      type="users"
      title={`Organization Users and Admins`}
      data={data}
      columns={columns}
      loading={responseOrganizationsUsers ? false : true}
    />
  );
}

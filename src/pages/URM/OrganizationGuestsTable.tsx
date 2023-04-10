import React, { Fragment, useEffect, useMemo, useState } from "react";
import { GeneralTable } from "../../components/Table/GeneralTable";
import { InfoCell } from "../../components/Cells/InfoCell";
import { useAppDispatch } from "../../hooks/redux";
import { getOrganizationGuests } from "../../resources/OrganizationSlice";
import OrganizationActionCells from "../../components/ActionCells/OrganizationActionCells";

interface IOrganizationGuestsPage {
  activePage: any;
}

export default function OrganizationGuestsTable({
  activePage,
}: IOrganizationGuestsPage) {
  const [responseOrganizationsGuests, setResponseOrganizationsGuests] =
    useState<any>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getOrganizationGuests({
        organizationId: activePage?.selectedOrganization?.organizationId,
      })
    ).then((responseOrganizationGuests: any) => {
      console.log("responseOrganizationGuests", responseOrganizationGuests);
      setResponseOrganizationsGuests(
        responseOrganizationGuests?.payload?.data || []
      );
    });
  }, [dispatch, activePage]);

  const data: any = useMemo(
    () =>
      responseOrganizationsGuests?.map((user: any) => {
        return {
          key: user?.organizationName,
          name: user,
          username: user?.username,
          organization: activePage?.selectedOrganization?.organizationName,
        };
      }),
    [
      activePage?.selectedOrganization?.organizationName,
      responseOrganizationsGuests,
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
        body: (rowData: any) => {
          return (
            <Fragment>
              <span>{rowData?.organizationName}</span>
            </Fragment>
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
          return (
            <Fragment>
              <span>{rowData?.username}</span>
            </Fragment>
          );
        },
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        body: (rowData: any) => {
          return (
            <OrganizationActionCells
              onClickSee={() => {}}
              data={rowData?.name}
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
      title={`Invited Users`}
      data={data}
      columns={columns}
      loading={responseOrganizationsGuests ? false : true}
    />
  );
}

import React, { Fragment, useEffect, useMemo, useState } from "react";
import UserActionCells from "../../components/TableActionCells/UserActionCells";
import { getOrganizationGuests } from "../../toolkit/OrganizationSlice";
import InfoCell from "../../components/TableInformationCells/InfoCell";
import GeneralTable from "../../components/Table/GeneralTable";
import { useAppDispatch } from "../../hooks/redux";

interface IOrganizationGuestsPage {
  activePage: any;
}

export default function OrganizationGuestsTable({
  activePage,
}: IOrganizationGuestsPage) {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [responseOrganizationsGuests, setResponseOrganizationsGuests] =
    useState<any>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getOrganizationGuests({
        name: activePage?.selectedOrganization?.organizationName,
        organizationId: activePage?.selectedOrganization?.organizationId,
      }),
    ).then((responseOrganizationsGuests: any) => {
      setResponseOrganizationsGuests(
        responseOrganizationsGuests?.payload?.data[0]?.users || [],
      );
    });
  }, [activePage, dispatch, refresh]);

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
    ],
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
            <UserActionCells
              activePage={activePage}
              onClickSee={() => {}}
              data={rowData?.name}
              handleRefresh={() => setRefresh(!refresh)}
            />
          );
        },
      },
    ],
    [activePage, refresh],
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

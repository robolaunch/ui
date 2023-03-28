import React, { Fragment, useEffect, useMemo, useState } from "react";
import { GeneralTable } from "../../../components/Table/GeneralTable";
import { InfoCell } from "../../../components/Cells/InfoCell";
import { useAppDispatch } from "../../../hooks/redux";
import { getOrganizations } from "../../../resources/OrganizationSlice";
import TeamActionCells from "../../../components/ActionCells/OrganizationActionCells";
import { useParams } from "react-router";

export default function OrganizationUsersTable() {
  const [reload, setReload] = useState(false);
  const [responseOrganizationsUsers, setResponseOrganizationsUsers] =
    useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const url = useParams();

  useEffect(() => {
    setLoading(true);
    dispatch(getOrganizations()).then((res: any) => {
      console.log(res?.payload?.data);
      setResponseOrganizationsUsers(res?.payload?.data);
    });
  }, [url, dispatch, reload]);

  useEffect(() => {
    if (responseOrganizationsUsers?.length) {
      setLoading(false);
    }
  }, [responseOrganizationsUsers]);

  const handleReload = () => {
    setReload(!reload);
  };

  const data: any = useMemo(
    () =>
      responseOrganizationsUsers?.map((organization: any) => {
        return {
          key: organization?.organizationName,
          name: organization,
          organization: url?.organizationName,
          // users: organization?.users,
        };
      }),
    [url, responseOrganizationsUsers]
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
              title={rowData?.name?.organizationName}
              titleURL={`#`}
              subtitle={`Member Count: ${rowData?.name?.userCount}`}
            />
          );
        },
      },
      {
        key: "organization",
        header: "Organization",
        sortable: true,
        filter: true,
        align: "left",
        body: (rowData: any) => {
          return (
            <Fragment>
              <span>{rowData?.organization}</span>
            </Fragment>
          );
        },
      },
      // {
      //   key: "users",
      //   header: "Total Users",
      //   sortable: false,
      //   filter: false,
      //   align: "left",
      //   body: (rowData: any) => {
      //     return <UsersCell users={rowData?.users} />;
      //   },
      // },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        body: (rowData: any) => {
          return <TeamActionCells data={rowData?.name} />;
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <GeneralTable
      type="users"
      title="Organization Users"
      data={data}
      columns={columns}
      loading={loading}
      handleReload={() => handleReload()}
    />
  );
}

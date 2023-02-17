import React, { FC, Fragment, useEffect, useMemo, useState } from "react";
import { GeneralTable } from "../../../components/Table/GeneralTable";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getTeams } from "../../../app/TeamSlice";
import { UsersCell } from "../../../components/Cells/UsersCell";
import { InfoCell } from "../../../components/Cells/InfoCell";
import { UtilizationWidget } from "../../../widgets/UtilizationWidget";

export const OrganizationDashboard: FC = () => {
  const { currentOrganization } = useAppSelector((state) => state.organization);
  const [reload, setReload] = React.useState(false);

  const [responseTeams, setResponseTeams] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(
      getTeams({ organization: { name: currentOrganization.name } })
    ).then((res: any) => {
      setResponseTeams(res?.payload?.data?.teams?.data || []);
    });
  }, [currentOrganization.name, dispatch, reload]);

  useEffect(() => {
    if (responseTeams?.length) {
      setLoading(false);
    }
  }, [responseTeams]);

  const data: any = useMemo(
    () =>
      responseTeams?.map((team: any) => {
        return {
          key: team?.name,
          name: team,
          organization: currentOrganization.name,
          users: team?.users,
        };
      }),
    [currentOrganization.name, responseTeams]
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
              title={rowData?.name?.name}
              subtitle={rowData?.users?.length + " Members"}
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
              <span>{rowData.organization}</span>
            </Fragment>
          );
        },
      },
      {
        key: "users",
        header: "Total Users",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <UsersCell users={rowData?.users} />;
        },
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        body: (rowData: any) => {
          return (
            <Fragment>
              <button>{"Actions"}</button>
            </Fragment>
          );
        },
      },
    ],
    []
  );

  const handleReload = () => {
    setReload(!reload);
  };

  return (
    <div className="grid gap-8">
      <div className="grid lg:grid-cols-1 grid-cols-7">
        <div className="col-span-2">1</div>
        <div className="col-span-2">2</div>
        <div className="col-span-3">
          <UtilizationWidget />
        </div>
      </div>
      <div className="grid  grid-cols-1">
        <GeneralTable
          type="team"
          title="Teams"
          data={data}
          columns={columns}
          loading={loading}
          handleReload={() => handleReload()}
        />
      </div>
    </div>
  );
};

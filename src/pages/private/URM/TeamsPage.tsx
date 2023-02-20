import React, {
  Fragment,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GeneralTable } from "../../../components/Table/GeneralTable";
import { InfoCell } from "../../../components/Cells/InfoCell";
import { UsersCell } from "../../../components/Cells/UsersCell";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { RootState } from "../../../app/store";
import TeamActionCells from "../../../components/ActionCells/TeamActionCells";

export default function TeamsPage(): ReactElement {
  const [reload, setReload] = React.useState(false);
  const [responseTeams, setResponseTeams] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { currentOrganization } = useAppSelector(
    (state: RootState) => state.organization
  );

  const [mockResponseTeams, setMockResponseTeams] = useState<any>([
    {
      name: "Team-1",
      users: [
        {
          name: "User-1",
        },
        {
          name: "User-2",
        },
      ],
    },
  ]);

  useEffect(() => {
    setLoading(true);
    setResponseTeams(mockResponseTeams);
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
              titleURL={`/${currentOrganization.name}/${rowData?.name?.name}/members`}
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
          return <TeamActionCells data={rowData.name} />;
        },
      },
    ],
    []
  );

  const handleReload = () => {
    setReload(!reload);
  };

  return (
    <div>
      <GeneralTable
        type="team"
        title="Teams"
        data={data}
        columns={columns}
        loading={loading}
        handleReload={() => handleReload()}
      />
    </div>
  );
}

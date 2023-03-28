import React, {
  Fragment,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { RootState } from "../../../app/store";
import { InfoCell } from "../../../components/Cells/InfoCell";
import { UsersCell } from "../../../components/Cells/UsersCell";
import TeamActionCells from "../../../components/ActionCells/OrganizationActionCells";
import { GeneralTable } from "../../../components/Table/GeneralTable";

export default function TeamMembersPage(): ReactElement {
  const [reload, setReload] = React.useState(false);
  const [responseTeamMembers, setResponseTeamMembers] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { currentOrganization } = useAppSelector(
    (state: RootState) => state.organization
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mockResponseTeamMembers, setMockResponseTeamMembers] = useState<any>([
    {
      name: "user-1",
      email: "test@test.com",
      organizationManager: true,
      teamManager: true,
    },
    {
      name: "user-2",
      email: "test@test.com",
      organizationManager: false,
      teamManager: false,
    },
  ]);

  useEffect(() => {
    setLoading(true);

    setResponseTeamMembers(mockResponseTeamMembers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrganization.name, dispatch, reload]);

  useEffect(() => {
    if (responseTeamMembers?.length) {
      setLoading(false);
    }
  }, [responseTeamMembers]);

  const data: any = useMemo(
    () =>
      responseTeamMembers?.map((team: any) => {
        return {
          key: team?.name,
          name: team,
          organization: currentOrganization.name,
          users: team?.users,
        };
      }),
    [currentOrganization.name, responseTeamMembers]
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

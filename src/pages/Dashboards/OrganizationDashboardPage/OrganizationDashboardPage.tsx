import React, {
  Fragment,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GeneralTable } from "../../../components/Table/GeneralTable";
import { useAppDispatch } from "../../../hooks/redux";
import { UsersCell } from "../../../components/Cells/UsersCell";
import { InfoCell } from "../../../components/Cells/InfoCell";
import UtilizationWidget from "../../../components/UtilizationWidget/UtilizationWidget";
import CountWidget from "../../../components/CountWidget/CountWidget";
import Button from "../../../components/Button/Button";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import { useParams } from "react-router";

export default function OrganizationDashboardPage(): ReactElement {
  const [reload, setReload] = React.useState(false);
  const [responseTeams, setResponseTeams] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const url = useParams();
  console.log(url);

  useEffect(() => {
    setLoading(true);

    setResponseTeams([]);
  }, [url, dispatch, reload]);

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
          organization: url?.organizationName,
          users: team?.users,
        };
      }),
    [url, responseTeams]
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
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        <div className="col-span-4">
          <InformationWidget
            title={url?.organizationName || ""}
            subtitle="From this page, you can view, control or get information about all
            the details of the teams in your organization."
            actiontitle="If you need to create a new team or check the users in the team you
            can proceed here."
            component={
              <Button text="Manage Teams" className="!w-28 !h-10 !text-xs" />
            }
          />
        </div>
        <div className="col-span-5">
          <UtilizationWidget title="Organization" />
        </div>

        <div className="col-span-3">
          <CountWidget data={[5, 2, 4, 3]} title="Organization" />
        </div>
      </div>
      <div className="grid grid-cols-1">
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
}

import React, {
  Fragment,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import GeneralTable from "../../../components/Table/GeneralTable";
import { useAppDispatch } from "../../../hooks/redux";
import InfoCell from "../../../components/Cells/InfoCell";
import UtilizationWidget from "../../../components/UtilizationWidget/UtilizationWidget";
import CountWidget from "../../../components/CountWidget/CountWidget";
import Button from "../../../components/Button/Button";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import { useParams } from "react-router-dom";
import { getRoboticsCloudsOfOrganization } from "../../../resources/RoboticsCloudSlice";
import { getOrganizations } from "../../../resources/OrganizationSlice";
import BasicCell from "../../../components/Cells/BasicCell";

export default function OrganizationDashboardPage(): ReactElement {
  const [currentOrganization, setCurrentOrganization] =
    useState<any>(undefined);
  const [responseRoboticsClouds, setResponseRoboticsClouds] =
    useState<any>(undefined);
  const [reload, setReload] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const url = useParams();

  useEffect(() => {
    if (!currentOrganization) {
      dispatch(getOrganizations()).then((responseOrganizations: any) => {
        setCurrentOrganization(
          responseOrganizations?.payload?.data?.filter(
            (organization: any) =>
              organization?.organizationName === `org_${url?.organizationName}`
          )[0] || undefined
        );
      });
    } else {
      dispatch(
        getRoboticsCloudsOfOrganization({
          organizationId: currentOrganization?.organizationId,
        })
      ).then((response: any) => {
        setResponseRoboticsClouds(
          response?.payload?.data[0]?.roboticsClouds || []
        );
      });
    }
  }, [currentOrganization, dispatch, url?.organizationName, reload]);

  const data: any = useMemo(
    () =>
      responseRoboticsClouds?.map((team: any) => {
        return {
          key: team?.name,
          name: team,
          organization: url?.organizationName,
          users: team?.users,
        };
      }),
    [url, responseRoboticsClouds]
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
              subtitle={`${url?.organizationName as string} Organization`}
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
          return <BasicCell text={rowData?.organization} />;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url, responseRoboticsClouds]
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 grid-cols-12">
        <div className="col-span-12 lg:col-span-4">
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
        <div className="col-span-12 lg:col-span-5">
          <UtilizationWidget title="Organization" />
        </div>
        <div className="col-span-12 lg:col-span-3">
          <CountWidget
            data={{
              series: [responseRoboticsClouds?.length || 0, 0, 0, 0],
              categories: ["Robotics Clouds", "-", "-", "-"],
            }}
            title="Organization"
          />
        </div>
      </div>
      <div className="grid grid-cols-1">
        <GeneralTable
          type="roboticscloud"
          title="Robotics Cloud"
          data={data}
          columns={columns}
          loading={responseRoboticsClouds?.length ? false : true}
          handleReload={() => {
            setResponseRoboticsClouds(undefined);
            setReload(!reload);
          }}
        />
      </div>
    </div>
  );
}

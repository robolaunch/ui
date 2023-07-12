import React, { ReactElement, useEffect, useMemo, useState } from "react";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import { stringCapitalization } from "../../../helpers/GeneralFunctions";
import CountWidget from "../../../components/CountWidget/CountWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import BasicCell from "../../../components/Cells/BasicCell";
import { useParams } from "react-router-dom";
import InfoCell from "../../../components/Cells/InfoCell";
import Button from "../../../components/Button/Button";
import useSidebar from "../../../hooks/useSidebar";
import useFunctions from "../../../hooks/useFunctions";
import StateCell from "../../../components/Cells/StateCell";
import RoboticsCloudActionCells from "../../../components/ActionCells/RoboticsCloudActionCells";
import DashboardLayout from "../../../layouts/DashboardLayout";

export default function OrganizationDashboardPage(): ReactElement {
  const [reload, setReload] = useState<boolean>(false);
  const { getOrganization, getRoboticsClouds } = useFunctions();
  const { setSidebarState } = useSidebar();
  const [responseRoboticsClouds, setResponseRoboticsClouds] =
    useState<any>(undefined);
  const url = useParams();

  const [responseCurrentOrganization, setResponseCurrentOrganization] =
    useState<any>(undefined);

  useEffect(() => {
    if (!responseCurrentOrganization) {
      getOrganization(
        {
          organizationName: url?.organizationName as string,
        },
        {
          isSetState: true,
          setResponse: setResponseCurrentOrganization,
          ifErrorNavigateTo404: !responseCurrentOrganization,
        }
      );
    } else {
      getRoboticsClouds(
        {
          organizationId: responseCurrentOrganization?.organizationId,
        },
        {
          setResponse: setResponseRoboticsClouds,
          ifErrorNavigateTo404: !responseRoboticsClouds,
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseCurrentOrganization, reload, url]);

  const data: any = useMemo(
    () =>
      responseRoboticsClouds?.map((rc: any) => {
        return {
          key: rc?.name,
          name: rc,
          organization: url?.organizationName,
          region: rc?.region,
          state: "Ready",
          users: rc?.actions,
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
              subtitle={`${stringCapitalization({
                str: url?.organizationName as string,
              })} Organization`}
              titleURL={`/${url?.organizationName}/${rowData?.name?.name}`}
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
            <BasicCell
              text={stringCapitalization({
                str: url?.organizationName as string,
              })}
            />
          );
        },
      },
      {
        key: "region",
        header: "Region",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.region} />;
        },
      },
      {
        key: "state",
        header: "State",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <StateCell state={rowData?.state} />;
        },
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        body: (rowData: any) => {
          return (
            <RoboticsCloudActionCells
              data={rowData}
              reload={() => {
                setReload(!reload);
              }}
            />
          );
        },
      },
    ],

    [reload, url?.organizationName]
  );

  return (
    <DashboardLayout
      widget1={
        <InformationWidget
          title={
            stringCapitalization({
              str: url?.organizationName as string,
            }) || ""
          }
          subtitle="This page is the platform's Robotics Cloud page. Here, you can manage, delete, or view the details of your existing robotics clouds. If you need to create a new robotics cloud, you can do so by clicking the button below."
          component={
            <Button
              text="Create a new Robotics Cloud"
              className="!w-56 !h-10 !text-xs"
              onClick={() => {
                setSidebarState((prevState: any): any => ({
                  ...prevState,
                  isOpen: true,
                  isCreateMode: false,
                  page: "roboticscloud",
                }));
              }}
            />
          }
        />
      }
      widget2={<></>}
      widget3={
        <CountWidget
          data={{
            series: [0, responseRoboticsClouds?.length || 0, 0],
            categories: [["Pending"], ["Ready"], ["Deleting"]],
          }}
          title={`${stringCapitalization({
            str: url?.organizationName as string,
          })} Organization`}
        />
      }
      table={
        <GeneralTable
          type="roboticscloud"
          title="Robotics Clouds"
          data={data}
          columns={columns}
          loading={responseRoboticsClouds?.length ? false : true}
          handleReload={() => {
            setResponseRoboticsClouds(undefined);
            setReload(!reload);
          }}
        />
      }
    />
  );
}

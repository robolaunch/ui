import React, { ReactElement, useEffect, useMemo, useState } from "react";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import { stringCapitalization } from "../../../functions/GeneralFunctions";
import GeneralTable from "../../../components/Table/GeneralTable";
import BasicCell from "../../../components/Cells/BasicCell";
import { useParams } from "react-router-dom";
import InfoCell from "../../../components/Cells/InfoCell";
import Button from "../../../components/Button/Button";
import useMain from "../../../hooks/useMain";
import useFunctions from "../../../hooks/useFunctions";
import StateCell from "../../../components/Cells/StateCell";
import RoboticsCloudActionCells from "../../../components/ActionCells/RoboticsCloudActionCells";
import DashboardLayout from "../../../layouts/DashboardLayout";
import RegionsWidget from "../../../components/RegionsWidget/RegionsWidget";
import CountWidget from "../../../components/CountWidget/CountWidget";

export default function OrganizationDashboardPage(): ReactElement {
  const [reload, setReload] = useState<boolean>(false);
  const { getOrganization, getRoboticsClouds } = useFunctions();
  const { pagesState, setSidebarState } = useMain();
  const [responseRoboticsClouds, setResponseRoboticsClouds] =
    useState<any>(undefined);
  const url = useParams();

  useEffect(() => {
    if (
      pagesState?.organization?.organizationName !==
      `org_${url?.organizationName}`
    ) {
      getOrganization(
        {
          organizationName: url?.organizationName as string,
        },
        {
          isSetState: true,
          ifErrorNavigateTo404: !responseRoboticsClouds,
          setPages: true,
        }
      );
    } else {
      getRoboticsClouds(
        {
          organizationId: pagesState?.organization?.organizationId,
        },
        {
          setResponse: setResponseRoboticsClouds,
          ifErrorNavigateTo404: !responseRoboticsClouds,
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesState, reload, url]);

  const data: any = useMemo(
    () =>
      responseRoboticsClouds?.map((rc: any) => {
        return {
          key: rc?.name,
          name: rc,
          organization: url?.organizationName,
          region: rc?.region,
          country:
            rc.region === "eu-central-1"
              ? "Frankfurt (Germany)"
              : rc?.region === "eu-west-2"
              ? "London (UK)"
              : rc?.region === "us-east-1"
              ? "N. Virginia (US)"
              : rc?.region === "us-east-2"
              ? "Ohio (US)"
              : rc?.region === "us-west-1"
              ? "N. California (US)"
              : rc?.region === "ap-northeast-1" && "Tokyo (Japan)",
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
        key: "country",
        header: "Country",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.country} />;
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
      widget2={
        <RegionsWidget
          title="Robotics Cloud"
          responseData={
            responseRoboticsClouds?.map((item: any) => item.region) || []
          }
        />
      }
      widget3={
        <CountWidget
          data={
            responseRoboticsClouds
              ? Array?.from(
                  new Set(
                    responseRoboticsClouds?.map((item: any) => item?.region) ||
                      []
                  )
                )?.map((item: any, index: number) => {
                  return {
                    label: item || "",
                    value:
                      responseRoboticsClouds?.filter(
                        (rc: any) => rc?.region === item
                      )?.length || 0,
                    color: index % 2 === 0 ? "#35b8fa" : "#cb77ff",
                  };
                })
              : []
          }
        />
      }
      table={
        <GeneralTable
          type="roboticscloud"
          title="Robotics Clouds"
          data={data}
          columns={columns}
          loading={responseRoboticsClouds ? false : true}
          handleReload={() => {
            setResponseRoboticsClouds(undefined);
            setReload(!reload);
          }}
        />
      }
    />
  );
}

import React, { ReactElement, useEffect, useMemo, useState } from "react";
import RoboticsCloudActionCells from "../../../components/TableActionCells/RoboticsCloudActionCells";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import RegionsWidget from "../../../components/RegionsWidget/RegionsWidget";
import { stringCapitalization } from "../../../functions/GeneralFunctions";
import CountWidget from "../../../components/CountWidget/CountWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import DashboardLayout from "../../../layouts/DashboardLayout";
import StateCell from "../../../components/TableInformationCells/StateCell";
import BasicCell from "../../../components/TableInformationCells/BasicCell";
import InfoCell from "../../../components/TableInformationCells/InfoCell";
import useFunctions from "../../../hooks/useFunctions";
import { useParams } from "react-router-dom";
import useMain from "../../../hooks/useMain";
import TourGuide from "../../../components/TourGuide/TourGuide";
import { getGuideItem } from "../../../functions/handleGuide";

export default function OrganizationDashboardPage(): ReactElement {
  const [reload, setReload] = useState<boolean>(false);
  const { getOrganization, getRoboticsClouds } = useFunctions();
  const { pagesState } = useMain();
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
          organizationName: url?.organizationName!,
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
              subtitle={`${url?.organizationName} Organization`}
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
                str: url?.organizationName!,
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
              str: url?.organizationName!,
            }) || ""
          }
          subtitle="This page is the platform's Robotics Cloud page. Here, you can manage, delete, or view the details of your existing robotics clouds. If you need to create a new robotics cloud, you can do so by clicking the button below."
          component={
            <TourGuide
              type="organization"
              tourConfig={[
                getGuideItem('[data-tut="information-widget"]', "organization"),
                getGuideItem('[data-tut="regions-widget"]'),
                getGuideItem('[data-tut="counter-widget"]'),
                getGuideItem('[data-tut="general-table"]'),
              ]}
            />
          }
        />
      }
      widget2={
        <RegionsWidget
          title="Regions"
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

import React, { ReactElement, useEffect, useState } from "react";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import RegionsWidget from "../../../components/RegionsWidget/RegionsWidget";
import { stringCapitalization } from "../../../functions/GeneralFunctions";
import CountWidget from "../../../components/CountWidget/CountWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import TourGuide from "../../../components/TourGuide/TourGuide";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { getGuideItem } from "../../../functions/handleGuide";
import useFunctions from "../../../hooks/useFunctions";
import { useParams } from "react-router-dom";
import useMain from "../../../hooks/useMain";
import { GetOrganizationDashboardTableDatas } from "../../../controllers/GetTableDatas";

export default function OrganizationDashboardPage(): ReactElement {
  const [reload, setReload] = useState<boolean>(false);
  const { getOrganization, getRoboticsClouds } = useFunctions();
  const { pagesState } = useMain();
  const [responseRoboticsClouds, setResponseRoboticsClouds] =
    useState<any>(undefined);
  const url = useParams();

  const { data, columns } = GetOrganizationDashboardTableDatas({
    responseRoboticsClouds,
    setReload,
    url,
  });

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
        },
      );
    } else {
      getRoboticsClouds(
        {
          organizationId: pagesState?.organization?.organizationId,
        },
        {
          setResponse: setResponseRoboticsClouds,
          ifErrorNavigateTo404: !responseRoboticsClouds,
        },
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesState, reload, url]);

  return (
    <DashboardLayout
      widget1={
        <InformationWidget
          title={
            stringCapitalization({
              str: url?.organizationName!,
            }) || ""
          }
          subtitle="This page is the platform's Robotics Cloud page. Here, you can manage, delete, or view the details of your existing robotics clouds."
          component={
            <TourGuide
              type="organization"
              tourConfig={[
                getGuideItem('[data-tut="information-widget"]'),
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
          title="Provider"
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
                      [],
                  ),
                )?.map((item: any, index: number) => {
                  return {
                    label: item || "",
                    value:
                      responseRoboticsClouds?.filter(
                        (rc: any) => rc?.region === item,
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
          title="Regions"
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

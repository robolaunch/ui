import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import RegionsWidget from "../../../components/RegionsWidget/RegionsWidget";
import { RegionTableData } from "../../../controllers/RegionTableData";
import CountWidget from "../../../components/CountWidget/CountWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import TourGuide from "../../../components/TourGuide/TourGuide";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { getGuideItem } from "../../../functions/handleGuide";
import { ReactElement, useEffect, useState } from "react";
import useFunctions from "../../../hooks/useFunctions";
import { useParams } from "react-router-dom";
import useMain from "../../../hooks/useMain";

export default function RegionDashboard(): ReactElement {
  const [responseInstances, setResponseInstances] = useState<any[] | undefined>(
    undefined,
  );
  const { getOrganization, getRoboticsCloud, getInstances } = useFunctions();
  const { pagesState, selectedState } = useMain();
  const [reload, setReload] = useState<boolean>(false);
  const url = useParams();

  useEffect(() => {
    if (
      pagesState?.organization?.organizationName !==
      `org_${url?.organizationName}`
    ) {
      handleGetOrganization();
    } else if (pagesState?.roboticsCloud?.name !== url?.roboticsCloudName) {
      handleGetRoboticsCloud();
    } else {
      handleGetInstances();
    }

    const timer = setInterval(() => {
      selectedState?.organization &&
        selectedState?.roboticsCloud &&
        pagesState?.roboticsCloud &&
        handleGetInstances();
    }, 20000);

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesState, url, reload]);

  useEffect(() => {
    setResponseInstances(undefined);
  }, [url]);

  const { data, columns } = RegionTableData({
    responseInstances,
    setReload,
  });

  function handleGetOrganization() {
    getOrganization(
      {
        organizationName: url?.organizationName!,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseInstances,
        setPages: true,
      },
    );
  }

  function handleGetRoboticsCloud() {
    getRoboticsCloud(
      {
        organizationId: pagesState?.organization?.organizationId!,
        roboticsCloudName: url?.roboticsCloudName!,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseInstances,
        setPages: true,
      },
    );
  }

  function handleGetInstances() {
    getInstances(
      {
        organizationId: pagesState?.organization?.organizationId!,
        roboticsCloudName: url?.roboticsCloudName!,
        region: pagesState?.roboticsCloud?.region!,
        details: true,
      },
      {
        setResponse: setResponseInstances,
        ifErrorNavigateTo404: !responseInstances,
      },
    );
  }

  return (
    <DashboardLayout
      widget1={
        <InformationWidget
          title={url?.roboticsCloudName || ""}
          subtitle="This page is the platform's Cloud Instance page. Here, you can manage, delete, or view the details of your existing cloud instances."
          component={
            <TourGuide
              type="roboticscloud"
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
          title="Cloud Instance"
          responseData={
            responseInstances?.map((item: any) => item.region) || []
          }
        />
      }
      widget3={
        <CountWidget
          data={
            responseInstances
              ? [
                  {
                    label: "Preparing",
                    value:
                      responseInstances?.filter(
                        (item: any) =>
                          item?.instanceCloudState !== "ConnectionHub_Ready",
                      ).length || 0,
                    color: "#ffa500",
                  },
                  {
                    label: "Ready",
                    value:
                      responseInstances?.filter(
                        (item: any) =>
                          item?.instanceCloudState === "ConnectionHub_Ready",
                      ).length || 0,
                    color: "#cb77ff",
                  },
                  {
                    label: "Error",
                    value:
                      responseInstances?.filter(
                        (item: any) =>
                          item?.instanceCloudState === "ConnectionHub_Error",
                      ).length || 0,
                    color: "#ff0000",
                  },
                ]
              : []
          }
        />
      }
      table={
        <GeneralTable
          type="instance"
          title="Cloud Instances"
          data={data}
          columns={columns}
          loading={Array.isArray(responseInstances) ? false : true}
          handleReload={() => {
            setResponseInstances(undefined);
            setReload(!reload);
          }}
        />
      }
    />
  );
}

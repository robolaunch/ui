import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import RegionsWidget from "../../../components/RegionsWidget/RegionsWidget";
import { RegionTableData } from "../../../controllers/RegionTableData";
import CountWidget from "../../../components/CountWidget/CountWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import TourGuide from "../../../components/TourGuide/TourGuide";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { getGuideItem } from "../../../functions/handleGuide";
import { ReactElement } from "react";
import { useParams } from "react-router-dom";

export default function RegionDashboard(): ReactElement {
  const url = useParams();
  const { data, columns, responseInstances, handleReload } = RegionTableData();

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
          loading={!Array.isArray(responseInstances)}
          handleReload={handleReload}
        />
      }
    />
  );
}

import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import { NamespaceTableData } from "../../../controllers/NamespaceTableData";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import RegionsWidget from "../../../components/RegionsWidget/RegionsWidget";
import CountWidget from "../../../components/CountWidget/CountWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import TourGuide from "../../../components/TourGuide/TourGuide";
import { getGuideItem } from "../../../functions/handleGuide";
import useMain from "../../../hooks/useMain";
import { useParams } from "react-router-dom";
import { ReactElement } from "react";

export default function NSDashboard(): ReactElement {
  const { rows, columns, environments, handleReload } = NamespaceTableData();
  const { selectedState, applicationMode } = useMain();
  const url = useParams();

  return (
    <DashboardLayout
      widget1={
        <InformationWidget
          title={url?.fleetName || ""}
          subtitle="This page is the Robots page of the platform. Here, you can manage, delete, or view the details of your existing robots."
          component={
            <TourGuide
              type="fleet"
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
          title="Robotics Cloud"
          responseData={[selectedState?.roboticsCloud?.region!]}
        />
      }
      widget3={
        <CountWidget
          data={
            environments
              ? [
                  {
                    label: "Creating",
                    value:
                      environments.filter(
                        (robot: any) =>
                          robot?.robotClusters?.[0]?.robotStatus !==
                          "EnvironmentReady",
                      )?.length || 0,
                    color: "#ffa500",
                  },
                  {
                    label: "Ready",
                    value:
                      environments.filter(
                        (robot: any) =>
                          robot?.robotClusters?.[0]?.robotStatus ===
                          "EnvironmentReady",
                      )?.length || 0,
                    color: "#AC2DFE99",
                  },
                  {
                    label: "Error",
                    value: 0,
                    color: "#ff0000",
                  },
                ]
              : []
          }
        />
      }
      table={
        <GeneralTable
          type={applicationMode ? "application" : "robot"}
          title={applicationMode ? "Applications" : "Robots"}
          data={rows!}
          columns={columns}
          loading={!Array.isArray(environments)}
          handleReload={handleReload}
        />
      }
    />
  );
}

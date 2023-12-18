import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import { NamespaceTableData } from "../../../controllers/NamespaceTableData";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import RegionsWidget from "../../../components/RegionsWidget/RegionsWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import CountWidget from "../../../components/CountWidget/CountWidget";
import TourGuide from "../../../components/TourGuide/TourGuide";
import { getGuideItem } from "../../../functions/handleGuide";
import { envApplication } from "../../../helpers/envProvider";
import useMain from "../../../hooks/useMain";
import { useParams } from "react-router-dom";
import { ReactElement } from "react";

export default function NSDashboard(): ReactElement {
  const { data, columns, responseRobots, handleReload } = NamespaceTableData();
  const { selectedState } = useMain();
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
          responseData={[selectedState?.instance?.region!]}
        />
      }
      widget3={
        <CountWidget
          data={
            responseRobots
              ? [
                  {
                    label: "Creating",
                    value:
                      responseRobots.filter(
                        (robot: any) =>
                          robot?.robotClusters?.[0]?.robotStatus !==
                          "EnvironmentReady",
                      )?.length || 0,
                    color: "#ffa500",
                  },
                  {
                    label: "Ready",
                    value:
                      responseRobots.filter(
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
          type={envApplication ? "application" : "robot"}
          title={envApplication ? "Applications" : "Robots"}
          data={data}
          columns={columns}
          loading={!Array.isArray(responseRobots)}
          handleReload={handleReload}
        />
      }
    />
  );
}

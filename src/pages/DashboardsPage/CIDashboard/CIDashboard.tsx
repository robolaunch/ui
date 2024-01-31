import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import SoftwareDetailsWidget from "../../../components/SoftwareDetailsWidget/SoftwareDetailsWidget";
import { InstanceTableData } from "../../../controllers/InstanceTableData";
import GeneralTable from "../../../components/Table/GeneralTable";
import TourGuide from "../../../components/TourGuide/TourGuide";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import { getGuideItem } from "../../../functions/handleGuide";
import { FaLinux, FaServer, FaUbuntu } from "react-icons/fa";
import { SiKubernetes } from "react-icons/si";
import useMain from "../../../hooks/useMain";
import { useParams } from "react-router-dom";
import { RiCpuLine } from "react-icons/ri";
import { ReactElement } from "react";
import UsagesWidget from "../../../components/UsagesWidget/UsagesWidget";

export default function CIDashboard(): ReactElement {
  const { rows, columns, fleets, handleReload } = InstanceTableData();
  const { pagesState, applicationMode } = useMain();
  const url = useParams();

  return (
    <DashboardLayout
      widget1={
        <InformationWidget
          title={url?.instanceName || ""}
          subtitle="This page is the Fleet page of the platform. Here, you can manage, delete, or view the details of your existing fleets."
          component={
            <TourGuide
              type="instance"
              tourConfig={[
                getGuideItem('[data-tut="information-widget"]'),
                getGuideItem('[data-tut="usages-widget"]'),
                getGuideItem('[data-tut="resources-widget"]'),
                getGuideItem('[data-tut="general-table"]'),
              ]}
            />
          }
        />
      }
      widget2={<UsagesWidget />}
      widget3={
        <SoftwareDetailsWidget
          title={pagesState?.instance?.name || ""}
          data={[
            {
              icon: <FaServer size={16} />,
              title: "Architecture",
              value: pagesState?.instance?.resources?.software?.architecture,
            },
            {
              icon: <FaLinux size={16} />,
              title: "Operating System",
              value: pagesState?.instance?.resources?.software?.os,
            },
            {
              icon: <FaUbuntu size={16} />,
              title: "OS Distro",
              value: pagesState?.instance?.resources?.software?.osDistro,
            },
            {
              icon: <RiCpuLine size={16} />,
              title: "Kernel Version",
              value: pagesState?.instance?.resources?.software?.kernelVersion,
            },
            {
              icon: <SiKubernetes size={16} />,
              title: "K8S Version",
              value:
                pagesState?.instance?.resources?.software?.kubernetesVersion,
            },
          ]}
        />
      }
      table={
        <GeneralTable
          type="fleet"
          title={applicationMode ? "Namespaces" : "Fleets"}
          data={rows!}
          columns={columns}
          loading={!Array.isArray(fleets)}
          handleReload={handleReload}
        />
      }
    />
  );
}

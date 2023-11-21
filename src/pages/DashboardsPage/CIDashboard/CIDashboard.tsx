import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import ResourcesWidget from "../../../components/ResourcesWidget/ResourcesWidget";
import { InstanceTableData } from "../../../controllers/InstanceTableData";
import UsagesWidget from "../../../components/UsagesWidget/UsagesWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import TourGuide from "../../../components/TourGuide/TourGuide";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { getGuideItem } from "../../../functions/handleGuide";
import { envApplication } from "../../../helpers/envProvider";
import { FaLinux, FaServer, FaUbuntu } from "react-icons/fa";
import { SiKubernetes } from "react-icons/si";
import useMain from "../../../hooks/useMain";
import { RiCpuLine } from "react-icons/ri";
import { BsGpuCard } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { ReactElement } from "react";

export default function CIDashboard(): ReactElement {
  const { data, columns, responseFleets, handleReload } = InstanceTableData();
  const { pagesState } = useMain();
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
      widget2={
        <UsagesWidget
          title={`Cloud Instance`}
          datas={[
            {
              title: `CPU (${
                pagesState?.instance?.cloudInstanceResource?.cpuTotal || 0
              } Core)`,
              percentage:
                pagesState?.instance?.cloudInstanceResource?.cpuUsage || -1,
            },
            {
              title: `Memory (${
                pagesState?.instance?.cloudInstanceResource?.memoryTotal || 0
              } GB)`,
              percentage:
                pagesState?.instance?.cloudInstanceResource?.memoryUsage || -1,
            },
            {
              title: `Storage (${
                pagesState?.instance?.cloudInstanceResource?.storageTotal || 0
              } GB)`,
              percentage:
                pagesState?.instance?.cloudInstanceResource?.storageUsage &&
                pagesState?.instance?.cloudInstanceResource?.storageTotal
                  ? Math.floor(
                      (pagesState.instance.cloudInstanceResource.storageUsage /
                        pagesState.instance.cloudInstanceResource
                          .storageTotal) *
                        100,
                    )
                  : 0,
            },
          ]}
        />
      }
      widget3={
        <ResourcesWidget
          title={pagesState?.instance?.name || ""}
          data={[
            {
              icon: <FaServer size={16} />,
              title: "Architecture",
              value: pagesState?.instance?.cloudInstanceResource?.architecture,
            },
            {
              icon: <FaLinux size={16} />,
              title: "Operating System",
              value:
                pagesState?.instance?.cloudInstanceResource?.operatingSystem,
            },
            {
              icon: <FaUbuntu size={16} />,
              title: "OS Distro",
              value:
                pagesState?.instance?.cloudInstanceResource
                  ?.operatingSystemDistro,
            },
            {
              icon: <RiCpuLine size={16} />,
              title: "Kernel Version",
              value: pagesState?.instance?.cloudInstanceResource?.kernelVersion,
            },
            {
              icon: <SiKubernetes size={16} />,
              title: "K8S Version",
              value:
                pagesState?.instance?.cloudInstanceResource?.kubernetesVersion,
            },
            {
              icon: <BsGpuCard size={16} />,
              title: "GPU Model",
              value:
                pagesState?.instance?.cloudInstanceResource?.gpuUsage?.[0]
                  ?.gpuModel,
            },
          ]}
        />
      }
      table={
        <GeneralTable
          type="fleet"
          title={envApplication ? "Namespaces" : "Fleets"}
          data={data}
          columns={columns}
          loading={!Array.isArray(responseFleets)}
          handleReload={handleReload}
        />
      }
    />
  );
}

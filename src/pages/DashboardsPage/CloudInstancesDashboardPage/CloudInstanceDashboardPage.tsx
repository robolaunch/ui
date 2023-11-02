import {
  envOnPremiseFleet,
  envOnPremiseRobot,
} from "../../../helpers/envProvider";
import NamespaceActionCells from "../../../components/TableActionCells/NamespaceActionCells";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import FleetActionCells from "../../../components/TableActionCells/FleetActionCells";
import ResourcesWidget from "../../../components/ResourcesWidget/ResourcesWidget";
import StateCell from "../../../components/TableInformationCells/StateCell";
import BasicCell from "../../../components/TableInformationCells/BasicCell";
import { Fragment, ReactElement, useEffect, useMemo, useState } from "react";
import InfoCell from "../../../components/TableInformationCells/InfoCell";
import UsagesWidget from "../../../components/UsagesWidget/UsagesWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import TourGuide from "../../../components/TourGuide/TourGuide";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { getGuideItem } from "../../../functions/handleGuide";
import { FaLinux, FaServer, FaUbuntu } from "react-icons/fa";
import useFunctions from "../../../hooks/useFunctions";
import { SiKubernetes } from "react-icons/si";
import { useParams } from "react-router-dom";
import useMain from "../../../hooks/useMain";
import { RiCpuLine } from "react-icons/ri";
import { BsGpuCard } from "react-icons/bs";

export default function CloudInstanceDashboardPage(): ReactElement {
  const [responseFleets, setResponseFleets] = useState<any>(undefined);
  const { pagesState, selectedState } = useMain();
  const {
    getOrganization,
    getRoboticsCloud,
    getInstance,
    getFleets,
    getNamespaces,
  } = useFunctions();
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
    } else if (pagesState?.instance?.name !== url?.instanceName) {
      handleGetInstance();
    } else {
      envOnPremiseFleet ? handleGetNamespaces() : handleGetFleets();
    }

    const timer = setInterval(() => {
      pagesState?.instance && envOnPremiseFleet
        ? handleGetNamespaces()
        : handleGetFleets();
    }, 10000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesState, url, reload]);

  useEffect(() => {
    setResponseFleets(undefined);
  }, [url]);

  const data: any = useMemo(
    () =>
      responseFleets?.map((fleet: any) => {
        return {
          key: fleet?.name,
          name: fleet,
          organization: url?.organizationName,
          roboticsCloud: url?.roboticsCloudName,
          instance: url?.instanceName,
          state: fleet?.fleetStatus || fleet?.namespaceStatus,
          actions: fleet,
        };
      }),
    [url, responseFleets],
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
              subtitle={url?.organizationName as string}
              titleURL={`/${url?.organizationName}/${url?.roboticsCloudName}/${url?.instanceName}/${rowData?.name?.name}`}
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
        body: () => {
          return <BasicCell text={url?.organizationName as string} />;
        },
      },
      {
        key: "roboticsCloud",
        header: "Robotics Cloud",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.roboticsCloud} />;
        },
      },
      {
        key: "instance",
        header: "Cloud Instance",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.instance} />;
        },
      },
      {
        key: "state",
        header: `${envOnPremiseRobot ? "Namespace" : "Fleet"} State`,
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
            <Fragment>
              {envOnPremiseFleet ? (
                <NamespaceActionCells
                  reload={() => setReload(!reload)}
                  data={{
                    organization: selectedState?.organization,
                    roboticsCloud: url?.roboticsCloudName,
                    instance: selectedState?.instance,
                    fleet: rowData?.actions,
                  }}
                />
              ) : (
                <FleetActionCells
                  reload={() => setReload(!reload)}
                  data={{
                    organization: selectedState?.organization,
                    roboticsCloud: url?.roboticsCloudName,
                    instance: selectedState?.instance,
                    fleet: rowData?.actions,
                  }}
                />
              )}
            </Fragment>
          );
        },
      },
    ],
    [url, selectedState, reload],
  );

  function handleGetOrganization() {
    getOrganization(
      {
        organizationName: url?.organizationName as string,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseFleets,
        setPages: true,
      },
    );
  }

  function handleGetRoboticsCloud() {
    getRoboticsCloud(
      {
        organizationId: pagesState?.organization?.organizationId!,
        roboticsCloudName: url?.roboticsCloudName as string,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseFleets,
        setPages: true,
      },
    );
  }

  function handleGetInstance() {
    getInstance(
      {
        organizationId: pagesState?.organization?.organizationId!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceName: url?.instanceName as string,
        region: pagesState?.roboticsCloud?.region!,
        details: true,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseFleets,
        setPages: true,
      },
    );
  }

  function handleGetFleets() {
    getFleets(
      {
        organizationId: pagesState?.organization?.organizationId!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceId: pagesState?.instance?.instanceId!,
        region: pagesState?.roboticsCloud?.region!,
      },
      {
        ifErrorNavigateTo404: !responseFleets,
        setResponse: setResponseFleets,
      },
    );
  }

  function handleGetNamespaces() {
    getNamespaces(
      {
        organizationId: selectedState?.organization?.organizationId!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.instanceId!,
        region: selectedState?.instance?.region!,
      },
      {
        ifErrorNavigateTo404: !responseFleets,
        setResponse: setResponseFleets,
      },
    );
  }

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
            // {
            //   title: `GPU (${pagesState.instance?.cloudInstanceResource?.gpuUsage?.[0]?.gpuModel})`,
            //   percentage:
            //     Number(
            //       pagesState.instance?.cloudInstanceResource?.gpuUsage?.[0]?.gpuUtilization?.charAt(
            //         0,
            //       ),
            //     ) || 1,
            // },
            {
              title: `Memory (${
                pagesState?.instance?.cloudInstanceResource?.memoryTotal || 0
              } GB)`,
              percentage:
                pagesState?.instance?.cloudInstanceResource?.memoryUsage || -1,
            },
            // {
            //   title: `Storage (${
            //     pagesState?.instance?.cloudInstanceResource?.storageTotal || 0
            //   } GB)`,
            //   percentage:
            //     Number(
            //       (
            //         (pagesState?.instance?.cloudInstanceResource
            //           ?.storageTotal! /
            //           100) *
            //         (pagesState?.instance?.cloudInstanceResource
            //           ?.storageTotal! -
            //           pagesState?.instance?.cloudInstanceResource
            //             ?.storageUsage!)
            //       ).toFixed(),
            //     ) || -1,
            // },
            {
              title: `In Network (${pagesState.instance?.cloudInstanceResource?.networkUsage?.[0]?.interfaceName})`,
              percentage:
                pagesState.instance?.cloudInstanceResource?.networkUsage?.[0]
                  ?.trafficIn || -1,
              hiddenCircle: true,
              content:
                pagesState.instance?.cloudInstanceResource?.networkUsage?.[0]
                  ?.trafficIn,
            },
            {
              title: `Out Network (${pagesState.instance?.cloudInstanceResource?.networkUsage?.[0]?.interfaceName})`,
              percentage:
                pagesState.instance?.cloudInstanceResource?.networkUsage?.[0]
                  ?.trafficOut || -1,
              hiddenCircle: true,
              content:
                pagesState.instance?.cloudInstanceResource?.networkUsage?.[0]
                  ?.trafficOut,
              size: 20,
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
          title={envOnPremiseRobot ? "Namespaces" : "Fleets"}
          data={data}
          columns={columns}
          loading={Array.isArray(responseFleets) ? false : true}
          handleReload={() => {
            setResponseFleets(undefined);
            setReload(!reload);
          }}
        />
      }
    />
  );
}

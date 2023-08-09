import React, { ReactElement, useEffect, useMemo, useState } from "react";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import FleetActionCells from "../../../components/ActionCells/FleetActionCells";
import GeneralTable from "../../../components/Table/GeneralTable";
import BasicCell from "../../../components/Cells/BasicCell";
import StateCell from "../../../components/Cells/StateCell";
import { useParams } from "react-router-dom";
import InfoCell from "../../../components/Cells/InfoCell";
import Button from "../../../components/Button/Button";
import useMain from "../../../hooks/useMain";
import useFunctions from "../../../hooks/useFunctions";
import UsagesWidget from "../../../components/UsagesWidget/UsagesWidget";
import DashboardLayout from "../../../layouts/DashboardLayout";
import ResourcesWidget from "../../../components/ResourcesWidget/ResourcesWidget";
import { FaLinux, FaServer, FaUbuntu } from "react-icons/fa";
import { SiKubernetes } from "react-icons/si";
import { RiCpuLine } from "react-icons/ri";
import { envOnPremise } from "../../../helpers/envProvider";

export default function CloudInstanceDashboardPage(): ReactElement {
  const [responseFleets, setResponseFleets] = useState<any>(undefined);
  const { pagesState, setSidebarState, selectedState } = useMain();
  const { getOrganization, getRoboticsCloud, getInstance, getFleets } =
    useFunctions();
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
      handleGetFleets();
    }

    const timer = setInterval(() => {
      pagesState?.instance && handleGetFleets();
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
          state: fleet?.fleetStatus,
          actions: fleet,
        };
      }),
    [url, responseFleets]
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
        header: `${envOnPremise ? "Namespace" : "Fleet"} State`,
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
            <FleetActionCells
              reload={() => setReload(!reload)}
              data={{
                organization: selectedState?.organization,
                roboticsCloud: url?.roboticsCloudName,
                instance: selectedState?.instance,
                fleet: rowData?.actions,
              }}
            />
          );
        },
      },
    ],
    [url, selectedState, reload]
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
      }
    );
  }

  function handleGetRoboticsCloud() {
    getRoboticsCloud(
      {
        organizationId: pagesState?.organization?.organizationId,
        roboticsCloudName: url?.roboticsCloudName as string,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseFleets,
        setPages: true,
      }
    );
  }

  function handleGetInstance() {
    getInstance(
      {
        organizationId: pagesState?.organization?.organizationId,
        roboticsCloudName: pagesState?.roboticsCloud?.name,
        instanceName: url?.instanceName as string,
        region: pagesState?.roboticsCloud?.region,
        details: true,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseFleets,
        setPages: true,
      }
    );
  }

  function handleGetFleets() {
    getFleets(
      {
        organizationId: pagesState?.organization?.organizationId,
        roboticsCloudName: pagesState?.roboticsCloud?.name,
        instanceId: pagesState?.instance?.instanceId,
        region: pagesState?.roboticsCloud?.region,
      },
      {
        ifErrorNavigateTo404: !responseFleets,
        setResponse: setResponseFleets,
      }
    );
  }

  return (
    <DashboardLayout
      widget1={
        <InformationWidget
          title={url?.instanceName || ""}
          subtitle="This page is the Fleet page of the platform. Here, you can manage, delete, or view the details of your existing fleets. If you need to create a new fleet, you can do so by clicking the button below."
          component={
            <Button
              text="Create a new Fleet"
              className="!w-40 !h-10 !text-xs"
              onClick={() => {
                setSidebarState((prevState: any): any => ({
                  ...prevState,
                  isOpen: true,
                  isCreateMode: false,
                  page: "fleet",
                }));
              }}
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
                pagesState?.instance?.cloudInstanceResource?.cpuUsage || 0,
            },
            {
              title: `Memory (${
                pagesState?.instance?.cloudInstanceResource?.memoryTotal || 0
              } GB)`,
              percentage:
                pagesState?.instance?.cloudInstanceResource?.memoryUsage || 0,
            },
            {
              title: `Storage (${
                pagesState?.instance?.cloudInstanceResource?.storageTotal || 0
              } GB)`,
              percentage:
                Number(
                  (
                    (pagesState?.instance?.cloudInstanceResource?.storageTotal /
                      100) *
                    (pagesState?.instance?.cloudInstanceResource?.storageTotal -
                      pagesState?.instance?.cloudInstanceResource?.storageUsage)
                  ).toFixed()
                ) || 0,
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
          ]}
        />
      }
      table={
        <GeneralTable
          type="fleet"
          title={envOnPremise ? "Namespaces" : "Fleets"}
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

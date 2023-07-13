import React, { ReactElement, useEffect, useMemo, useState } from "react";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import FleetActionCells from "../../../components/ActionCells/FleetActionCells";
import CountWidget from "../../../components/CountWidget/CountWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import BasicCell from "../../../components/Cells/BasicCell";
import StateCell from "../../../components/Cells/StateCell";
import { useParams } from "react-router-dom";
import InfoCell from "../../../components/Cells/InfoCell";
import Button from "../../../components/Button/Button";
import useSidebar from "../../../hooks/useSidebar";
import useFunctions from "../../../hooks/useFunctions";
import UsagesWidget from "../../../components/UsagesWidget/UsagesWidget";
import DashboardLayout from "../../../layouts/DashboardLayout";
import usePages from "../../../hooks/usePages";

export default function CloudInstanceDashboardPage(): ReactElement {
  const [responseFleets, setResponseFleets] = useState<any>(undefined);
  const { setSidebarState, selectedState } = useSidebar();
  const { getOrganization, getRoboticsCloud, getInstance, getFleets } =
    useFunctions();
  const [reload, setReload] = useState<boolean>(false);
  const url = useParams();
  const { pagesState } = usePages();

  useEffect(() => {
    if (
      pagesState?.organization?.organizationName !==
      `org_${url?.organizationName}`
    ) {
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
    } else if (pagesState?.roboticsCloud?.name !== url?.roboticsCloudName) {
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
    } else if (pagesState?.instance?.name !== url?.instanceName) {
      getInstance(
        {
          organizationId: pagesState?.organization?.organizationId,
          roboticsCloudName: pagesState?.roboticsCloud?.name,
          instanceName: url?.instanceName as string,
          region: pagesState?.roboticsCloud?.region,
        },
        {
          isSetState: true,
          ifErrorNavigateTo404: !responseFleets,
          setPages: true,
        }
      );
    } else {
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

    const timer = setInterval(() => {
      pagesState?.organization?.organizationName !==
        `org_${url?.organizationName}` &&
        pagesState?.roboticsCloud?.name !== url?.roboticsCloudName &&
        pagesState?.instance?.name !== url?.instanceName &&
        getFleets(
          {
            organizationId: pagesState?.organization?.organizationId,
            roboticsCloudName: url?.roboticsCloudName as string,
            instanceId: pagesState?.instance?.instanceId,
            region: pagesState?.roboticsCloud?.region,
          },
          {
            ifErrorNavigateTo404: !responseFleets,
            setResponse: setResponseFleets,
          }
        );
    }, 10000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesState, url, reload]);

  const data: any = useMemo(
    () =>
      responseFleets?.map((fleet: any) => {
        return {
          key: fleet?.name,
          name: fleet,
          organization: url?.organizationName,
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
        align: "lehrefft",
        body: () => {
          return <BasicCell text={url?.organizationName as string} />;
        },
      },
      {
        key: "state",
        header: "Fleet State",
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
          title={`Cloud Instances`}
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
          ]}
        />
      }
      widget3={
        <CountWidget
          data={{
            series: [
              responseFleets?.filter(
                (fleet: any) => fleet?.fleetStatus === "CheckingRemoteNamespace"
              ).length || 0,
              responseFleets?.filter(
                (fleet: any) => fleet?.fleetStatus === "CreatingNamespace"
              ).length || 0,
              responseFleets?.filter(
                (fleet: any) => fleet?.fleetStatus === "CreatingDiscoveryServer"
              ).length || 0,
              responseFleets?.filter(
                (fleet: any) => fleet?.fleetStatus === "Ready"
              ).length || 0,
              0,
            ],
            categories: [
              ["Checking"],
              ["Creating NS"],
              ["Creating DS"],
              ["Ready"],
              ["Deleting"],
            ],
          }}
          title="Robotics Cloud"
        />
      }
      table={
        <GeneralTable
          type="fleet"
          title="Fleets"
          data={data}
          columns={columns}
          loading={Array.isArray(responseFleets) ? false : true}
          handleReload={() => setReload(!reload)}
        />
      }
    />
  );
}

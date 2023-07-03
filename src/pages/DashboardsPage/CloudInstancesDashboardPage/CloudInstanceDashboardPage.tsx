import React, { ReactElement, useEffect, useMemo, useState } from "react";
import UtilizationWidget from "../../../components/UtilizationWidget/UtilizationWidget";
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

export default function CloudInstanceDashboardPage(): ReactElement {
  const [responseCurrentOrganization, setResponseCurrentOrganization] =
    useState<any>(undefined);
  const [responseCurrentRoboticsCloud, setResponseCurrentRoboticsCloud] =
    useState<any>(undefined);
  const [responseCurrentInstance, setResponseCurrentInstance] =
    useState<any>(undefined);
  const [responseFleets, setResponseFleets] = useState<any>(undefined);
  const { setSidebarState, selectedState } = useSidebar();
  const { getOrganization, getRoboticsCloud, getInstance, getFleets } =
    useFunctions();
  const [reload, setReload] = useState<boolean>(false);
  const url = useParams();

  useEffect(() => {
    if (!responseCurrentOrganization) {
      getOrganization(
        {
          organizationName: url?.organizationName as string,
        },
        {
          isSetState: true,
          ifErrorNavigateTo404: !responseCurrentOrganization,
          setResponse: setResponseCurrentOrganization,
        }
      );
    } else if (!responseCurrentRoboticsCloud) {
      getRoboticsCloud(
        {
          organizationId: responseCurrentOrganization?.organizationId,
          roboticsCloudName: url?.roboticsCloudName as string,
        },
        {
          isSetState: true,
          ifErrorNavigateTo404: !responseCurrentRoboticsCloud,
          setResponse: setResponseCurrentRoboticsCloud,
        }
      );
    } else if (!responseCurrentInstance) {
      getInstance(
        {
          organizationId: responseCurrentOrganization?.organizationId,
          roboticsCloudName: responseCurrentRoboticsCloud?.name,
          instanceName: url?.instanceName as string,
          region: responseCurrentRoboticsCloud?.region,
        },
        {
          isSetState: true,
          ifErrorNavigateTo404: !responseCurrentInstance,
          setResponse: setResponseCurrentInstance,
        }
      );
    } else {
      getFleets(
        {
          organizationId: responseCurrentOrganization?.organizationId,
          roboticsCloudName: responseCurrentRoboticsCloud?.name,
          instanceId: responseCurrentInstance?.instanceId,
          region: responseCurrentRoboticsCloud?.region,
        },
        {
          ifErrorNavigateTo404: !responseFleets,
          setResponse: setResponseFleets,
        }
      );
    }

    const timer =
      responseCurrentOrganization &&
      responseCurrentRoboticsCloud &&
      responseCurrentInstance &&
      setInterval(() => {
        getFleets(
          {
            organizationId: responseCurrentOrganization?.organizationId,
            roboticsCloudName: url?.roboticsCloudName as string,
            instanceId: responseCurrentInstance?.instanceId,
            region: responseCurrentRoboticsCloud?.region,
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
  }, [
    responseCurrentOrganization,
    responseCurrentRoboticsCloud,
    responseCurrentInstance,
    url,
    reload,
  ]);

  useEffect(() => {
    console.log(responseCurrentRoboticsCloud);
  }, [responseCurrentRoboticsCloud]);

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
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 grid-cols-12">
        <div className="col-span-4">
          <InformationWidget
            title={url?.instanceName || ""}
            subtitle="From this page, you can manage your fleets and see the status of
            your fleets."
            actiontitle="If you want to new fleet, you can use this button."
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
        </div>
        <div className="col-span-12 lg:col-span-5">
          <UtilizationWidget title="Robotics Cloud" />
        </div>
        <div className="col-span-12 lg:col-span-3">
          <CountWidget
            data={{
              series: [
                responseFleets?.filter(
                  (fleet: any) =>
                    fleet?.fleetStatus === "CheckingRemoteNamespace"
                ).length || 0,
                responseFleets?.filter(
                  (fleet: any) => fleet?.fleetStatus === "CreatingNamespace"
                ).length || 0,
                responseFleets?.filter(
                  (fleet: any) =>
                    fleet?.fleetStatus === "CreatingDiscoveryServer"
                ).length || 0,
                responseFleets?.filter(
                  (fleet: any) => fleet?.fleetStatus === "Ready"
                ).length || 0,
              ],
              categories: [
                ["Checking"],
                ["Creating NS"],
                ["Creating DS"],
                ["Ready"],
              ],
            }}
            title="Robotics Cloud"
          />
        </div>
      </div>
      <div className="grid grid-cols-1">
        <GeneralTable
          type="fleet"
          title="Fleets"
          data={data}
          columns={columns}
          loading={Array.isArray(responseFleets) ? false : true}
          handleReload={() => setReload(!reload)}
        />
      </div>
    </div>
  );
}

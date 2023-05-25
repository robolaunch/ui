import React, { ReactElement, useEffect, useMemo, useState } from "react";
import UtilizationWidget from "../../../components/UtilizationWidget/UtilizationWidget";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import FleetActionCells from "../../../components/ActionCells/FleetActionCells";
import CountWidget from "../../../components/CountWidget/CountWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import BasicCell from "../../../components/Cells/BasicCell";
import StateCell from "../../../components/Cells/StateCell";
import InfoCell from "../../../components/Cells/InfoCell";
import Button from "../../../components/Button/Button";
import { getOrganizations } from "../../../resources/OrganizationSlice";
import { getFederatedFleets } from "../../../resources/FleetSlice";
import { getInstances } from "../../../resources/InstanceSlice";
import { useAppDispatch } from "../../../hooks/redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function CloudInstanceDashboardPage(): ReactElement {
  const [currentOrganization, setCurrentOrganization] =
    useState<any>(undefined);
  const [currentInstance, setCurrentInstance] = useState<any>(undefined);
  const [responseFleets, setResponseFleets] = useState<any>(undefined);
  const [reload, setReload] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const url = useParams();

  useEffect(() => {
    if (!currentOrganization) {
      handleGetOrganization();
    } else if (currentOrganization && !currentInstance) {
      handleGetInstances();
    } else if (currentOrganization && currentInstance) {
      handleGetFleets();
    }

    const timer =
      currentOrganization &&
      currentInstance &&
      setInterval(() => {
        handleGetFleets();
      }, 10000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, reload, currentOrganization, currentInstance]);

  useEffect(() => {
    setResponseFleets(undefined);
  }, [url]);

  function handleGetOrganization() {
    dispatch(getOrganizations()).then((organizationsResponse: any) => {
      if (organizationsResponse?.payload?.success) {
        setCurrentOrganization(
          organizationsResponse?.payload?.data?.find(
            (organization: any) =>
              organization?.organizationName === `org_${url?.organizationName}`
          ) || undefined
        );
      } else {
        toast.error(
          "You are not have this content or not authorized to view this page."
        );
      }
    });
  }

  function handleGetFleets() {
    dispatch(
      getFederatedFleets({
        organizationId: currentOrganization?.organizationId,
        roboticsCloudName: url?.roboticsCloudName,
        instanceId: currentInstance?.instanceId,
        region: currentInstance?.region,
      })
    ).then((responseFederatedFleets: any) => {
      setResponseFleets(
        responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]
          ?.cloudInstances[0]?.robolaunchFederatedFleets || []
      );
    });
  }

  function handleGetInstances() {
    dispatch(
      getInstances({
        organizationId: currentOrganization?.organizationId,
        roboticsCloudName: url?.roboticsCloudName,
      })
    ).then((responseInstances: any) => {
      if (responseInstances?.payload?.success) {
        setCurrentInstance(
          responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances?.find(
            (instance: any) => instance?.name === url?.instanceName
          ) || undefined
        );
      } else {
        toast.error(
          "You are not have this content or not authorized to view this page."
        );
      }
    });
  }

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
        body: (rowData: any) => {
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
                organization: currentOrganization,
                roboticsCloud: url?.roboticsCloudName,
                instance: currentInstance,
                fleet: rowData?.actions,
              }}
            />
          );
        },
      },
    ],
    [url, currentInstance, currentOrganization, reload]
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 grid-cols-12">
        <div className="col-span-4">
          <InformationWidget
            title={url?.roboticsCloudName || ""}
            subtitle="From this page, you can view, control or get information about all
            the details of the teams in your organization."
            actiontitle="If you need to create a new team or check the users in the team you
            can proceed here."
            component={
              <Button text="Manage Fleets" className="!w-28 !h-10 !text-xs" />
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

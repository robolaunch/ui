import React, { ReactElement, useEffect, useMemo, useState } from "react";
import UtilizationWidget from "../../../components/UtilizationWidget/UtilizationWidget";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import CountWidget from "../../../components/CountWidget/CountWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import InfoCell from "../../../components/Cells/InfoCell";
import Button from "../../../components/Button/Button";
import { useAppDispatch } from "../../../hooks/redux";
import { useParams } from "react-router-dom";
import useSidebar from "../../../hooks/useSidebar";
import BasicCell from "../../../components/Cells/BasicCell";

import RobotActionCells from "../../../components/ActionCells/RobotActionCells";
import StateCell from "../../../components/Cells/StateCell";
import RobotServicesCell from "../../../components/Cells/RobotServicesCell";
import useFunctions from "../../../hooks/useFunctions";

export default function FleetDashboardPage(): ReactElement {
  const [responseRobots, setResponseRobots] = useState<any>(null);
  const { selectedState, setSidebarState } = useSidebar();
  const [reload, setReload] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const url = useParams();

  const {
    handleSetterCurrentOrganization,
    handleSetterCurrentRoboticsCloud,
    handleSetterCurrentInstance,
    handleSetterCurrentFleet,
    handleSetterResponseRobots,
  } = useFunctions();

  useEffect(() => {
    if (!selectedState?.organization) {
      handleSetterCurrentOrganization(url?.organizationName);
    } else if (!selectedState?.roboticsCloud) {
      handleSetterCurrentRoboticsCloud(url?.roboticsCloudName);
    } else if (!selectedState?.instance) {
      handleSetterCurrentInstance(url?.instanceName);
    } else if (!selectedState?.fleet) {
      handleSetterCurrentFleet(url?.fleetName);
    } else {
      handleSetterResponseRobots(setResponseRobots);
    }

    const timer =
      selectedState?.organization &&
      selectedState?.roboticsCloud &&
      selectedState?.instance &&
      selectedState?.fleet &&
      setInterval(() => {
        handleSetterResponseRobots(setResponseRobots);
      }, 10000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, reload, dispatch, selectedState]);

  const data: any = useMemo(
    () =>
      responseRobots?.map((robot: any) => {
        return {
          key: robot?.name,
          name: robot,
          organization: url?.organizationName,
          virtualState: robot?.robotClusters[0]?.robotStatus || undefined,
          physicalState: robot?.robotClusters[1]?.robotStatus || undefined,
          robotServices: {
            isEnabledRosBridge: robot?.bridgeEnabled,
            isEnabledIDE: robot?.ideEnabled,
            isEnabledVDI: robot?.vdiEnabled,
          },
          actions: {
            organizationId: selectedState?.organization?.organizationId,
            roboticsCloudName: url?.roboticsCloudName,
            instanceId: selectedState?.instance?.instanceId,
            region: selectedState?.instance?.region,
            fleetName: url?.fleetName,
            robotName: robot?.name,
            virtualState: robot?.robotClusters[0] || undefined,
            physicalState: robot?.robotClusters[1] || undefined,
          },
        };
      }),
    [responseRobots, url, selectedState]
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
              subtitle={rowData?.name?.fleetName}
              titleURL={`/${url?.organizationName}/${url?.roboticsCloudName}/${url?.instanceName}/${url?.fleetName}/${rowData?.name?.name}`}
            />
          );
        },
      },
      {
        key: "organization",
        header: "Organization",
        sortable: true,
        filter: true,
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.organization} />;
        },
      },
      {
        key: "robotServices",
        header: "Robot Services",
        sortable: true,
        filter: true,
        align: "left",
        body: (rowData: any) => {
          return (
            <RobotServicesCell
              data={undefined}
              states={rowData.robotServices}
            />
          );
        },
      },
      {
        key: "virtualState",
        header: "Virtual Robot State",
        sortable: true,
        filter: true,
        align: "left",
        body: (rowData: any) => {
          return <StateCell state={rowData?.virtualState} />;
        },
      },
      {
        key: "physicalState",
        header: "Physical Robot State",
        sortable: true,
        filter: true,
        align: "left",
        body: (rowData: any) => {
          if (!rowData?.physicalState) {
            return <BasicCell text="None" />;
          }
          return <StateCell state={rowData?.physicalState} />;
        },
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        body: (rowData: any) => {
          return (
            <RobotActionCells
              data={rowData?.actions}
              reload={() => setReload(!reload)}
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 grid-cols-12">
        <div className="col-span-4">
          <InformationWidget
            title={url?.fleetName || ""}
            subtitle="From this page you can see details the robots"
            actiontitle="If you need to create a new robot, you
            can proceed here."
            component={
              <Button
                text="Create a new Robot"
                className="!w-44 !h-10 !text-xs"
                onClick={() => {
                  setSidebarState((prevState: any): any => ({
                    ...prevState,
                    isOpen: true,
                    isCreateMode: false,
                    page: "robots",
                  }));
                }}
              />
            }
          />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <UtilizationWidget title="Robot" />
        </div>
        <div className="col-span-12 lg:col-span-3">
          <CountWidget data={[5, 2, 4, 3]} title="Robot" />
        </div>
      </div>
      <div className="grid grid-cols-1">
        <GeneralTable
          type="robot"
          title="Robots"
          data={data}
          columns={columns}
          loading={Array.isArray(responseRobots) ? false : true}
          handleReload={() => {
            setResponseRobots(undefined);
            setReload(!reload);
          }}
        />
      </div>
    </div>
  );
}

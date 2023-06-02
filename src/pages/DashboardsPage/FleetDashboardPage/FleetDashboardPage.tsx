import React, { ReactElement, useEffect, useMemo, useState } from "react";
import UtilizationWidget from "../../../components/UtilizationWidget/UtilizationWidget";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import CountWidget from "../../../components/CountWidget/CountWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import InfoCell from "../../../components/Cells/InfoCell";
import Button from "../../../components/Button/Button";
import { useAppDispatch } from "../../../hooks/redux";
import { useNavigate, useParams } from "react-router-dom";
import useSidebar from "../../../hooks/useSidebar";
import BasicCell from "../../../components/Cells/BasicCell";
import {
  handleSetterCurrentInstances,
  handleSetterCurrentOrganization,
  handleSetterResponseRobots,
} from "../../../helpers/dashboardDispatcherFunctions";
import RobotActionCells from "../../../components/ActionCells/RobotActionCells";
import StateCell from "../../../components/Cells/StateCell";
import RobotServicesCell from "../../../components/Cells/RobotServicesCell";

export default function FleetDashboardPage(): ReactElement {
  const [responseRobots, setResponseRobots] = useState<any>(null);
  const { selectedState, setSidebarState } = useSidebar();
  const [reload, setReload] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const url = useParams();

  const [currentOrganization, setCurrentOrganization] = useState<any>(
    selectedState?.organization || undefined
  );
  const [currentInstance, setCurrentInstance] = useState<any>(
    selectedState?.instance || undefined
  );

  useEffect(() => {
    if (!currentOrganization) {
      handleSetterCurrentOrganization({
        dispatch,
        url,
        navigate,
        setCurrentOrganization,
      });
    } else if (currentOrganization && !currentInstance) {
      handleSetterCurrentInstances({
        dispatch,
        url,
        navigate,
        currentOrganization,
        setCurrentInstance,
      });
    } else if (currentOrganization && currentInstance) {
      handleSetterResponseRobots({
        dispatch,
        url,
        navigate,
        currentOrganization,
        currentInstance,
        setResponseRobots,
      });
    }

    const timer =
      currentOrganization &&
      currentInstance &&
      setInterval(() => {
        handleSetterResponseRobots({
          dispatch,
          url,
          navigate,
          currentOrganization,
          currentInstance,
          setResponseRobots,
        });
      }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, [url, reload, currentOrganization, currentInstance, dispatch, navigate]);

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
            organizationId: currentOrganization?.organizationId,
            roboticsCloudName: url?.roboticsCloudName,
            instanceId: currentInstance?.instanceId,
            region: currentInstance?.region,
            fleetName: url?.fleetName,
            robotName: robot?.name,
            virtualState: robot?.robotClusters[0] || undefined,
            physicalState: robot?.robotClusters[1] || undefined,
          },
        };
      }),
    [currentInstance, currentOrganization, responseRobots, url]
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

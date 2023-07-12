import React, {
  Fragment,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import CountWidget from "../../../components/CountWidget/CountWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import InfoCell from "../../../components/Cells/InfoCell";
import Button from "../../../components/Button/Button";
import { useParams } from "react-router-dom";
import useSidebar from "../../../hooks/useSidebar";
import BasicCell from "../../../components/Cells/BasicCell";

import RobotActionCells from "../../../components/ActionCells/RobotActionCells";
import StateCell from "../../../components/Cells/StateCell";
import RobotServicesCell from "../../../components/Cells/RobotServicesCell";
import useFunctions from "../../../hooks/useFunctions";
import DashboardLayout from "../../../layouts/DashboardLayout";

export default function FleetDashboardPage(): ReactElement {
  const [responseCurrentOrganization, setResponseCurrentOrganization] =
    useState<any>(undefined);
  const [responseCurrentRoboticsCloud, setResponseCurrentRoboticsCloud] =
    useState<any>(undefined);
  const [responseCurrentInstance, setResponseCurrentInstance] =
    useState<any>(undefined);
  const [responseCurrentFleet, setResponseCurrentFleet] =
    useState<any>(undefined);
  const [responseRobots, setResponseRobots] = useState<any>(undefined);
  const { selectedState, setSidebarState } = useSidebar();
  const [reload, setReload] = useState<boolean>(false);
  const url = useParams();

  const {
    getOrganization,
    getRoboticsCloud,
    getInstance,
    getFleet,
    getRobots,
  } = useFunctions();

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
    } else if (!responseCurrentFleet) {
      getFleet(
        {
          organizationId: responseCurrentOrganization?.organizationId,
          roboticsCloudName: responseCurrentRoboticsCloud?.name,
          instanceId: responseCurrentInstance?.instanceId,
          region: responseCurrentRoboticsCloud?.region,
          fleetName: url?.fleetName as string,
        },
        {
          isSetState: true,
          ifErrorNavigateTo404: !responseCurrentFleet,
          setResponse: setResponseCurrentFleet,
        }
      );
    } else {
      getRobots(
        {
          organizationId: responseCurrentOrganization?.organizationId,
          roboticsCloudName: responseCurrentRoboticsCloud?.name,
          instanceId: responseCurrentInstance?.instanceId,
          region: responseCurrentRoboticsCloud?.region,
          fleetName: responseCurrentFleet?.name,
        },
        {
          ifErrorNavigateTo404: !responseRobots,
          setResponse: setResponseRobots,
        }
      );
    }

    const timer =
      selectedState?.organization &&
      selectedState?.roboticsCloud &&
      selectedState?.instance &&
      selectedState?.fleet &&
      setInterval(() => {
        getRobots(
          {
            organizationId: responseCurrentOrganization?.organizationId,
            roboticsCloudName: responseCurrentRoboticsCloud?.name,
            instanceId: responseCurrentInstance?.instanceId,
            region: responseCurrentRoboticsCloud?.region,
            fleetName: responseCurrentFleet?.name,
          },
          {
            ifErrorNavigateTo404: !responseRobots,
            setResponse: setResponseRobots,
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
    responseCurrentFleet,
    url,
    reload,
  ]);

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
            region: selectedState?.roboticsCloud?.region,
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
    <DashboardLayout
      widget1={
        <InformationWidget
          title={url?.fleetName || ""}
          subtitle="This page is the Robots page of the platform. Here, you can manage, delete, or view the details of your existing robots. If you need to create a new robot, you can do so by clicking the button below."
          component={
            <Button
              text="Create a new Robot"
              className="!w-44 !h-10 !text-xs"
              onClick={() => {
                setSidebarState((prevState: any): any => ({
                  ...prevState,
                  isOpen: true,
                  isCreateMode: false,
                  page: "robot",
                }));
              }}
            />
          }
        />
      }
      widget2={<></>}
      widget3={<CountWidget data={[5, 2, 4, 3]} title="Robot" />}
      table={
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
      }
    />
  );
}

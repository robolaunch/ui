import React, { ReactElement, useEffect, useMemo, useState } from "react";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import InfoCell from "../../../components/Cells/InfoCell";
import Button from "../../../components/Button/Button";
import { useParams } from "react-router-dom";
import useMain from "../../../hooks/useMain";
import BasicCell from "../../../components/Cells/BasicCell";
import RobotActionCells from "../../../components/ActionCells/RobotActionCells";
import StateCell from "../../../components/Cells/StateCell";
import RobotServicesCell from "../../../components/Cells/RobotServicesCell";
import useFunctions from "../../../hooks/useFunctions";
import DashboardLayout from "../../../layouts/DashboardLayout";
import CountWidget from "../../../components/CountWidget/CountWidget";
import RegionsWidget from "../../../components/RegionsWidget/RegionsWidget";
import {
  envOnPremiseFleet,
  envOnPremiseRobot,
} from "../../../helpers/envProvider";
import EnvironmentActionCells from "../../../components/ActionCells/EnvironmentActionCells";

export default function FleetDashboardPage(): ReactElement {
  const [responseRobots, setResponseRobots] = useState<any>(undefined);
  const { pagesState, selectedState, setSidebarState } = useMain();
  const [reload, setReload] = useState<boolean>(false);
  const url = useParams();

  const {
    getOrganization,
    getRoboticsCloud,
    getInstance,
    getFleet,
    getNamespace,
    getRobots,
    getEnvironments,
  } = useFunctions();

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
    } else if (pagesState?.fleet?.name !== url?.fleetName) {
      envOnPremiseFleet ? handleGetNamespace() : handleGetFleet();
    } else {
      envOnPremiseRobot ? handleGetEnvironments() : handleGetRobots();
    }

    const timer =
      selectedState?.organization &&
      selectedState?.roboticsCloud &&
      selectedState?.instance &&
      selectedState?.fleet &&
      setInterval(() => {
        pagesState?.fleet && envOnPremiseRobot
          ? handleGetEnvironments()
          : handleGetRobots();
      }, 10000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesState, url, reload]);

  useEffect(() => {
    setResponseRobots(undefined);
  }, [url]);

  const data: any = useMemo(
    () =>
      responseRobots?.map((robot: any) => {
        return {
          key: robot?.name,
          name: robot,
          organization: url?.organizationName,
          roboticsCloud: url?.roboticsCloudName,
          instance: url?.instanceName,
          fleet: url?.fleetName,
          virtualState: robot?.robotClusters?.[0]?.robotStatus || undefined,
          physicalState: robot?.robotClusters?.[1]?.robotStatus || undefined,
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
            virtualState: robot?.robotClusters?.[0] || undefined,
            physicalState: robot?.robotClusters?.[1] || undefined,
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
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.organization} />;
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
        key: "fleet",
        header: envOnPremiseRobot ? "Namespace" : "Fleet",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.fleet} />;
        },
      },
      !envOnPremiseRobot && {
        key: "robotServices",
        header: `${envOnPremiseRobot ? "Application" : "Robot"} Services`,
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
        header: `Virtual ${envOnPremiseRobot ? "Application" : "Robot"} State`,
        sortable: true,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <StateCell state={rowData?.virtualState} />;
        },
      },
      !envOnPremiseRobot && {
        key: "physicalState",
        header: `Physical ${envOnPremiseRobot ? "Application" : "Robot"} State`,
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
          return envOnPremiseRobot ? (
            <EnvironmentActionCells
              data={rowData?.actions}
              reload={() => setReload(!reload)}
            />
          ) : (
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

  function handleGetOrganization() {
    getOrganization(
      {
        organizationName: url?.organizationName as string,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseRobots,
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
        ifErrorNavigateTo404: !responseRobots,
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
        ifErrorNavigateTo404: !responseRobots,
        setPages: true,
      }
    );
  }

  function handleGetFleet() {
    getFleet(
      {
        organizationId: pagesState?.organization?.organizationId,
        roboticsCloudName: pagesState?.roboticsCloud?.name,
        instanceId: pagesState?.instance?.instanceId,
        region: pagesState?.roboticsCloud?.region,
        fleetName: url?.fleetName as string,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseRobots,
        setPages: true,
      }
    );
  }

  function handleGetNamespace() {
    getNamespace(
      {
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
        namespaceName: url?.fleetName as string,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseRobots,
        setPages: true,
      }
    );
  }

  function handleGetRobots() {
    getRobots(
      {
        organizationId: pagesState?.organization?.organizationId,
        roboticsCloudName: pagesState?.roboticsCloud?.name,
        instanceId: pagesState?.instance?.instanceId,
        region: pagesState?.roboticsCloud?.region,
        fleetName: pagesState?.fleet?.name,
      },
      {
        ifErrorNavigateTo404: !responseRobots,
        setResponse: setResponseRobots,
      }
    );
  }

  function handleGetEnvironments() {
    getEnvironments(
      {
        organizationId: pagesState?.organization?.organizationId,
        roboticsCloudName: pagesState?.roboticsCloud?.name,
        instanceId: pagesState?.instance?.instanceId,
        region: pagesState?.roboticsCloud?.region,
        fleetName: pagesState?.fleet?.name,
      },
      {
        ifErrorNavigateTo404: !responseRobots,
        setResponse: setResponseRobots,
      }
    );
  }

  return (
    <DashboardLayout
      widget1={
        <InformationWidget
          title={url?.fleetName || ""}
          subtitle="This page is the Robots page of the platform. Here, you can manage, delete, or view the details of your existing robots. If you need to create a new robot, you can do so by clicking the button below."
          component={
            <Button
              text={`Create a new ${
                envOnPremiseRobot ? "Application" : "Robot"
              }`}
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
      widget2={
        <RegionsWidget
          title="Robotics Cloud"
          responseData={[selectedState?.instance?.region]}
        />
      }
      widget3={
        <CountWidget
          data={
            responseRobots
              ? [
                  {
                    label: "Creating",
                    value:
                      responseRobots.filter(
                        (robot: any) =>
                          robot?.robotClusters?.[0]?.robotStatus !==
                          "EnvironmentReady"
                      )?.length || 0,
                    color: "#ffa500",
                  },
                  {
                    label: "Ready",
                    value:
                      responseRobots.filter(
                        (robot: any) =>
                          robot?.robotClusters?.[0]?.robotStatus ===
                          "EnvironmentReady"
                      )?.length || 0,
                    color: "#AC2DFE99",
                  },
                  {
                    label: "Error",
                    value: 0,
                    color: "#ff0000",
                  },
                ]
              : []
          }
        />
      }
      table={
        <GeneralTable
          type={envOnPremiseRobot ? "application" : "robot"}
          title={envOnPremiseRobot ? "Applications" : "Robots"}
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

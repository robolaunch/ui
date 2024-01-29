import EnvironmentActionCells from "../components/TableActionCells/EnvironmentActionCells";
import RobotActionCells from "../components/TableActionCells/RobotActionCells";
import { handleSplitOrganizationName } from "../functions/GeneralFunctions";
import StateCell from "../components/TableInformationCells/StateCell";
import BasicCell from "../components/TableInformationCells/BasicCell";
import InfoCell from "../components/TableInformationCells/InfoCell";
import { useEffect, useMemo, useState } from "react";
import useFunctions from "../hooks/useFunctions";
import { useParams } from "react-router-dom";
import useMain from "../hooks/useMain";
import { IEnvironment } from "../interfaces/environment/environment.interface";

export function NamespaceTableData() {
  const { pagesState, selectedState, applicationMode } = useMain();
  const url = useParams();
  const [reload, setReload] = useState<boolean>(false);
  const [responseRobots, setResponseRobots] = useState<
    IEnvironment[] | undefined
  >(undefined);

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
    if (pagesState?.organization?.name !== `org_${url?.organizationName}`) {
      handleGetOrganization();
    } else if (pagesState?.roboticsCloud?.name !== url?.roboticsCloudName) {
      handleGetRoboticsCloud();
    } else if (pagesState?.instance?.name !== url?.instanceName) {
      handleGetInstance();
    } else if (pagesState?.fleet?.name !== url?.fleetName) {
      applicationMode ? handleGetNamespace() : handleGetFleet();
    } else {
      applicationMode ? handleGetEnvironments() : handleGetRobots();
    }

    const timer = setInterval(() => {
      selectedState?.organization &&
      selectedState?.roboticsCloud &&
      selectedState?.instance &&
      selectedState?.fleet &&
      pagesState?.fleet &&
      applicationMode
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

  function handleReload() {
    setResponseRobots(undefined);
    setReload((prevState: boolean) => !prevState);
  }

  function handleGetOrganization() {
    getOrganization(
      {
        organizationName: url?.organizationName!,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseRobots,
        setPages: true,
      },
    );
  }

  function handleGetRoboticsCloud() {
    getRoboticsCloud(
      {
        organizationId: pagesState?.organization?.id!,
        roboticsCloudName: url?.roboticsCloudName!,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseRobots,
        setPages: true,
      },
    );
  }

  function handleGetInstance() {
    getInstance(
      {
        organizationId: pagesState?.organization?.id!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceName: url?.instanceName!,
        region: pagesState?.roboticsCloud?.region!,
        details: true,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseRobots,
        setPages: true,
      },
    );
  }

  function handleGetFleet() {
    getFleet(
      {
        organizationId: pagesState?.organization?.id!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceId: pagesState?.instance?.id!,
        region: pagesState?.roboticsCloud?.region!,
        fleetName: url?.fleetName!,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseRobots,
        setPages: true,
      },
    );
  }

  function handleGetNamespace() {
    getNamespace(
      {
        organizationId: selectedState?.organization?.id!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.id!,
        region: selectedState?.roboticsCloud?.name!,
        namespaceName: url?.fleetName!,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseRobots,
        setPages: true,
      },
    );
  }

  function handleGetRobots() {
    getRobots(
      {
        organizationId: pagesState?.organization?.id!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceId: pagesState?.instance?.id!,
        region: pagesState?.roboticsCloud?.region!,
        fleetName: pagesState?.fleet?.name!,
      },
      {
        ifErrorNavigateTo404: !responseRobots,
        setResponse: setResponseRobots,
      },
    );
  }

  function handleGetEnvironments() {
    getEnvironments(
      {
        organizationId: pagesState?.organization?.id!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceId: pagesState?.instance?.id!,
        region: pagesState?.roboticsCloud?.region!,
        fleetName: pagesState?.fleet?.name!,
      },
      {
        ifErrorNavigateTo404: !responseRobots,
        setResponse: setResponseRobots,
      },
    );
  }

  const data: any = useMemo(
    () =>
      responseRobots?.map((robot: any) => {
        return {
          key: robot?.name,
          name: robot,
          organization: handleSplitOrganizationName(
            pagesState?.organization?.name!,
          ),
          roboticsCloud: pagesState?.roboticsCloud?.name!,
          instance: pagesState?.instance?.name!,
          fleet: pagesState?.fleet?.name!,
          virtualState: robot?.robotClusters?.[0]?.robotStatus || undefined,
          physicalState: robot?.robotClusters?.[1]?.robotStatus || undefined,
          robotServices: {
            isEnabledRosBridge: robot?.bridgeEnabled,
            isEnabledIDE: robot?.ideEnabled,
            isEnabledVDI: robot?.vdiEnabled,
          },
          actions: {
            organizationId: pagesState.organization?.id!,
            roboticsCloudName: pagesState.roboticsCloud?.name!,
            instanceId: pagesState.instance?.id!,
            region: pagesState.roboticsCloud?.name!,
            fleetName: pagesState.fleet?.name!,
            robotName: robot?.name,
            virtualState: robot?.robotClusters?.[0] || undefined,
            physicalState: robot?.robotClusters?.[1] || undefined,
          },
        };
      }),
    [responseRobots, pagesState],
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
              titleURL={`/${handleSplitOrganizationName(
                pagesState?.organization?.name!,
              )}/${pagesState.roboticsCloud?.name}/${
                pagesState.instance?.name
              }/${pagesState.fleet?.name}/${rowData?.name?.name}`}
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
        header: "Region",
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
        header: applicationMode ? "Namespace" : "Fleet",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.fleet} />;
        },
      },
      !applicationMode && {
        key: "robotServices",
        header: `ROS 2 Bridge`,
        sortable: true,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return (
            <StateCell state={rowData.robotServices ? "Active" : "Deactive"} />
          );
        },
      },
      {
        key: "virtualState",
        header: `Virtual ${applicationMode ? "Application" : "Robot"} State`,
        sortable: true,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <StateCell state={rowData?.virtualState} />;
        },
      },
      !applicationMode && {
        key: "physicalState",
        header: `Physical ${applicationMode ? "Application" : "Robot"} State`,
        sortable: true,
        filter: false,
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
          return applicationMode ? (
            <EnvironmentActionCells
              data={rowData?.actions}
              reload={() => setReload((prevState: boolean) => !prevState)}
            />
          ) : (
            <RobotActionCells
              data={rowData?.actions}
              reload={() => setReload((prevState: boolean) => !prevState)}
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pagesState, setReload],
  );

  return {
    data,
    columns,
    responseRobots,
    handleReload,
  };
}

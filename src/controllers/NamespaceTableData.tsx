import { useMemo } from "react";
import useMain from "../hooks/useMain";
import InfoCell from "../components/TableInformationCells/InfoCell";
import BasicCell from "../components/TableInformationCells/BasicCell";
import { envOnPremiseRobot } from "../helpers/envProvider";
import RobotServicesCell from "../components/TableInformationCells/RobotServicesCell";
import StateCell from "../components/TableInformationCells/StateCell";
import EnvironmentActionCells from "../components/TableActionCells/EnvironmentActionCells";
import RobotActionCells from "../components/TableActionCells/RobotActionCells";
import { handleSplitOrganizationName } from "../functions/GeneralFunctions";

interface INamespaceTableData {
  responseRobots: any;
  setReload: any;
}

export function NamespaceTableData({
  responseRobots,
  setReload,
}: INamespaceTableData) {
  const { pagesState } = useMain();

  const data: any = useMemo(
    () =>
      responseRobots?.map((robot: any) => {
        return {
          key: robot?.name,
          name: robot,
          organization: handleSplitOrganizationName(
            pagesState?.organization?.organizationName!,
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
            organizationId: pagesState.organization?.organizationId!,
            roboticsCloudName: pagesState.roboticsCloud?.name!,
            instanceId: pagesState.instance?.instanceId!,
            region: pagesState.instance?.region!,
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
                pagesState?.organization?.organizationName!,
              )}/${pagesState.roboticsCloud?.name}/${pagesState.instance
                ?.name}/${pagesState.fleet?.name}/${rowData?.name?.name}`}
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
  };
}

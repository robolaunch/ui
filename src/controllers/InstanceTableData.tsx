import { Fragment, useMemo } from "react";
import useMain from "../hooks/useMain";
import InfoCell from "../components/TableInformationCells/InfoCell";
import { handleSplitOrganizationName } from "../functions/GeneralFunctions";
import BasicCell from "../components/TableInformationCells/BasicCell";
import { envOnPremiseFleet, envOnPremiseRobot } from "../helpers/envProvider";
import StateCell from "../components/TableInformationCells/StateCell";
import NamespaceActionCells from "../components/TableActionCells/NamespaceActionCells";
import FleetActionCells from "../components/TableActionCells/FleetActionCells";

interface IInstanceTableData {
  responseFleets: any;
  setReload: any;
}

export function InstanceTableData({
  responseFleets,
  setReload,
}: IInstanceTableData) {
  const { pagesState } = useMain();

  const data: any = useMemo(
    () =>
      responseFleets?.map((fleet: any) => {
        return {
          key: fleet?.name,
          name: fleet,
          organization: pagesState?.organization?.organizationName,
          roboticsCloud: pagesState?.roboticsCloud?.name,
          instance: pagesState?.instance?.name,
          state: fleet?.fleetStatus || fleet?.namespaceStatus,
          actions: fleet,
        };
      }),
    [pagesState, responseFleets],
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
              subtitle={pagesState.organization?.organizationName!}
              titleURL={`/${handleSplitOrganizationName(
                pagesState?.organization?.organizationName!,
              )}/${pagesState?.roboticsCloud?.name}/${pagesState?.instance
                ?.name}/${rowData?.name?.name}`}
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
          return (
            <BasicCell text={pagesState?.organization?.organizationName!} />
          );
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
        header: `${envOnPremiseRobot ? "Namespace" : "Fleet"} State`,
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
            <Fragment>
              {envOnPremiseFleet ? (
                <NamespaceActionCells
                  reload={() => setReload((prevState: boolean) => !prevState)}
                  data={{
                    organization: pagesState?.organization,
                    roboticsCloud: pagesState?.roboticsCloud?.name,
                    instance: pagesState?.instance,
                    fleet: rowData?.actions,
                  }}
                />
              ) : (
                <FleetActionCells
                  reload={() => setReload((prevState: boolean) => !prevState)}
                  data={{
                    organization: pagesState?.organization,
                    roboticsCloud: pagesState?.roboticsCloud?.name,
                    instance: pagesState?.instance,
                    fleet: rowData?.actions,
                  }}
                />
              )}
            </Fragment>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pagesState, responseFleets],
  );

  return { data, columns };
}

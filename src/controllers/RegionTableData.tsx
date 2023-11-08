import { Dispatch, Fragment, SetStateAction, useMemo } from "react";
import useMain from "../hooks/useMain";
import InfoCell from "../components/TableInformationCells/InfoCell";
import BasicCell from "../components/TableInformationCells/BasicCell";
import StateCell from "../components/TableInformationCells/StateCell";
import CirclePercentageBar from "../components/CirclePercentageBar/CirclePercentageBar";
import InstanceActionCells from "../components/TableActionCells/InstanceActionCells";
import NetworkCell from "../components/NetworkCell/NetworkCell";
import { handleSplitOrganizationName } from "../functions/GeneralFunctions";

interface IRegionTableData {
  responseInstances: any;
  setReload: Dispatch<SetStateAction<boolean>>;
}

export function RegionTableData({
  responseInstances,
  setReload,
}: IRegionTableData) {
  const { pagesState } = useMain();

  const data: any = useMemo(
    () =>
      responseInstances?.map((instance: any) => {
        return {
          key: instance?.name,
          name: instance,
          organization: handleSplitOrganizationName(
            pagesState?.organization?.organizationName!,
          ),
          architecture: instance?.cloudInstanceResource?.architecture,
          OSResources: {
            os: instance?.cloudInstanceResource?.operatingSystem,
            distro: instance?.cloudInstanceResource?.operatingSystemDistro,
          },
          kernel: instance?.cloudInstanceResource?.kernelVersion,
          k8s: instance?.cloudInstanceResource?.kubernetesVersion,
          usages: instance?.cloudInstanceResource,
          providerState: instance?.instanceState,
          robolaunchState: instance?.instanceCloudState,
          actions: instance,
        };
      }),
    [pagesState, responseInstances],
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
              subtitle={rowData?.name?.instanceType}
              titleURL={`/${handleSplitOrganizationName(
                pagesState?.organization?.organizationName!,
              )}/${pagesState.roboticsCloud?.name}/${rowData?.name?.name}`}
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
        key: "architecture",
        header: "architecture",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return (
            <BasicCell
              text={
                rowData?.architecture ? rowData?.architecture : "Pending..."
              }
            />
          );
        },
      },
      {
        key: "OSResources",
        header: "OS Resources",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return (
            <BasicCell
              text={
                rowData?.OSResources?.distro && rowData?.OSResources?.os
                  ? `${rowData?.OSResources?.distro} (${rowData?.OSResources?.os})`
                  : "Pending..."
              }
            />
          );
        },
      },
      {
        key: "kernel",
        header: "kernel",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return (
            <BasicCell
              text={rowData?.kernel ? rowData?.kernel : "Pending..."}
            />
          );
        },
      },
      {
        key: "k8s",
        header: "Kubernetes",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return (
            <BasicCell
              text={rowData?.k8s ? `Kubernetes ${rowData?.k8s}` : "Pending..."}
            />
          );
        },
      },
      {
        key: "robolaunchState",
        header: "robolaunch State",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return (
            <StateCell state={rowData?.robolaunchState} isRobolaunchState />
          );
        },
      },
      {
        key: "providerState",
        header: "Provider State",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <StateCell state={rowData?.providerState} />;
        },
      },
      {
        key: "usages",
        header: "Resources & Usages",
        sortable: false,
        filter: false,
        align: "center",
        body: (rowData: any) => {
          return (
            <div className="flex gap-4">
              {rowData?.usages?.cpuUsage ? (
                <Fragment>
                  <CirclePercentageBar
                    percentage={rowData?.usages?.cpuUsage}
                    title={`CPU (${rowData?.usages?.cpuTotal} Core)`}
                    size={46}
                  />
                  <CirclePercentageBar
                    percentage={rowData?.usages?.memoryUsage}
                    title={`Memory (${rowData?.usages?.memoryTotal} GB)`}
                    size={46}
                  />
                  <CirclePercentageBar
                    percentage={Math.floor(
                      (rowData?.usages?.storageUsage /
                        rowData?.usages?.storageTotal) *
                        100,
                    )}
                    title={`Storage (${rowData?.usages?.storageTotal} GB)`}
                    size={46}
                  />
                  <NetworkCell
                    data={[
                      Number(
                        (
                          Number(
                            rowData.usages?.networkUsage?.[0]?.trafficIn?.split(
                              "Kbps",
                            )?.[0],
                          ) / 1024
                        )?.toFixed(2),
                      ) || 0,
                      Number(
                        (
                          Number(
                            rowData.usages?.networkUsage?.[0]?.trafficOut?.split(
                              "Kbps",
                            )?.[0],
                          ) / 1024
                        )?.toFixed(2),
                      ) || 0,
                    ]}
                    networkInterface={
                      rowData.usages?.networkUsage?.[0]?.interfaceName
                    }
                  />
                </Fragment>
              ) : (
                <BasicCell text={"Pending..."} />
              )}
            </div>
          );
        },
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        body: (rowData: any) => {
          return (
            <InstanceActionCells
              data={{
                name: rowData?.name?.name,
                state: rowData?.providerState,
                organizationId: pagesState?.organization?.organizationId,
                roboticsCloudName: pagesState.roboticsCloud?.name,
                instanceId: rowData?.name?.instanceId,
                region: rowData?.name?.region,
              }}
              reload={() => setReload((prevState: boolean) => !prevState)}
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pagesState, responseInstances],
  );
  return { data, columns };
}

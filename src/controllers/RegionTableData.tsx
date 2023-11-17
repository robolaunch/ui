import { useEffect, useMemo, useState } from "react";
import useMain from "../hooks/useMain";
import InfoCell from "../components/TableInformationCells/InfoCell";
import BasicCell from "../components/TableInformationCells/BasicCell";
import StateCell from "../components/TableInformationCells/StateCell";
import InstanceActionCells from "../components/TableActionCells/InstanceActionCells";
import { handleSplitOrganizationName } from "../functions/GeneralFunctions";
import useFunctions from "../hooks/useFunctions";
import { useParams } from "react-router-dom";
import { IInstance } from "../interfaces/instanceInferfaces";
import {
  IInstanceDashboardData,
  IInstanceDashboardUsages,
} from "../interfaces/tableInterface";
import InstanceUsagesCell from "../components/InstanceUsagesCell/InstanceUsagesCell";

export function RegionTableData() {
  const [responseInstances, setResponseInstances] = useState<
    IInstance[] | undefined
  >(undefined);
  const { getOrganization, getRoboticsCloud, getInstances } = useFunctions();
  const { pagesState, selectedState } = useMain();
  const [reload, setReload] = useState<boolean>(false);
  const url = useParams();

  function handleReload() {
    setResponseInstances(undefined);
    setReload(!reload);
  }

  useEffect(() => {
    if (
      pagesState?.organization?.organizationName !==
      `org_${url?.organizationName}`
    ) {
      handleGetOrganization();
    } else if (pagesState?.roboticsCloud?.name !== url?.roboticsCloudName) {
      handleGetRegion();
    } else {
      handleGetInstances();
    }

    const timer = setInterval(() => {
      selectedState?.organization &&
        selectedState?.roboticsCloud &&
        pagesState?.roboticsCloud &&
        handleGetInstances();
    }, 20000);

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesState, url, reload]);

  useEffect(() => {
    setResponseInstances(undefined);
  }, [url]);

  function handleGetOrganization() {
    getOrganization(
      {
        organizationName: url?.organizationName!,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseInstances,
        setPages: true,
      },
    );
  }

  function handleGetRegion() {
    getRoboticsCloud(
      {
        organizationId: pagesState?.organization?.organizationId!,
        roboticsCloudName: url?.roboticsCloudName!,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseInstances,
        setPages: true,
      },
    );
  }

  function handleGetInstances() {
    getInstances(
      {
        organizationId: pagesState?.organization?.organizationId!,
        roboticsCloudName: url?.roboticsCloudName!,
        region: pagesState?.roboticsCloud?.region!,
        details: true,
      },
      {
        setResponse: setResponseInstances,
        ifErrorNavigateTo404: !responseInstances,
      },
    );
  }

  const data: IInstanceDashboardData[] = useMemo(
    () =>
      responseInstances?.map((instance: IInstance) => {
        return {
          key: instance?.name,
          name: {
            title: instance?.name,
            subtitle: instance?.instanceType,
            titleURL: `/${handleSplitOrganizationName(
              pagesState?.organization?.organizationName!,
            )}/${pagesState.roboticsCloud?.name}/${instance?.name}`,
          },
          organization: handleSplitOrganizationName(
            pagesState?.organization?.organizationName!,
          ),
          architecture: instance?.cloudInstanceResource?.architecture,
          OSResources: `${instance?.cloudInstanceResource?.operatingSystemDistro}
          (${instance?.cloudInstanceResource?.operatingSystem})
          `,
          kernel: instance?.cloudInstanceResource?.kernelVersion,
          k8s: instance?.cloudInstanceResource?.kubernetesVersion,
          providerState: instance?.instanceState,
          robolaunchState: instance?.instanceCloudState,
          usages: {
            cpu: {
              title: `CPU (${instance?.cloudInstanceResource?.cpuTotal} Core)`,
              core: instance?.cloudInstanceResource?.cpuTotal,
              percentage: instance?.cloudInstanceResource?.cpuUsage,
            },
            gpu: {
              title: `GPU (${instance?.cloudInstanceResource?.cpuTotal} Core)`,
              core: instance?.cloudInstanceResource?.cpuTotal,
              percentage: instance?.cloudInstanceResource?.gpuUsage,
            },
            memory: {
              title: `Memory (${instance?.cloudInstanceResource?.memoryTotal} GB)`,
              size: instance?.cloudInstanceResource?.memoryTotal,
              percentage: instance?.cloudInstanceResource?.memoryUsage,
            },
            storage: {
              title: `Storage (${instance?.cloudInstanceResource?.storageTotal} GB)`,
              size: instance?.cloudInstanceResource?.storageTotal,
              percentage: instance?.cloudInstanceResource?.storageUsage,
            },
            network: {
              title:
                instance?.cloudInstanceResource?.networkUsage?.[0]
                  ?.interfaceName,
              in: Number(
                (
                  Number(
                    instance?.cloudInstanceResource?.networkUsage?.[0]?.trafficIn?.split(
                      "Kbps",
                    )?.[0],
                  ) / 1024
                )?.toFixed(3),
              ),
              out: Number(
                (
                  Number(
                    instance?.cloudInstanceResource?.networkUsage?.[0]?.trafficOut?.split(
                      "Kbps",
                    )?.[0],
                  ) / 1024
                )?.toFixed(3),
              ),
            },
          },
          actions: instance,
        };
      }) || [],
    [pagesState, responseInstances],
  );

  const columns: {
    key: string;
    header: string;
    sortable?: boolean;
    filter?: boolean;
    align: "left" | "right" | "center";
    body?: (rowData: any) => JSX.Element;
  }[] = useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: {
          name: {
            title: string;
            subtitle: string;
            titleURL: string;
          };
        }) => {
          return (
            <InfoCell
              title={rowData?.name?.title}
              subtitle={rowData?.name?.subtitle}
              titleURL={rowData?.name?.titleURL}
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
        body: (rowData: { organization: string }) => {
          return <BasicCell text={rowData?.organization || "Pending..."} />;
        },
      },
      {
        key: "architecture",
        header: "architecture",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: { architecture: string }) => {
          return <BasicCell text={rowData?.architecture || "Pending..."} />;
        },
      },
      {
        key: "OSResources",
        header: "OS Resources",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: { OSResources: string }) => {
          console.log("x", rowData?.OSResources);
          return <BasicCell text={rowData?.OSResources || "Pending..."} />;
        },
      },
      {
        key: "kernel",
        header: "kernel",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: { kernel: string }) => {
          return <BasicCell text={rowData?.kernel || "Pending..."} />;
        },
      },
      {
        key: "k8s",
        header: "Kubernetes",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: { k8s: string }) => {
          return <BasicCell text={rowData?.k8s || "Pending..."} />;
        },
      },
      {
        key: "robolaunchState",
        header: "robolaunch State",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: { robolaunchState: string }) => {
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
        body: (rowData: { providerState: string }) => {
          return <StateCell state={rowData?.providerState || "Pending"} />;
        },
      },
      {
        key: "usages",
        header: "Resources & Usages",
        sortable: false,
        filter: false,
        align: "center",
        body: (rowData: { usages: IInstanceDashboardUsages }) => {
          return <InstanceUsagesCell data={rowData?.usages} />;
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
                name: rowData?.actions?.name,
                state: rowData?.providerState,
                organizationId: pagesState?.organization?.organizationId,
                roboticsCloudName: pagesState.roboticsCloud?.name,
                instanceId: rowData?.name?.instanceId,
                region: rowData?.actions?.region,
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
  return {
    data,
    columns,
    responseInstances,
    handleReload,
  };
}

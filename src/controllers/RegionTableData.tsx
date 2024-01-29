import { IInstanceDashboardUsages } from "../interfaces/tableInterface";
import InstanceActionCells from "../components/TableActionCells/InstanceActionCells";
import InstanceUsagesCell from "../components/InstanceUsagesCell/InstanceUsagesCell";
import { handleSplitOrganizationName } from "../functions/GeneralFunctions";
import BasicCell from "../components/TableInformationCells/BasicCell";
import StateCell from "../components/TableInformationCells/StateCell";
import InfoCell from "../components/TableInformationCells/InfoCell";
import { useEffect, useMemo, useState } from "react";
import useFunctions from "../hooks/useFunctions";
import { useParams } from "react-router-dom";
import useMain from "../hooks/useMain";
import { ICloudInstance } from "../interfaces/cloudInstance.interface";

export function RegionTableData() {
  const [responseInstances, setResponseInstances] = useState<
    ICloudInstance[] | undefined
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
    if (pagesState?.organization?.name !== `org_${url?.organizationName}`) {
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
        organizationId: pagesState?.organization?.id!,
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
        organizationId: pagesState?.organization?.id!,
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

  const data = useMemo(
    () =>
      responseInstances?.map((instance) => {
        return {
          key: instance?.name,
          name: {
            title: instance?.name,
            subtitle: instance?.providerModel,
            titleURL: `/${handleSplitOrganizationName(
              pagesState?.organization?.name!,
            )}/${pagesState.roboticsCloud?.name}/${instance?.name}`,
          },
          organization: handleSplitOrganizationName(
            pagesState?.organization?.name!,
          ),
          architecture: instance?.resources?.software?.architecture,
          os:
            instance?.resources?.software?.osDistro &&
            `${instance?.resources?.software?.osDistro}
          (${instance?.resources?.software?.os})
          `,
          kernel: instance?.resources?.software?.kernelVersion,
          k8s: instance?.resources?.software?.kubernetesVersion,
          providerState: instance?.providerState,
          robolaunchState: instance?.rlState,
          usages: {
            cpu: {
              title: `CPU (${instance?.resources?.hardware?.cpu?.totalCore} Core)`,
              core: instance?.resources?.hardware?.cpu?.totalCore,
              percentage: instance?.resources?.hardware?.cpu?.usagePercent,
            },
            gpu: {
              title: `GPU (${instance?.resources?.hardware?.gpu?.hardware?.[0]?.memory?.totalGB} GB)`,
              core: instance?.resources?.hardware?.gpu?.hardware?.[0]?.memory
                ?.totalGB,
              percentage:
                instance?.resources?.hardware?.gpu?.hardware?.[0]?.memory
                  ?.percent,
            },
            memory: {
              title: `Memory (${instance?.resources?.hardware?.memory?.totalGB} GB)`,
              size: instance?.resources?.hardware?.memory?.totalGB,
              percentage: instance?.resources?.hardware?.memory?.usagePercent,
            },
            storage: {
              title: `Storage (${instance?.resources?.hardware?.storage?.totalGB} GB)`,
              size: instance?.resources?.hardware?.storage?.totalGB,
              percentage: instance?.resources?.hardware?.storage?.usagePercent,
            },
            network: {
              title: instance?.resources?.hardware?.network?.[0]?.name,
              in: Number(
                Number(
                  instance?.resources?.hardware?.network?.[0]?.in / 1024,
                )?.toFixed(3),
              ),
              out: Number(
                Number(
                  instance?.resources?.hardware?.network?.[0]?.out / 1024,
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
        body: ({ organization }: { organization: string }) => {
          return <BasicCell text={organization || "Pending..."} />;
        },
      },
      {
        key: "architecture",
        header: "architecture",
        sortable: false,
        filter: false,
        align: "left",
        body: ({ architecture }: { architecture: string }) => {
          return <BasicCell text={architecture || "Pending..."} />;
        },
      },
      {
        key: "os",
        header: "OS Resources",
        sortable: false,
        filter: false,
        align: "left",
        body: ({ os }: { os: string }) => {
          return <BasicCell text={os || "Pending..."} />;
        },
      },
      {
        key: "kernel",
        header: "kernel",
        sortable: false,
        filter: false,
        align: "left",
        body: ({ kernel }: { kernel: string }) => {
          return <BasicCell text={kernel || "Pending..."} />;
        },
      },
      {
        key: "k8s",
        header: "Kubernetes",
        sortable: false,
        filter: false,
        align: "left",
        body: ({ k8s }: { k8s: string }) => {
          return <BasicCell text={k8s || "Pending..."} />;
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
          console.log("rowData", rowData);

          return (
            <InstanceActionCells
              data={{
                name: rowData?.actions?.name,
                state: rowData?.providerState,
                robolaunchState: rowData?.robolaunchState,
                organizationId: pagesState?.organization?.id,
                roboticsCloudName: pagesState.roboticsCloud?.name,
                instanceId: rowData?.actions?.instanceId,
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

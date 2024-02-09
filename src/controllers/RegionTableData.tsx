import TemporaryActionCells from "../components/TableActionCells/TemporaryActionCells";
import InstanceUsagesCell from "../components/InstanceUsagesCell/InstanceUsagesCell";
import CIActionCells from "../components/TableActionCells/CIActionCells";
import { ICloudInstance } from "../interfaces/global/cloudInstance.interface";
import BasicCell from "../components/TableInformationCells/BasicCell";
import StateCell from "../components/TableInformationCells/StateCell";
import InfoCell from "../components/TableInformationCells/InfoCell";
import { Fragment, useEffect, useMemo, useState } from "react";
import useFunctions from "../hooks/useFunctions";
import { useParams } from "react-router-dom";
import useMain from "../hooks/useMain";
import { orgSplitter } from "../functions/general.function";

export function RegionTableData() {
  const [instances, setInstances] = useState<ICloudInstance[] | null>(null);
  const { getOrganizationsFC, getRegionsFC, getCloudInstancesFC } =
    useFunctions();
  const { pagesState } = useMain();
  const [reload, setReload] = useState<boolean>(false);
  const url = useParams();

  function handleReload() {
    setInstances(null);
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
      pagesState?.organization &&
        pagesState?.roboticsCloud &&
        handleGetInstances();
    }, 20000);

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesState, url, reload]);

  useEffect(() => {
    setInstances(null);
  }, [url]);

  function handleGetOrganization() {
    getOrganizationsFC(true, true, url?.organizationName as string);
  }

  function handleGetRegion() {
    getRegionsFC(true, true, url?.roboticsCloudName as string);
  }

  async function handleGetInstances() {
    setInstances(await getCloudInstancesFC(true, !instances));
  }

  const rows = useMemo(
    () =>
      instances?.map((instance) => {
        return {
          name: {
            instance: instance?.name,
            model: instance?.providerModel,
            url: `/${orgSplitter(pagesState?.organization?.name!)}/${pagesState?.roboticsCloud?.name}/${instance?.name}`,
          },
          organization: orgSplitter(pagesState?.organization?.name!),
          architecture: instance?.resources?.software?.architecture,
          os:
            instance?.resources?.software?.osDistro &&
            `${instance?.resources?.software?.osDistro}
          (${instance?.resources?.software?.os})
          `,
          kernel: instance?.resources?.software?.kernelVersion,
          k8s: instance?.resources?.software?.kubernetesVersion,
          providerState: instance?.providerState,
          rlState: instance?.rlState,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pagesState, instances, url],
  );

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        align: "left",
        body: ({
          name: { instance, model, url },
        }: {
          name: {
            instance: string;
            model: string;
            url: string;
          };
        }) => {
          return <InfoCell title={instance} subtitle={model} titleURL={url} />;
        },
      },
      {
        key: "organization",
        header: "Organization",
        align: "left",
        body: ({ organization }: { organization: string }) => {
          return <BasicCell text={organization} />;
        },
      },
      {
        key: "architecture",
        header: "architecture",
        align: "left",
        body: ({ architecture }: { architecture: string }) => {
          return <BasicCell text={architecture} />;
        },
      },
      {
        key: "os",
        header: "OS Resources",
        align: "left",
        body: ({ os }: { os: string }) => {
          return <BasicCell text={os} />;
        },
      },
      {
        key: "kernel",
        header: "kernel",
        align: "left",
        body: ({ kernel }: { kernel: string }) => {
          return <BasicCell text={kernel} />;
        },
      },
      {
        key: "k8s",
        header: "Kubernetes",
        align: "left",
        body: ({ k8s }: { k8s: string }) => {
          return <BasicCell text={k8s} />;
        },
      },
      {
        key: "providerState",
        header: "Provider State",
        align: "left",
        body: ({ providerState }: { providerState: string }) => {
          return <StateCell state={providerState} />;
        },
      },
      {
        key: "rlState",
        header: "robolaunch State",
        align: "left",
        body: ({ rlState }: { rlState: string }) => {
          return <StateCell state={rlState} isRobolaunchState />;
        },
      },
      {
        key: "usages",
        header: "Resources & Usages",
        align: "center",
        body: ({ usages }: { usages: any }) => {
          return <InstanceUsagesCell data={usages} />;
        },
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        body: ({ actions: instance }: { actions: ICloudInstance }) => {
          return (
            <Fragment>
              {instance?.providerModel === "on-premise" ? (
                <TemporaryActionCells
                  showStartStopButton
                  showDeleteButton
                  disabledStartStopButton
                  disabledDeleteButton
                />
              ) : (
                <CIActionCells instance={instance} reload={handleReload} />
              )}
            </Fragment>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pagesState, instances, url],
  );
  return {
    rows,
    columns,
    instances,
    handleReload,
  };
}

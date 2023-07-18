import React, {
  Fragment,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import InstanceActionCells from "../../../components/ActionCells/InstanceActionCells";
import GeneralTable from "../../../components/Table/GeneralTable";
import BasicCell from "../../../components/Cells/BasicCell";
import StateCell from "../../../components/Cells/StateCell";
import InfoCell from "../../../components/Cells/InfoCell";
import { useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";
import useSidebar from "../../../hooks/useSidebar";
import useFunctions from "../../../hooks/useFunctions";
import CirclePercentageBar from "../../../components/CirclePercentageBar/CirclePercentageBar";
import DashboardLayout from "../../../layouts/DashboardLayout";
import usePages from "../../../hooks/usePages";
import RegionsWidget from "../../../components/RegionsWidget/RegionsWidget";
import CountWidget from "../../../components/CountWidget/CountWidget";
export default function RoboticsCloudDashboardPage(): ReactElement {
  const [responseInstances, setResponseInstances] = useState<any[] | undefined>(
    undefined
  );
  const { getOrganization, getRoboticsCloud, getInstances } = useFunctions();
  const { setSidebarState, selectedState } = useSidebar();
  const [reload, setReload] = useState<boolean>(false);
  const url = useParams();
  const { pagesState } = usePages();

  useEffect(() => {
    if (
      pagesState?.organization?.organizationName !==
      `org_${url?.organizationName}`
    ) {
      handleGetOrganization();
    } else if (pagesState?.roboticsCloud?.name !== url?.roboticsCloudName) {
      handleGetRoboticsCloud();
    } else {
      handleGetInstances();
    }

    const timer =
      selectedState?.organization &&
      selectedState?.roboticsCloud &&
      setInterval(() => {
        pagesState?.roboticsCloud && handleGetInstances();
      }, 20000);

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesState, url, reload]);

  useEffect(() => {
    setResponseInstances(undefined);
  }, [url]);

  const data: any = useMemo(
    () =>
      responseInstances?.map((instance: any) => {
        return {
          key: instance?.name,
          name: instance,
          organization: url?.organizationName,
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
    [url, responseInstances]
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
              titleURL={`/${url?.organizationName}/${url?.roboticsCloudName}/${rowData?.name?.name}`}
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
          console.log(rowData?.OSResources);
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
        header: "Robolaunch State",
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
        align: "left",
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
                    percentage={Number(
                      (
                        (rowData?.usages?.storageTotal / 100) *
                        (rowData?.usages?.storageTotal -
                          rowData?.usages?.storageUsage)
                      ).toFixed()
                    )}
                    title={`Storage (${rowData?.usages?.storageTotal} GB)`}
                    size={46}
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
                organizationId: selectedState?.organization?.organizationId,
                roboticsCloudName: url?.roboticsCloudName,
                instanceId: rowData?.name?.instanceId,
                region: rowData?.name?.region,
              }}
              reload={() => setReload(!reload)}
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedState, reload, url, responseInstances]
  );

  function handleGetOrganization() {
    getOrganization(
      {
        organizationName: url?.organizationName as string,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseInstances,
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
        ifErrorNavigateTo404: !responseInstances,
        setPages: true,
      }
    );
  }

  function handleGetInstances() {
    getInstances(
      {
        organizationId: pagesState?.organization?.organizationId,
        roboticsCloudName: url?.roboticsCloudName as string,
        region: pagesState?.roboticsCloud?.region,
        details: true,
      },
      {
        setResponse: setResponseInstances,
        ifErrorNavigateTo404: !responseInstances,
      }
    );
  }

  return (
    <DashboardLayout
      widget1={
        <InformationWidget
          title={url?.roboticsCloudName || ""}
          subtitle="This page is the platform's Cloud Instance page. Here, you can manage, delete, or view the details of your existing cloud instances. If you need to create a new cloud instance, you can do so by clicking the button below."
          component={
            <Button
              text="Create a new Cloud Instance"
              className="!w-52 !h-10 !text-xs"
              onClick={() => {
                setSidebarState((prevState: any): any => ({
                  ...prevState,
                  isOpen: true,
                  isCreateMode: false,
                  page: "instance",
                  instanceTab: "Cloud Instances",
                }));
              }}
            />
          }
        />
      }
      widget2={
        <RegionsWidget
          title="Cloud Instance"
          responseData={
            responseInstances?.map((item: any) => item.region) || []
          }
        />
      }
      widget3={
        <CountWidget
          data={
            responseInstances
              ? [
                  {
                    label: "Preparing",
                    value:
                      responseInstances?.filter(
                        (item: any) =>
                          item?.instanceCloudState !== "ConnectionHub_Ready"
                      ).length || 0,
                    color: "orange",
                  },
                  {
                    label: "Ready",
                    value:
                      responseInstances?.filter(
                        (item: any) =>
                          item?.instanceCloudState === "ConnectionHub_Ready"
                      ).length || 0,
                    color: "#cb77ff",
                  },
                  {
                    label: "Error",
                    value:
                      responseInstances?.filter(
                        (item: any) =>
                          item?.instanceCloudState === "ConnectionHub_Error"
                      ).length || 0,
                    color: "red",
                  },
                ]
              : []
          }
        />
      }
      table={
        <GeneralTable
          type="instance"
          title="Cloud Instances"
          data={data}
          columns={columns}
          loading={Array.isArray(responseInstances) ? false : true}
          handleReload={() => {
            setResponseInstances(undefined);
            setReload(!reload);
          }}
        />
      }
    />
  );
}

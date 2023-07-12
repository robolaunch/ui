import React, {
  Fragment,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import InstanceActionCells from "../../../components/ActionCells/InstanceActionCells";
import CountWidget from "../../../components/CountWidget/CountWidget";
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
export default function RoboticsCloudDashboardPage(): ReactElement {
  const [responseCurrentOrganization, setResponseCurrentOrganization] =
    useState<any>(undefined);
  const [responseCurrentRoboticsCloud, setResponseCurrentRoboticsCloud] =
    useState<any>(undefined);
  const [responseInstances, setResponseInstances] = useState<any[] | undefined>(
    undefined
  );
  const { getOrganization, getRoboticsCloud, getInstances } = useFunctions();
  const { setSidebarState, selectedState } = useSidebar();
  const [reload, setReload] = useState<boolean>(false);
  const url = useParams();

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
    } else {
      getInstances(
        {
          organizationId: responseCurrentOrganization?.organizationId,
          roboticsCloudName: url?.roboticsCloudName as string,
          region: responseCurrentRoboticsCloud?.region,
        },
        {
          setResponse: setResponseInstances,
          ifErrorNavigateTo404: !responseInstances,
        }
      );
    }

    const timer =
      selectedState?.organization &&
      selectedState?.roboticsCloud &&
      setInterval(() => {
        getInstances(
          {
            organizationId: responseCurrentOrganization?.organizationId,
            roboticsCloudName: url?.roboticsCloudName as string,
            region: responseCurrentRoboticsCloud?.region,
          },
          {
            setResponse: setResponseInstances,
            ifErrorNavigateTo404: !responseInstances,
          }
        );
      }, 20000);

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseCurrentOrganization, responseCurrentRoboticsCloud, url, reload]);

  const data: any = useMemo(
    () =>
      responseInstances?.map((instance: any) => {
        return {
          key: instance?.name,
          name: instance,
          organization: url?.organizationName,
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
        sortable: true,
        filter: true,
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.organization} />;
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
                </Fragment>
              ) : (
                <BasicCell text={"Pending..."} />
              )}
            </div>
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

  useEffect(() => {
    console.log(responseInstances);
  }, [responseInstances]);

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
      widget2={<></>}
      widget3={
        <CountWidget
          data={{
            series: [
              responseInstances?.filter(
                (instance: any) => instance?.instanceState === "pending"
              )?.length || 0,
              responseInstances?.filter(
                (instance: any) => instance?.instanceState === "running"
              )?.length || 0,
              responseInstances?.filter(
                (instance: any) => instance?.instanceState === "stopping"
              )?.length || 0,
              responseInstances?.filter(
                (instance: any) => instance?.instanceState === "stopped"
              )?.length || 0,
            ],
            categories: [["Pending"], ["Running"], ["Stopping"], ["Stopped"]],
          }}
          title="Robotics Cloud"
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

import React, { ReactElement, useEffect, useMemo, useState } from "react";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import UtilizationWidget from "../../../components/UtilizationWidget/UtilizationWidget";
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
        align: "lehrefft",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.organization} />;
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
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 grid-cols-12">
        <div className="col-span-12 lg:col-span-4">
          <InformationWidget
            title={url?.roboticsCloudName || ""}
            subtitle="From this page, you can manage the instances of your robotics cloud."
            actiontitle="If you need to create a new instance, you can do it from here."
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
        </div>
        <div className="col-span-12 lg:col-span-5">
          <UtilizationWidget title="Robotics Cloud" />
        </div>
        <div className="col-span-12 lg:col-span-3">
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
        </div>
      </div>
      <div className="grid grid-cols-1">
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
      </div>
    </div>
  );
}

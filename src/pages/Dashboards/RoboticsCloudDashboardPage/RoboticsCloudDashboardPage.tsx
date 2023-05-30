import React, { ReactElement, useEffect, useMemo, useState } from "react";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import UtilizationWidget from "../../../components/UtilizationWidget/UtilizationWidget";
import InstanceActionCells from "../../../components/ActionCells/InstanceActionCells";
import { getOrganizations } from "../../../resources/OrganizationSlice";
import CountWidget from "../../../components/CountWidget/CountWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import { getInstances } from "../../../resources/InstanceSlice";
import BasicCell from "../../../components/Cells/BasicCell";
import StateCell from "../../../components/Cells/StateCell";
import InfoCell from "../../../components/Cells/InfoCell";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { useAppDispatch } from "../../../hooks/redux";
import useSidebar from "../../../hooks/useSidebar";
import { toast } from "sonner";

export default function RoboticsCloudDashboardPage(): ReactElement {
  const [reload, setReload] = useState<boolean>(false);
  const { setSidebarState, selectedState } = useSidebar();
  const [currentOrganization, setCurrentOrganization] = useState<any>(
    selectedState?.organization || undefined
  );
  const [responseInstances, setResponseInstances] = useState<any[] | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();
  const url = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentOrganization) {
      handleGetOrganizations();
    } else {
      handleGetInstances();
    }

    const timer =
      currentOrganization &&
      setInterval(() => {
        handleGetInstances();
      }, 10000);

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrganization, url, reload]);

  function handleGetOrganizations() {
    dispatch(getOrganizations()).then((organizationsResponse: any) => {
      if (
        organizationsResponse?.payload?.data?.find(
          (organization: any) =>
            organization?.organizationName === `org_${url?.organizationName}`
        )
      ) {
        setCurrentOrganization(
          organizationsResponse?.payload?.data?.find(
            (organization: any) =>
              organization?.organizationName === `org_${url?.organizationName}`
          )
        );
      } else {
        toast.error(
          "The current page does not exist or is not available to you."
        );
        navigate("/404");
      }
    });
  }

  function handleGetInstances() {
    dispatch(
      getInstances({
        organizationId: currentOrganization?.organizationId,
        roboticsCloudName: url?.roboticsCloudName,
      })
    ).then((responseInstances: any) => {
      if (
        Array.isArray(responseInstances?.payload?.data) &&
        Array.isArray(responseInstances?.payload?.data[0]?.roboticsClouds) &&
        responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
      ) {
        setResponseInstances(
          responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
        );
      } else {
        toast.error(
          "The current page does not exist or is not available to you."
        );
        navigate("/404");
      }
    });
  }

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
                state: rowData?.providerState,
                organizationId: currentOrganization?.organizationId,
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
    [currentOrganization, reload, url]
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

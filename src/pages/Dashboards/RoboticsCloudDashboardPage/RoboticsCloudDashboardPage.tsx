import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { GeneralTable } from "../../../components/Table/GeneralTable";
import { useAppDispatch } from "../../../hooks/redux";
import { InfoCell } from "../../../components/Cells/InfoCell";
import UtilizationWidget from "../../../components/UtilizationWidget/UtilizationWidget";
import CountWidget from "../../../components/CountWidget/CountWidget";
import Button from "../../../components/Button/Button";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import { useParams } from "react-router-dom";
import { getOrganizations } from "../../../resources/OrganizationSlice";
import { getInstances } from "../../../resources/InstanceSlice";
import BasicCell from "../../../components/Cells/BasicCell";
import StateCell from "../../../components/Cells/StateCell";
import InstanceActionCells from "../../../components/ActionCells/InstanceActionCells";
import useSidebar from "../../../hooks/useSidebar";

export default function RoboticsCloudDashboardPage(): ReactElement {
  const [reload, setReload] = useState(false);
  const { selectedState } = useSidebar();
  const [currentOrganization, setCurrentOrganization] = useState<any>(
    selectedState?.organization || undefined
  );
  const [responseInstances, setResponseInstances] = useState<any[] | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();
  const url = useParams();

  useEffect(() => {
    if (!currentOrganization) {
      handleGetOrganization();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    if (currentOrganization) {
      handleGetInstances();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrganization, dispatch, reload, url]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleGetInstances();
    }, 10000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrganization]);

  function handleGetOrganization() {
    dispatch(getOrganizations()).then((organizationsResponse: any) => {
      setCurrentOrganization(
        organizationsResponse?.payload?.data?.find(
          (organization: any) =>
            organization?.organizationName === `org_${url?.organizationName}`
        )
      );
    });
  }

  function handleGetInstances() {
    dispatch(
      getInstances({
        organizationId: currentOrganization?.organizationId,
        roboticsCloudName: url?.roboticsCloudName,
      })
    ).then((responseInstances: any) => {
      setResponseInstances(
        responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
      );
    });
  }

  const data: any = useMemo(
    () =>
      responseInstances
        ?.filter((instance: any) => instance?.instanceState !== "terminated")
        ?.map((instance: any) => {
          return {
            key: instance?.name,
            name: instance,
            organization: url?.organizationName,
            providerState: instance?.instanceState,
            robolaunchState: instance?.instanceCloudState,
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
              }}
              reload={() => setReload(!reload)}
            />
          );
        },
      },
    ],
    [currentOrganization, reload, url]
  );

  useEffect(() => {
    console.log(responseInstances);
  }, [responseInstances]);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 grid-cols-12">
        <div className="col-span-4">
          <InformationWidget
            title={url?.roboticsCloudName || ""}
            subtitle="From this page, you can view, control or get information about all
            the details of the teams in your organization."
            actiontitle="If you need to create a new team or check the users in the team you
            can proceed here."
            component={
              <Button text="Manage Fleets" className="!w-28 !h-10 !text-xs" />
            }
          />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <UtilizationWidget title="Robotics Cloud" />
        </div>
        <div className="col-span-12 lg:col-span-3">
          <CountWidget
            data={{
              series: [5, 2, 4, responseInstances?.length || 0],
              categories: [
                ["Pending"],
                ["Running"],
                ["Stopped"],
                ["Terminated"],
              ],
            }}
            title="Robotics Cloud"
          />
        </div>
      </div>
      <div className="grid grid-cols-1">
        <GeneralTable
          type="instance"
          title="Instances"
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

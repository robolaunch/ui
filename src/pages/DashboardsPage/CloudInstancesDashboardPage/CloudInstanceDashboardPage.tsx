import React, { ReactElement, useEffect, useMemo, useState } from "react";
import UtilizationWidget from "../../../components/UtilizationWidget/UtilizationWidget";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import FleetActionCells from "../../../components/ActionCells/FleetActionCells";
import CountWidget from "../../../components/CountWidget/CountWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import BasicCell from "../../../components/Cells/BasicCell";
import StateCell from "../../../components/Cells/StateCell";
import { useNavigate, useParams } from "react-router-dom";
import InfoCell from "../../../components/Cells/InfoCell";
import Button from "../../../components/Button/Button";
import { useAppDispatch } from "../../../hooks/redux";
import useSidebar from "../../../hooks/useSidebar";
import {
  handleSetterCurrentOrganization,
  handleSetterCurrentInstances,
  handleSetterResponseFleets,
} from "../../../helpers/dashboardDispatcherFunctions";

export default function CloudInstanceDashboardPage(): ReactElement {
  const { setSidebarState, selectedState } = useSidebar();
  const [currentOrganization, setCurrentOrganization] = useState<any>(
    selectedState?.organization || undefined
  );
  const [currentInstance, setCurrentInstance] = useState<any>(
    selectedState?.instance || undefined
  );
  const [responseFleets, setResponseFleets] = useState<any>(
    selectedState?.fleet || undefined
  );
  const [reload, setReload] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const url = useParams();

  useEffect(() => {
    if (!currentOrganization) {
      handleSetterCurrentOrganization({
        dispatch,
        url,
        setCurrentOrganization,
        navigate,
      });
    } else if (currentOrganization && !currentInstance) {
      handleSetterCurrentInstances({
        dispatch,
        url,
        navigate,
        currentOrganization,
        setCurrentInstance,
      });
    } else if (currentOrganization && currentInstance) {
      handleSetterResponseFleets({
        dispatch,
        url,
        navigate,
        currentOrganization,
        currentInstance,
        setResponseFleets,
      });
    }

    const timer =
      currentOrganization &&
      currentInstance &&
      setInterval(() => {
        handleSetterResponseFleets({
          dispatch,
          url,
          navigate,
          currentOrganization,
          currentInstance,
          setResponseFleets,
        });
      }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, [url, reload, currentOrganization, currentInstance, dispatch, navigate]);

  useEffect(() => {
    setResponseFleets(undefined);
  }, [url]);

  const data: any = useMemo(
    () =>
      responseFleets?.map((fleet: any) => {
        return {
          key: fleet?.name,
          name: fleet,
          organization: url?.organizationName,
          state: fleet?.fleetStatus,
          actions: fleet,
        };
      }),
    [url, responseFleets]
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
              subtitle={url?.organizationName as string}
              titleURL={`/${url?.organizationName}/${url?.roboticsCloudName}/${url?.instanceName}/${rowData?.name?.name}`}
            />
          );
        },
      },
      {
        key: "organization",
        header: "Organization",
        sortable: false,
        filter: false,
        align: "lehrefft",
        body: (rowData: any) => {
          return <BasicCell text={url?.organizationName as string} />;
        },
      },
      {
        key: "state",
        header: "Fleet State",
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
            <FleetActionCells
              reload={() => setReload(!reload)}
              data={{
                organization: currentOrganization,
                roboticsCloud: url?.roboticsCloudName,
                instance: currentInstance,
                fleet: rowData?.actions,
              }}
            />
          );
        },
      },
    ],
    [url, currentInstance, currentOrganization, reload]
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 grid-cols-12">
        <div className="col-span-4">
          <InformationWidget
            title={url?.instanceName || ""}
            subtitle="From this page, you can manage your fleets and see the status of
            your fleets."
            actiontitle="If you want to new fleet, you can use this button."
            component={
              <Button
                text="Create a new Fleet"
                className="!w-40 !h-10 !text-xs"
                onClick={() => {
                  setSidebarState((prevState: any): any => ({
                    ...prevState,
                    isOpen: true,
                    isCreateMode: false,
                    page: "fleet",
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
                responseFleets?.filter(
                  (fleet: any) =>
                    fleet?.fleetStatus === "CheckingRemoteNamespace"
                ).length || 0,
                responseFleets?.filter(
                  (fleet: any) => fleet?.fleetStatus === "CreatingNamespace"
                ).length || 0,
                responseFleets?.filter(
                  (fleet: any) =>
                    fleet?.fleetStatus === "CreatingDiscoveryServer"
                ).length || 0,
                responseFleets?.filter(
                  (fleet: any) => fleet?.fleetStatus === "Ready"
                ).length || 0,
              ],
              categories: [
                ["Checking"],
                ["Creating NS"],
                ["Creating DS"],
                ["Ready"],
              ],
            }}
            title="Robotics Cloud"
          />
        </div>
      </div>
      <div className="grid grid-cols-1">
        <GeneralTable
          type="fleet"
          title="Fleets"
          data={data}
          columns={columns}
          loading={Array.isArray(responseFleets) ? false : true}
          handleReload={() => setReload(!reload)}
        />
      </div>
    </div>
  );
}

import React, {
  Fragment,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import UtilizationWidget from "../../../components/UtilizationWidget/UtilizationWidget";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import CountWidget from "../../../components/CountWidget/CountWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import InfoCell from "../../../components/Cells/InfoCell";
import Button from "../../../components/Button/Button";
import { useAppDispatch } from "../../../hooks/redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { getFederatedRobots } from "../../../resources/RobotSlice";
import useSidebar from "../../../hooks/useSidebar";
import BasicCell from "../../../components/Cells/BasicCell";
import {
  handleSetterCurrentInstances,
  handleSetterCurrentOrganization,
  handleSetterResponseRobots,
} from "../../../helpers/dashboardDispatcherFunctions";

export default function FleetDashboardPage(): ReactElement {
  const [responseRobots, setResponseRobots] = useState<any>(null);
  const { selectedState, setSidebarState } = useSidebar();
  const [reload, setReload] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const url = useParams();

  const [currentOrganization, setCurrentOrganization] = useState<any>(
    selectedState?.organization || undefined
  );
  const [currentInstance, setCurrentInstance] = useState<any>(
    selectedState?.instance || undefined
  );

  useEffect(() => {
    if (!currentOrganization) {
      handleSetterCurrentOrganization({
        dispatch,
        url,
        navigate,
        setCurrentOrganization,
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
      handleSetterResponseRobots({
        dispatch,
        url,
        navigate,
        currentOrganization,
        currentInstance,
        setResponseRobots,
      });
    }

    const timer =
      currentOrganization &&
      currentInstance &&
      setInterval(() => {
        handleSetterResponseRobots({
          dispatch,
          url,
          navigate,
          currentOrganization,
          currentInstance,
          setResponseRobots,
        });
      }, 10000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, reload, currentOrganization, currentInstance]);

  const data: any = useMemo(
    () =>
      responseRobots?.map((robot: any) => {
        return {
          key: robot?.name,
          name: robot,
          organization: url?.organizationName,
          users: robot?.users,
          actions: robot,
        };
      }),
    [responseRobots, url?.organizationName]
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
              subtitle={rowData?.users?.length + " Members"}
              titleURL={`/${url?.organizationName}/${url?.roboticsCloudName}/${url?.instanceName}/${url?.fleetName}/${rowData?.name?.name}`}
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
        key: "actions",
        header: "Actions",
        align: "right",
        body: (rowData: any) => {
          return <></>;
        },
      },
    ],
    []
  );

  const handleReload = () => {
    setReload(!reload);
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 grid-cols-12">
        <div className="col-span-4">
          <InformationWidget
            title={url?.fleetName || ""}
            subtitle="From this page you can see details the robots"
            actiontitle="If you need to create a new robot, you
            can proceed here."
            component={
              <Button
                text="Create a new Robot"
                className="!w-44 !h-10 !text-xs"
                onClick={() => {
                  setSidebarState((prevState: any): any => ({
                    ...prevState,
                    isOpen: true,
                    isCreateMode: false,
                    page: "robots",
                  }));
                }}
              />
            }
          />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <UtilizationWidget title="Robot" />
        </div>
        <div className="col-span-12 lg:col-span-3">
          <CountWidget data={[5, 2, 4, 3]} title="Robot" />
        </div>
      </div>
      <div className="grid grid-cols-1">
        <GeneralTable
          type="robot"
          title="Robots"
          data={data}
          columns={columns}
          loading={Array.isArray(responseRobots) ? false : true}
          handleReload={() => handleReload()}
        />
      </div>
    </div>
  );
}

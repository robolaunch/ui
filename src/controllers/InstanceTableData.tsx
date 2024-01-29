import NamespaceActionCells from "../components/TableActionCells/NamespaceActionCells";
import FleetActionCells from "../components/TableActionCells/FleetActionCells";
import { handleSplitOrganizationName } from "../functions/GeneralFunctions";
import BasicCell from "../components/TableInformationCells/BasicCell";
import StateCell from "../components/TableInformationCells/StateCell";
import InfoCell from "../components/TableInformationCells/InfoCell";
import { Fragment, useEffect, useMemo, useState } from "react";
import useFunctions from "../hooks/useFunctions";
import { useParams } from "react-router-dom";
import useMain from "../hooks/useMain";
import { useAppSelector } from "../hooks/redux";
import { IFleet } from "../interfaces/fleet.interface";
import { INamespace } from "../interfaces/namespace.interface";

export function InstanceTableData() {
  const [responseFleets, setResponseFleets] = useState<
    IFleet[] | INamespace[] | undefined
  >(undefined);
  const [reload, setReload] = useState<boolean>(false);
  const { applicationMode } = useAppSelector((state) => state.user);

  const {
    getOrganization,
    getRoboticsCloud,
    getInstance,
    getFleets,
    getNamespaces,
  } = useFunctions();
  const url = useParams();
  const { pagesState, selectedState } = useMain();

  useEffect(() => {
    if (pagesState?.organization?.name !== `org_${url?.organizationName}`) {
      handleGetOrganization();
    } else if (pagesState?.roboticsCloud?.name !== url?.roboticsCloudName) {
      handleGetRoboticsCloud();
    } else if (pagesState?.instance?.name !== url?.instanceName) {
      handleGetInstance();
    } else {
      applicationMode ? handleGetNamespaces() : handleGetFleets();
    }

    const timer = setInterval(() => {
      pagesState?.instance && applicationMode
        ? handleGetNamespaces()
        : handleGetFleets();
    }, 10000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesState, url, reload]);

  useEffect(() => {
    setResponseFleets(undefined);
  }, [url]);

  function handleGetOrganization() {
    getOrganization(
      {
        organizationName: url?.organizationName as string,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseFleets,
        setPages: true,
      },
    );
  }

  function handleGetRoboticsCloud() {
    getRoboticsCloud(
      {
        organizationId: pagesState?.organization?.id!,
        roboticsCloudName: url?.roboticsCloudName as string,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseFleets,
        setPages: true,
      },
    );
  }

  function handleGetInstance() {
    getInstance(
      {
        organizationId: pagesState?.organization?.id!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceName: url?.instanceName as string,
        region: pagesState?.roboticsCloud?.region!,
        details: true,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseFleets,
        setPages: true,
      },
    );
  }

  function handleGetFleets() {
    getFleets(
      {
        organizationId: pagesState?.organization?.id!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceId: pagesState?.instance?.id!,
        region: pagesState?.roboticsCloud?.region!,
      },
      {
        ifErrorNavigateTo404: !responseFleets,
        setResponse: setResponseFleets,
      },
    );
  }

  function handleGetNamespaces() {
    getNamespaces(
      {
        organizationId: selectedState?.organization?.id!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.id!,
        region: selectedState?.roboticsCloud?.name!,
      },
      {
        ifErrorNavigateTo404: !responseFleets,
        setResponse: setResponseFleets,
      },
    );
  }

  function handleReload() {
    setResponseFleets(undefined);
    setReload((prevState: boolean) => !prevState);
  }

  const data: any = useMemo(
    () =>
      responseFleets?.map((fleet) => {
        return {
          key: fleet?.name,
          name: fleet,
          organization: pagesState?.organization?.name,
          roboticsCloud: pagesState?.roboticsCloud?.name,
          instance: pagesState?.instance?.name,
          state: fleet?.status || fleet?.status,
          actions: fleet,
        };
      }),
    [pagesState, responseFleets],
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
              subtitle={pagesState.organization?.name!}
              titleURL={`/${handleSplitOrganizationName(
                pagesState?.organization?.name!,
              )}/${pagesState?.roboticsCloud?.name}/${
                pagesState?.instance?.name
              }/${rowData?.name?.name}`}
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
        body: () => {
          return <BasicCell text={pagesState?.organization?.name!} />;
        },
      },
      {
        key: "roboticsCloud",
        header: "Region",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.roboticsCloud} />;
        },
      },
      {
        key: "instance",
        header: "Cloud Instance",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.instance} />;
        },
      },
      {
        key: "state",
        header: applicationMode ? "Namespace State" : "Fleet State",
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
            <Fragment>
              {applicationMode ? (
                <NamespaceActionCells
                  reload={() => setReload((prevState: boolean) => !prevState)}
                  data={{
                    organization: pagesState?.organization!,
                    roboticsCloud: pagesState?.roboticsCloud!,
                    instance: pagesState?.instance!,
                    fleet: rowData?.actions,
                  }}
                />
              ) : (
                <FleetActionCells
                  reload={() => setReload((prevState: boolean) => !prevState)}
                  data={{
                    organization: pagesState?.organization!,
                    roboticsCloud: pagesState?.roboticsCloud!,
                    instance: pagesState?.instance!,
                    fleet: rowData?.actions,
                  }}
                />
              )}
            </Fragment>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pagesState, responseFleets],
  );

  return { data, columns, responseFleets, handleReload };
}

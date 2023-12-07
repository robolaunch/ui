import NamespaceActionCells from "../components/TableActionCells/NamespaceActionCells";
import FleetActionCells from "../components/TableActionCells/FleetActionCells";
import { handleSplitOrganizationName } from "../functions/GeneralFunctions";
import BasicCell from "../components/TableInformationCells/BasicCell";
import StateCell from "../components/TableInformationCells/StateCell";
import InfoCell from "../components/TableInformationCells/InfoCell";
import { Fragment, useEffect, useMemo, useState } from "react";
import { envApplication } from "../helpers/envProvider";
import useFunctions from "../hooks/useFunctions";
import { useParams } from "react-router-dom";
import useMain from "../hooks/useMain";

export function InstanceTableData() {
  const [responseFleets, setResponseFleets] = useState<any>(undefined);
  const [reload, setReload] = useState<boolean>(false);

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
    if (
      pagesState?.organization?.organizationName !==
      `org_${url?.organizationName}`
    ) {
      handleGetOrganization();
    } else if (pagesState?.roboticsCloud?.name !== url?.roboticsCloudName) {
      handleGetRoboticsCloud();
    } else if (pagesState?.instance?.name !== url?.instanceName) {
      handleGetInstance();
    } else {
      envApplication ? handleGetNamespaces() : handleGetFleets();
    }

    const timer = setInterval(() => {
      pagesState?.instance && envApplication
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
        organizationId: pagesState?.organization?.organizationId!,
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
        organizationId: pagesState?.organization?.organizationId!,
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
        organizationId: pagesState?.organization?.organizationId!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceId: pagesState?.instance?.instanceId!,
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
        organizationId: selectedState?.organization?.organizationId!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.instanceId!,
        region: selectedState?.instance?.region!,
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
      responseFleets?.map((fleet: any) => {
        return {
          key: fleet?.name,
          name: fleet,
          organization: pagesState?.organization?.organizationName,
          roboticsCloud: pagesState?.roboticsCloud?.name,
          instance: pagesState?.instance?.name,
          state: fleet?.fleetStatus || fleet?.namespaceStatus,
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
              subtitle={pagesState.organization?.organizationName!}
              titleURL={`/${handleSplitOrganizationName(
                pagesState?.organization?.organizationName!,
              )}/${pagesState?.roboticsCloud?.name}/${pagesState?.instance
                ?.name}/${rowData?.name?.name}`}
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
          return (
            <BasicCell text={pagesState?.organization?.organizationName!} />
          );
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
        header: envApplication ? "Namespace State" : "Fleet State",
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
              {envApplication ? (
                <NamespaceActionCells
                  reload={() => setReload((prevState: boolean) => !prevState)}
                  data={{
                    organization: pagesState?.organization!,
                    roboticsCloud: pagesState?.roboticsCloud?.name!,
                    instance: pagesState?.instance!,
                    fleet: rowData?.actions,
                  }}
                />
              ) : (
                <FleetActionCells
                  reload={() => setReload((prevState: boolean) => !prevState)}
                  data={{
                    organization: pagesState?.organization!,
                    roboticsCloud: pagesState?.roboticsCloud?.name,
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

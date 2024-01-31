import BasicCell from "../components/TableInformationCells/BasicCell";
import StateCell from "../components/TableInformationCells/StateCell";
import InfoCell from "../components/TableInformationCells/InfoCell";
import { useEffect, useMemo, useState } from "react";
import useFunctions from "../hooks/useFunctions";
import { useParams } from "react-router-dom";
import useMain from "../hooks/useMain";
import { useAppSelector } from "../hooks/redux";
import { IFleet } from "../interfaces/fleet.interface";
import { INamespace } from "../interfaces/namespace.interface";
import { orgSplitter } from "../functions/string.splitter.function";
import { getRegionFromProviderCode } from "../functions/instance.function";
import NSActionCells from "../components/TableActionCells/NSActionCells";

export function InstanceTableData() {
  const [fleets, setFleets] = useState<IFleet[] | INamespace[] | null>();
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
    setFleets(null);
  }, [url]);

  function handleGetOrganization() {
    getOrganization(
      {
        organizationName: url?.organizationName as string,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !fleets,
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
        ifErrorNavigateTo404: !fleets,
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
        ifErrorNavigateTo404: !fleets,
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
        ifErrorNavigateTo404: !fleets,
        setResponse: setFleets,
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
        ifErrorNavigateTo404: !fleets,
        setResponse: setFleets,
      },
    );
  }

  function handleReload() {
    setFleets(undefined);
    setReload((prevState: boolean) => !prevState);
  }

  const rows = useMemo(
    () =>
      fleets?.map((fleet) => {
        return {
          name: fleet?.name,
          organization: orgSplitter(pagesState?.organization?.name!),
          region: getRegionFromProviderCode(pagesState?.roboticsCloud?.region!),
          instance: pagesState?.instance?.name,
          status: fleet?.status,
          actions: fleet,
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pagesState, fleets, url],
  );

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        sortable: false,
        filter: false,
        align: "left",
        body: ({ name }: { name: string }) => {
          return (
            <InfoCell
              title={name}
              subtitle={orgSplitter(pagesState.organization?.name!)}
              titleURL={`/${orgSplitter(
                pagesState?.organization?.name!,
              )}/${pagesState?.roboticsCloud?.name}/${
                pagesState?.instance?.name
              }/${name}`}
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
        body: ({ organization }: { organization: string }) => {
          return <BasicCell text={organization} />;
        },
      },
      {
        key: "region",
        header: "Region",
        sortable: false,
        filter: false,
        align: "left",
        body: ({ region }: { region: string }) => {
          return <BasicCell text={region} />;
        },
      },
      {
        key: "instance",
        header: "Cloud Instance",
        sortable: false,
        filter: false,
        align: "left",
        body: ({ instance }: { instance: string }) => {
          return <BasicCell text={instance} />;
        },
      },
      {
        key: "status",
        header: applicationMode ? "Namespace Status" : "Fleet Status",
        sortable: false,
        filter: false,
        align: "left",
        body: ({ status }: { status: string }) => {
          return <StateCell state={status} />;
        },
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        body: ({ actions }: { actions: IFleet | INamespace }) => {
          return (
            <NSActionCells
              reload={() => setReload((prevState: boolean) => !prevState)}
              data={actions}
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pagesState, fleets, url],
  );

  return { rows, columns, fleets, handleReload };
}

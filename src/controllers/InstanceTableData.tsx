import { getRegionFromProviderCode } from "../functions/instance.function";
import NSActionCells from "../components/TableActionCells/NSActionCells";
import BasicCell from "../components/TableInformationCells/BasicCell";
import StateCell from "../components/TableInformationCells/StateCell";
import InfoCell from "../components/TableInformationCells/InfoCell";
import { INamespace } from "../interfaces/global/namespace.interface";
import { IFleet } from "../interfaces/global/fleet.interface";
import { useEffect, useMemo, useState } from "react";
import useFunctions from "../hooks/useFunctions";
import { useAppSelector } from "../hooks/redux";
import { useParams } from "react-router-dom";
import useMain from "../hooks/useMain";
import { orgSplitter } from "../functions/general.function";

export function InstanceTableData() {
  const [fleets, setFleets] = useState<IFleet[] | INamespace[] | null>();
  const [reload, setReload] = useState<boolean>(false);
  const { applicationMode } = useAppSelector((state) => state.user);

  const {
    getOrganizationsFC,
    getRegionsFC,
    getCloudInstancesFC,
    getNamespacesFC,
    getFleetsFC,
  } = useFunctions();
  const url = useParams();
  const { pagesState } = useMain();

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
      pagesState?.organization &&
      pagesState?.roboticsCloud &&
      pagesState?.instance &&
      applicationMode
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
    getOrganizationsFC(true, true, url?.organizationName as string);
  }

  function handleGetRoboticsCloud() {
    getRegionsFC(true, true, url?.roboticsCloudName as string);
  }

  function handleGetInstance() {
    getCloudInstancesFC(true, true, url?.instanceName as string);
  }

  async function handleGetFleets() {
    setFleets(await getFleetsFC(true, !fleets));
  }

  async function handleGetNamespaces() {
    setFleets(await getNamespacesFC(true, !fleets));
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

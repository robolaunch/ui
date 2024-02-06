import TemporaryActionCells from "../components/TableActionCells/TemporaryActionCells";
import { getRegionFromProviderCode } from "../functions/instance.function";
import StateCell from "../components/TableInformationCells/StateCell";
import BasicCell from "../components/TableInformationCells/BasicCell";
import InfoCell from "../components/TableInformationCells/InfoCell";
import { orgSplitter } from "../functions/string.splitter.function";
import { IRegion } from "../interfaces/region.interface";
import { useEffect, useMemo, useState } from "react";
import useFunctions from "../hooks/useFunctions";
import { useParams } from "react-router-dom";
import useMain from "../hooks/useMain";

export function OrgTableData() {
  const [regions, setRegions] = useState<IRegion[] | null>(null);
  const { pagesState } = useMain();
  const { getOrganizationsFC, getRegionsFC } = useFunctions();
  const [reload, setReload] = useState<boolean>(false);
  const url = useParams();

  function handleReload() {
    setRegions(null);
    setReload(!reload);
  }

  useEffect(() => {
    if (pagesState?.organization?.name !== `org_${url?.organizationName}`) {
      handleGetOrganization();
    } else {
      handleGetRegions();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesState, reload, url]);

  useEffect(() => {
    setRegions(null);
  }, [url]);

  function handleGetOrganization() {
    getOrganizationsFC(true, true, url?.organizationName as string);
  }

  async function handleGetRegions() {
    setRegions(await getRegionsFC(true, !regions));
  }

  const rows = useMemo(
    () =>
      regions?.map((region) => {
        return {
          name: {
            region: region?.name,
            org: orgSplitter(pagesState?.organization?.name!),
            url: `/${orgSplitter(pagesState?.organization?.name!)}/${region?.name}`,
          },
          organization: orgSplitter(pagesState?.organization?.name!),
          country: getRegionFromProviderCode(region?.region),
          status: "Ready",
          actions: null,
        };
      }) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [regions, pagesState, url],
  );

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        sortable: false,
        filter: false,
        align: "left",
        body: ({
          name: { region, org, url },
        }: {
          name: { region: string; org: string; url: string };
        }) => {
          return <InfoCell title={region} subtitle={org} titleURL={url} />;
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
        key: "country",
        header: "Country",
        sortable: false,
        filter: false,
        align: "left",
        body: ({ country }: { country: string }) => {
          return <BasicCell text={country} />;
        },
      },
      {
        key: "status",
        header: "Status",
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
        body: () => {
          return (
            <TemporaryActionCells
              showEditButton
              showDeleteButton
              disabledEditButton
              disabledDeleteButton
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [regions, pagesState, url],
  );

  return {
    rows,
    columns,
    regions,
    handleReload,
  };
}

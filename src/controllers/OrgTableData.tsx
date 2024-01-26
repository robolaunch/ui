import {
  IOrganizationDashboardColumn,
  IOrganizationDashboardData,
} from "../interfaces/tableInterface";
import RegionsActionCells from "../components/TableActionCells/RegionsActionCells";
import { handleSplitOrganizationName } from "../functions/GeneralFunctions";
import StateCell from "../components/TableInformationCells/StateCell";
import BasicCell from "../components/TableInformationCells/BasicCell";
import InfoCell from "../components/TableInformationCells/InfoCell";
import { IRegion } from "../interfaces/regionInterfaces";
import { useEffect, useMemo, useState } from "react";
import useFunctions from "../hooks/useFunctions";
import { useParams } from "react-router-dom";
import useMain from "../hooks/useMain";

export function OrgTableData() {
  const [responseRegions, setResponseRegions] = useState<IRegion[] | undefined>(
    undefined,
  );
  const { pagesState } = useMain();
  const { getOrganization, getRoboticsClouds } = useFunctions();
  const [reload, setReload] = useState<boolean>(false);
  const url = useParams();

  function handleReload() {
    setResponseRegions(undefined);
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
    setResponseRegions(undefined);
  }, [url]);

  function handleGetOrganization() {
    getOrganization(
      {
        organizationName: url?.organizationName!,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: !responseRegions,
        setPages: true,
      },
    );
  }

  function handleGetRegions() {
    getRoboticsClouds(
      {
        organizationId: pagesState?.organization?.id!,
      },
      {
        setResponse: setResponseRegions,
        ifErrorNavigateTo404: !responseRegions,
      },
    );
  }

  const data: IOrganizationDashboardData[] = useMemo(
    () =>
      responseRegions?.map((r: IRegion) => {
        return {
          key: r?.name,
          name: {
            name: r?.name,
            organization: handleSplitOrganizationName(
              pagesState?.organization?.name!,
            ),
            titleURL: `/${handleSplitOrganizationName(
              pagesState?.organization?.name!,
            )}/${r?.name}`,
          },
          organization: handleSplitOrganizationName(
            pagesState?.organization?.name!,
          ),
          region: r?.region,
          country:
            r.region === "eu-central-1"
              ? "Frankfurt (Germany)"
              : r?.region === "eu-west-2"
                ? "London (UK)"
                : r?.region === "us-east-1"
                  ? "N. Virginia (US)"
                  : r?.region === "us-east-2"
                    ? "Ohio (US)"
                    : r?.region === "us-west-1"
                      ? "N. California (US)"
                      : r?.region === "ap-northeast-1"
                        ? "Tokyo (Japan)"
                        : "",
          state: "Ready",
          actions: r,
        };
      }) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [responseRegions, pagesState, url, reload],
  );

  const columns: IOrganizationDashboardColumn[] = useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: {
          name: { name: string; organization: string; titleURL: string };
        }) => {
          return (
            <InfoCell
              title={rowData?.name?.name}
              subtitle={rowData?.name?.organization}
              titleURL={rowData?.name?.titleURL}
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
        body: (rowData: { organization: string }) => {
          return <BasicCell text={rowData?.organization} />;
        },
      },
      {
        key: "region",
        header: "Region",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: { region: string }) => {
          return <BasicCell text={rowData?.region} />;
        },
      },
      {
        key: "country",
        header: "Country",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: { country: string }) => {
          return <BasicCell text={rowData?.country} />;
        },
      },
      {
        key: "state",
        header: "State",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: { state: string }) => {
          return <StateCell state={rowData?.state} />;
        },
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        body: (rowData: { actions: IRegion }) => {
          return (
            <RegionsActionCells
              data={rowData?.actions}
              handleReload={handleReload}
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [responseRegions, pagesState, url, reload],
  );

  return {
    data,
    columns,
    responseRegions,
    handleReload,
  };
}

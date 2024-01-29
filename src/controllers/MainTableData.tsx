import { IMainDashboardData } from "../interfaces/tableInterface";
import OrganizationActionCells from "../components/TableActionCells/OrganizationActionCells";
import StateCell from "../components/TableInformationCells/StateCell";
import { IOrganization } from "../interfaces/organization.interface";
import { useEffect, useMemo, useState } from "react";
import useFunctions from "../hooks/useFunctions";
import { useParams } from "react-router-dom";
import InfoCell from "../components/TableInformationCells/InfoCell";
import { IMainDashboardTableRow } from "../interfaces/table/table.dashboard.main.interface";
import { orgSplitter } from "../functions/string.splitter.function";

export function MainTableData() {
  const [orgs, setOrgs] = useState<IOrganization[] | null>();
  const { getOrganizations } = useFunctions();
  const url = useParams();

  function handleReload() {
    setOrgs(null);
  }

  useEffect(() => {
    !Array.isArray(orgs) &&
      getOrganizations({
        setResponse: setOrgs,
        ifErrorNavigateTo404: false,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, orgs]);

  useEffect(() => {
    setOrgs(null);
  }, [url]);

  const rows: IMainDashboardTableRow[] = useMemo(
    () =>
      orgs?.map((org) => {
        return {
          name: orgSplitter(org.name),
          status: "Ready",
          actions: org.id,
        };
      }) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [orgs, url],
  );

  const columns: any = useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        align: "left",
        body: ({ name }: { name: string }) => {
          return (
            <InfoCell title={name} subtitle={name} titleURL={`/${name}`} />
          );
        },
      },
      {
        key: "status",
        header: "Status",
        align: "left",
        body: ({ status }: { status: string }) => {
          return <StateCell state={status} />;
        },
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        body: (rowData: IMainDashboardData) => {
          return (
            <OrganizationActionCells
              data={rowData?.actions}
              reloadHandle={handleReload}
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [orgs, url],
  );

  return {
    rows,
    columns,
    orgs,
    handleReload,
  };
}

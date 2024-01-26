import {
  IMainDashboardColumn,
  IMainDashboardData,
} from "../interfaces/tableInterface";
import OrganizationActionCells from "../components/TableActionCells/OrganizationActionCells";
import StateCell from "../components/TableInformationCells/StateCell";
import { IOrganization } from "../interfaces/organization.interface";
import { useEffect, useMemo, useState } from "react";
import useFunctions from "../hooks/useFunctions";
import { useParams } from "react-router-dom";
import InfoCell from "../components/TableInformationCells/InfoCell";
import { organizationNameViewer } from "../functions/GeneralFunctions";

export function MainTableData() {
  const [responseOrganizations, setResponseOrganizations] = useState<
    IOrganization[] | undefined
  >();
  const [reload, setReload] = useState<boolean>(false);
  const { getOrganizations } = useFunctions();
  const url = useParams();

  function handleReload() {
    setResponseOrganizations(undefined);
    setReload(!reload);
  }

  useEffect(() => {
    getOrganizations({
      setResponse: setResponseOrganizations,
      ifErrorNavigateTo404: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, url]);

  useEffect(() => {
    setResponseOrganizations(undefined);
  }, [url]);

  const data: IMainDashboardData[] = useMemo(
    () =>
      responseOrganizations?.map((organization: IOrganization) => {
        return {
          key: organization?.name,
          name: organization?.name,
          status: "Ready",
          actions: organization,
        };
      }) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [responseOrganizations, reload, url],
  );

  const columns: IMainDashboardColumn[] = useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: IMainDashboardData) => {
          return (
            <InfoCell
              title={organizationNameViewer({
                organizationName: rowData?.name,
                capitalization: false,
              })}
              subtitle={`${organizationNameViewer({
                organizationName: rowData?.name,
                capitalization: false,
              })}`}
              titleURL={`/${organizationNameViewer({
                organizationName: rowData?.name,
                capitalization: false,
              })}`}
            />
          );
        },
      },
      {
        key: "status",
        header: "Status",
        align: "left",
        body: (rowData) => {
          return <StateCell state={rowData?.status} />;
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
    [responseOrganizations, reload, url],
  );

  return {
    data,
    columns,
    responseOrganizations,
    handleReload,
  };
}

import {
  IMainDashboardColumn,
  IMainDashboardData,
} from "../interfaces/tableInterface";
import OrganizationActionCells from "../components/TableActionCells/OrganizationActionCells";
import OrganizationInfoCell from "../components/OrganizationInfoCell/OrganizationInfoCell";
import StateCell from "../components/TableInformationCells/StateCell";
import { IOrganization } from "../interfaces/organizationInterfaces";
import { useEffect, useMemo, useState } from "react";
import useFunctions from "../hooks/useFunctions";
import { useParams } from "react-router-dom";

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
  }, [getOrganizations, reload, url]);

  useEffect(() => {
    setResponseOrganizations(undefined);
  }, [url]);

  const data: IMainDashboardData[] = useMemo(
    () =>
      responseOrganizations?.map((organization: IOrganization) => {
        return {
          key: organization?.organizationName,
          name: organization?.organizationName,
          state: "Ready",
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
          return <OrganizationInfoCell organizationName={rowData?.name} />;
        },
      },
      {
        key: "state",
        header: "State",
        align: "left",
        body: (rowData) => {
          return <StateCell state={rowData?.state} />;
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

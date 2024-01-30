import StateCell from "../components/TableInformationCells/StateCell";
import { IOrganization } from "../interfaces/organization.interface";
import InfoCell from "../components/TableInformationCells/InfoCell";
import { orgSplitter } from "../functions/string.splitter.function";
import { useEffect, useMemo, useState } from "react";
import useFunctions from "../hooks/useFunctions";
import { useParams } from "react-router-dom";

import TemporaryActionCells from "../components/TableActionCells/TemporaryActionCells";

export function MainTableData() {
  const [orgs, setOrgs] = useState<IOrganization[] | null>();
  const [reload, setReload] = useState<boolean>(false);
  const { getOrganizations } = useFunctions();
  const url = useParams();

  function handleReload() {
    setReload(!reload);
    setOrgs(null);
  }

  useEffect(() => {
    getOrganizations({
      setResponse: setOrgs,
      ifErrorNavigateTo404: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, reload]);

  useEffect(() => {
    setOrgs(null);
  }, [url]);

  const rows = useMemo(
    () =>
      orgs?.map((org) => {
        return {
          name: orgSplitter(org.name),
          status: "Ready",
          actions: null,
        };
      }) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [orgs, url],
  );

  const columns = useMemo(
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
    [orgs, url],
  );

  return {
    rows,
    columns,
    orgs,
    handleReload,
  };
}

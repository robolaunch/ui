import React, { Fragment, useEffect, useMemo } from "react";
import { GeneralTable } from "../../../components/Table/GeneralTable";
import { InfoCell } from "../../../components/Cells/InfoCell";
import { useAppDispatch } from "../../../hooks/redux";
import { getOrganizations } from "../../../resources/OrganizationSlice";
import OrganizationActionCells from "../../../components/ActionCells/OrganizationActionCells";
import { useParams } from "react-router";

interface IOrganizationsTable {
  responseOrganizations: any;
  setResponseOrganizations: (value: any) => void;
}

export default function OrganizationsTable({
  responseOrganizations,
  setResponseOrganizations,
}: IOrganizationsTable) {
  const dispatch = useAppDispatch();
  const url = useParams();

  useEffect(() => {
    dispatch(getOrganizations()).then((res: any) => {
      setResponseOrganizations(res?.payload?.data);
    });
  }, [url, dispatch]);

  const data: any = useMemo(
    () =>
      responseOrganizations?.map((organization: any) => {
        return {
          key: organization?.organizationName,
          name: organization,
          users: organization?.userCount,
        };
      }),
    [responseOrganizations]
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
              title={rowData?.name?.organizationName}
              titleURL={`#`}
              subtitle={`Member Count: ${rowData?.name?.userCount}`}
            />
          );
        },
      },
      {
        key: "users",
        header: "Users",
        sortable: true,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return (
            <Fragment>
              <span>{Number(rowData?.users)}</span>
            </Fragment>
          );
        },
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        body: (rowData: any) => {
          return <OrganizationActionCells data={rowData?.name} />;
        },
      },
    ],
    []
  );

  return (
    <GeneralTable
      type="organization"
      title="Organizations"
      data={data}
      columns={columns}
      loading={responseOrganizations?.length ? false : true}
    />
  );
}

import React, { Fragment, useEffect, useMemo, useState } from "react";
import { GeneralTable } from "../../../components/Table/GeneralTable";
import { InfoCell } from "../../../components/Cells/InfoCell";
import { useAppDispatch } from "../../../hooks/redux";
import { getOrganizations } from "../../../resources/OrganizationSlice";
import OrganizationActionCells from "../../../components/ActionCells/OrganizationActionCells";
import { useParams } from "react-router";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import CardLayout from "../../../layouts/CardLayout";

export default function OrganizationsPage() {
  const [responseOrganizations, setResponseOrganizations] = useState<any>(null);
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
              titleURL={`/user-role-management/${rowData?.name?.organizationName}`}
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
    <div className="grid grid-cols-10 gap-6 h-full">
      <div className="col-span-3">
        <div className="flex flex-col gap-6">
          <InformationWidget
            title="User and Role Management"
            subtitle="From this page, you can view, control or get information about all
            the details of the teams in your organization."
            actiontitle="If you need to create a new team or check the users in the team you
            can proceed here."
            component={
              <CardLayout className="pt-6">
                <></>
              </CardLayout>
            }
          />
        </div>
      </div>
      <div className="col-span-7 h-full">
        <GeneralTable
          type="organization"
          title="Organizations"
          data={data}
          columns={columns}
          loading={responseOrganizations?.length ? false : true}
        />
      </div>
    </div>
  );
}

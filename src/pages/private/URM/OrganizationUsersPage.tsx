import React, { Fragment, useEffect, useMemo, useState } from "react";
import { GeneralTable } from "../../../components/Table/GeneralTable";
import { InfoCell } from "../../../components/Cells/InfoCell";
import { useAppDispatch } from "../../../hooks/redux";
import {
  getOrganizationUsers,
  getOrganizations,
} from "../../../resources/OrganizationSlice";
import { useParams } from "react-router";
import Page404 from "../../../components/Page404/Page404";
import OrganizationActionCells from "../../../components/ActionCells/OrganizationActionCells";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import CardLayout from "../../../layouts/CardLayout";

export default function OrganizationUsersPage() {
  const [responseOrganizationsUsers, setResponseOrganizationsUsers] =
    useState<any>(null);
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();
  const url = useParams();

  useEffect(() => {
    dispatch(getOrganizations()).then((responseOrganizations: any) => {
      dispatch(
        getOrganizationUsers({
          organizationId: responseOrganizations?.payload?.data?.filter(
            (organization: any) =>
              organization?.organizationName === url?.organizationName
          )[0]?.organizationId,
        })
      ).then((responseOrganizationUsers: any) => {
        console.log(responseOrganizationUsers);
        if (responseOrganizationUsers?.error) {
          setIsError(true);
        } else {
          setResponseOrganizationsUsers(
            responseOrganizationUsers?.payload?.data
          );
        }
      });
    });
  }, [dispatch, url]);

  const data: any = useMemo(
    () =>
      responseOrganizationsUsers?.map((user: any) => {
        return {
          key: user?.organizationName,
          name: user,
          username: user?.username,
          organization: url?.organizationName,
          // users: organization?.users,
        };
      }),
    [url, responseOrganizationsUsers]
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
              title={`${rowData?.name?.firstName} ${rowData?.name?.lastName}`}
              titleURL={`#`}
              subtitle={rowData?.name?.email}
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
        body: () => {
          return (
            <Fragment>
              <span>{url?.organizationName}</span>
            </Fragment>
          );
        },
      },
      {
        key: "username",
        header: "Username",
        sortable: true,
        filter: true,
        align: "left",
        body: (rowData: any) => {
          return (
            <Fragment>
              <span>{rowData?.username}</span>
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
    [url]
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
        <Fragment>
          {isError ? (
            <Page404
              className="!h-64"
              description="
        Organization not found.
        "
              buttonText="
        Go Back to Organizations Page"
              buttonURL="/user-role-management"
            />
          ) : (
            <GeneralTable
              type="users"
              title="Organization Users"
              data={data}
              columns={columns}
              loading={responseOrganizationsUsers?.length ? false : true}
            />
          )}
        </Fragment>
      </div>
    </div>
  );
}

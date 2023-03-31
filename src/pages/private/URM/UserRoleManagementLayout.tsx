import React, { ReactElement } from "react";
import CardLayout from "../../../layouts/CardLayout";
import OrganizationsTable from "./OrganizationsTable";
import OrganizationUsersTable from "./OrganizationUsersPage";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import { useParams } from "react-router-dom";

export default function UserRoleManagementLayout(): ReactElement {
  const url = useParams();

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
        {url?.organizationName ? (
          <OrganizationUsersTable />
        ) : (
          <OrganizationsTable />
        )}
      </div>
    </div>
  );
}

import React, { ReactElement, useState } from "react";
import CardLayout from "../../../layouts/CardLayout";
import OrganizationsTable from "./OrganizationsTable";
import OrganizationUsersTable from "./OrganizationUsersTable";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";

export default function URMPage(): ReactElement {
  const [activePage, setActivePage] = useState<string>("organizations");

  const pages: any = [
    {
      key: "organizations",
      name: "Organizations",
    },
    {
      key: "organizationusers",
      name: "Organization Users",
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-6">
      <div className="col-span-1">
        <div className="flex flex-col gap-6">
          <InformationWidget
            title="User and Role Management"
            subtitle="From this page, you can view, control or get information about all
            the details of the teams in your organization."
            actiontitle="If you need to create a new team or check the users in the team you
            can proceed here."
            component={
              <CardLayout className="pt-6">
                <ul className="flex flex-col gap-2 text-sm ">
                  {pages?.map((page: any) => {
                    return (
                      <li
                        key={page?.key}
                        className={`p-2.5 cursor-pointer transition-all duration-500 hover:bg-layer-light-200 text-layer-dark-900 rounded ${
                          page?.key === activePage &&
                          "bg-layer-light-100 font-medium"
                        }`}
                        onClick={() => setActivePage(page?.key)}
                      >
                        {page?.name}
                      </li>
                    );
                  })}
                </ul>
              </CardLayout>
            }
          />
        </div>
      </div>
      <div className="col-span-4">
        {(() => {
          switch (activePage) {
            case "organizations":
              return <OrganizationsTable />;
            case "organizationusers":
              return <OrganizationUsersTable />;
          }
        })()}
      </div>
    </div>
  );
}

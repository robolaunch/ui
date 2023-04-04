import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { getOrganizations } from "../../resources/OrganizationSlice";
import CardLayout from "../../layouts/CardLayout";
import InformationWidget from "../../components/InformationWidget/InformationWidget";
import OrganizationsTable from "./OrganizationsTable";
import OrganizationUsersTable from "./OrganizationUsersTable";
import organizationNameViewer from "../../helpers/organizationNameViewer";
import OrganizationGuestsTable from "./OrganizationGuestsTable";

export default function UserRoleManagementLayout(): ReactElement {
  const [responseOrganizations, setResponseOrganizations] = useState<any>(null);
  const dispatch = useAppDispatch();
  const [activePage, setActivePage] = useState<any>({
    page: "organizations",
    selectedOrganization: null,
  });

  useEffect(() => {
    dispatch(getOrganizations()).then((res: any) => {
      setResponseOrganizations(res?.payload?.data);
    });
  }, [dispatch]);

  const pages: any = [
    {
      key: "organizations",
      name: `Organizations`,
    },
    activePage?.page !== "organizations"
      ? {
          key: "organizationUsers",
          name: `Organization Users and Admins`,
        }
      : null,
    activePage?.page !== "organizations"
      ? {
          key: "invitedUsers",
          name: `Invited Users`,
        }
      : null,
  ];

  function handleChangeActiveTab(data: any) {
    setActivePage(data);
  }

  return (
    <div className="grid grid-cols-10 gap-6 h-full">
      <div className="col-span-3">
        <div className="flex flex-col gap-6">
          <InformationWidget
            title={
              activePage?.page === "organizations"
                ? "Organizations"
                : activePage?.page === "organizationUsers"
                ? `${organizationNameViewer({
                    organizationName:
                      activePage?.selectedOrganization?.organizationName,
                  })} Users and Admins`
                : `${organizationNameViewer({
                    organizationName:
                      activePage?.selectedOrganization?.organizationName,
                  })} Invited Users`
            }
            subtitle="From this page, you can view, control or get information about all
            the details of the teams in your organization."
            actiontitle="If you need to create a new team or check the users in the team you
            can proceed here."
            component={
              <CardLayout className="pt-6">
                <ul className="flex flex-col gap-2 text-sm ">
                  {pages?.map((page: any) => {
                    if (page === null) {
                      return null;
                    }
                    return (
                      <li
                        key={page?.key}
                        className={`p-2.5 cursor-pointer transition-all hover:bg-layer-light-200 text-layer-dark-900 rounded ${
                          page?.key === activePage?.page &&
                          "bg-layer-light-100 font-medium"
                        }`}
                        onClick={() =>
                          setActivePage({
                            page: page?.key,
                            selectedOrganization:
                              page === "organizations"
                                ? null
                                : activePage?.selectedOrganization,
                          })
                        }
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
      <div className="col-span-7 h-full">
        <Fragment>
          {(() => {
            switch (activePage?.page) {
              case "organizations":
                return (
                  <OrganizationsTable
                    responseOrganizations={responseOrganizations}
                    handleChangeActiveTab={handleChangeActiveTab}
                  />
                );
              case "organizationUsers":
                return <OrganizationUsersTable activePage={activePage} />;
              case "invitedUsers":
                return <OrganizationGuestsTable activePage={activePage} />;
            }
          })()}
        </Fragment>
      </div>
    </div>
  );
}

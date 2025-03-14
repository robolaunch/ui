import React, { Fragment, ReactElement, useEffect, useState } from "react";
import CardLayout from "./CardLayout";
import InformationWidget from "../components/InformationWidget/InformationWidget";
import OrganizationsTable from "../pages/UserRoleManagement/OrganizationsPage";
import OrganizationUsersPage from "../pages/UserRoleManagement/OrganizationUsersPage";
import OrganizationGuestsPage from "../pages/UserRoleManagement/OrganizationGuestsPage";
import OrganizationAdminsPage from "../pages/UserRoleManagement/OrganizationAdminsPage";
import Button from "../components/Button/Button";
import InviteUserToOrganizationModal from "../modals/IntiveUserToOrganizationModal";
import { useAppDispatch } from "../hooks/redux";
import { getOrganizations } from "../toolkit/OrganizationSlice";
import { orgSplitter } from "../functions/general.function";

export default function UserRoleManagementLayout(): ReactElement {
  const [responseOrganizations, setResponseOrganizations] = useState<
    string[] | null
  >(null);
  const [activePage, setActivePage] = useState<any>({
    page: "organizations",
    selectedOrganization: null,
  });
  const [visibleInviteUserModal, setVisibleInviteUserModal] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrganizations()).then((responseOrganizations: any) => {
      setResponseOrganizations(responseOrganizations?.payload?.data || []);
    });
  }, [dispatch]);

  const pages = [
    {
      key: "organizations",
      name: `Organizations`,
    },
    activePage?.page !== "organizations"
      ? {
          key: "organizationUsers",
          name: `Organization Users`,
        }
      : null,
    activePage?.page !== "organizations"
      ? {
          key: "organizationAdmins",
          name: `Organization Admins`,
        }
      : null,

    activePage?.page !== "organizations"
      ? {
          key: "organizationGuests",
          name: `Organization Guests`,
        }
      : null,
  ];

  function handleChangeActiveTab(data: any) {
    setActivePage(data);
  }

  return (
    <div className="grid h-full grid-cols-10 gap-6">
      <div className="col-span-3">
        <div className="flex flex-col gap-6">
          <InformationWidget
            title={
              activePage?.page === "organizations"
                ? "Organizations"
                : activePage?.page === "organizationUsers"
                  ? `${orgSplitter(
                      activePage?.selectedOrganization?.organizationName,
                    )} Users`
                  : `${orgSplitter(
                      activePage?.selectedOrganization?.organizationName,
                    )} Guests`
            }
            subtitle="From this page, you can view, control or get information about all
            the details of the teams in your organization. If you need to create a new team or check the users in the team you
            can proceed here."
            component={
              <div className="flex flex-col gap-6">
                <Button
                  text="Invite User"
                  onClick={() =>
                    setVisibleInviteUserModal(!visibleInviteUserModal)
                  }
                  className="!h-10 border border-primary-700 !bg-light-50 !text-primary-700 transition-all duration-500 hover:scale-95 hover:!bg-primary-100"
                />
                <CardLayout className="border border-light-100">
                  <div className="flex flex-col gap-4">
                    <ul className="flex flex-col gap-2 text-sm ">
                      {pages?.map((page: any) => {
                        if (page === null) {
                          return null;
                        }

                        return (
                          <li
                            key={page?.key}
                            className={`cursor-pointer rounded p-2.5 text-light-900 transition-all hover:bg-light-200 ${
                              page?.key === activePage?.page &&
                              "bg-light-100 font-medium"
                            } ${
                              page?.key !== "organizations" &&
                              "flex items-center gap-4"
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
                            {page?.key !== "organizations" && (
                              <span className="h-2 w-2 rounded-full bg-primary-500" />
                            )}
                            {page?.key === "organizations"
                              ? "All Organizations"
                              : page?.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </CardLayout>
              </div>
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
              case "organizationAdmins":
                return <OrganizationAdminsPage activePage={activePage} />;
              case "organizationUsers":
                return <OrganizationUsersPage activePage={activePage} />;
              case "organizationGuests":
                return <OrganizationGuestsPage activePage={activePage} />;
            }
          })()}
        </Fragment>
      </div>
      {visibleInviteUserModal && (
        <InviteUserToOrganizationModal
          visibleModal={visibleInviteUserModal}
          handleCloseModal={() => setVisibleInviteUserModal(false)}
          organizations={responseOrganizations}
        />
      )}
    </div>
  );
}

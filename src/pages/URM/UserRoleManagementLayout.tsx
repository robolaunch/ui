import React, {
  Fragment,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import CardLayout from "../../layouts/CardLayout";
import InformationWidget from "../../components/InformationWidget/InformationWidget";
import OrganizationsTable from "./OrganizationsTable";
import OrganizationUsersTable from "./OrganizationUsersTable";
import organizationNameViewer from "../../helpers/organizationNameViewer";
import OrganizationGuestsTable from "./OrganizationGuestsTable";
import OrganizationAdminsTable from "./OrganizationAdminsTable";
import { ApiContext } from "../../contexts/ApiContext";
import { IApiInterface } from "../../types/ApiInterface";
import Button from "../../components/Button/Button";
import InviteUserToOrganizationModal from "../../modals/IntiveUserToOrganizationModal";

export default function UserRoleManagementLayout(): ReactElement {
  const [responseOrganizations, setResponseOrganizations] = useState<any>(null);
  const [activePage, setActivePage] = useState<any>({
    page: "organizations",
    selectedOrganization: null,
  });
  const [visibleInviteUserModal, setVisibleInviteUserModal] =
    useState<boolean>(false);

  const { api }: IApiInterface = useContext(ApiContext);

  useEffect(() => {
    api.getOrganizations().then((responseOrganizations: any) => {
      setResponseOrganizations(responseOrganizations?.data?.data || []);
    });
  }, []);

  const pages = [
    {
      key: "organizations",
      name: `Organizations`,
    },
    activePage?.page !== "organizations"
      ? {
          key: "organizationAdmins",
          name: `Organization Admins`,
        }
      : null,
    activePage?.page !== "organizations"
      ? {
          key: "organizationUsers",
          name: `Organization Users`,
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
                  })} Users`
                : `${organizationNameViewer({
                    organizationName:
                      activePage?.selectedOrganization?.organizationName,
                  })} Guests`
            }
            subtitle="From this page, you can view, control or get information about all
            the details of the teams in your organization."
            actiontitle="If you need to create a new team or check the users in the team you
            can proceed here."
            component={
              <CardLayout className="pt-6">
                <div className="flex flex-col gap-4">
                  <Button
                    text="Invite User"
                    onClick={() =>
                      setVisibleInviteUserModal(!visibleInviteUserModal)
                    }
                    className="!h-10"
                  />

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
                          } ${page?.key !== "organizations" && "ml-4"} `}
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
                </div>
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

              case "organizationAdmins":
                return <OrganizationAdminsTable activePage={activePage} />;
              case "organizationUsers":
                return <OrganizationUsersTable activePage={activePage} />;
              case "organizationGuests":
                return <OrganizationGuestsTable activePage={activePage} />;
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

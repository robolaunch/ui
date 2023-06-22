import React, { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarListItem from "./SidebarListItem";
import organizationNameViewer from "../../helpers/organizationNameViewer";
import useSidebar from "../../hooks/useSidebar";
import SidebarSelectInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";

interface IOrganizationList {
  setItemCount: any;
  reload: boolean;
}

export default function OrganizationsList({
  reload,
  setItemCount,
}: IOrganizationList): ReactElement {
  const [responseOrganizations, setResponseOrganizations] = useState<
    any[] | undefined
  >(undefined);
  const { selectedState } = useSidebar();
  const { getOrganizations } = useFunctions();

  useEffect(() => {
    handleGetOrganizations();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  function handleGetOrganizations() {
    setResponseOrganizations(undefined);
    getOrganizations({
      ifErrorNavigateTo404: false,
      setResponse: setResponseOrganizations,
    });
    setItemCount(responseOrganizations?.length);
  }

  return (
    <Fragment>
      {!Array.isArray(responseOrganizations) ? (
        <img
          className="w-12 mx-auto pt-10"
          src="/svg/general/loading.svg"
          alt="Loading..."
        />
      ) : Array.isArray(responseOrganizations) &&
        !responseOrganizations?.length ? (
        <SidebarSelectInfo text={`Create an Organization`} />
      ) : (
        responseOrganizations.map((organization: any, index: number) => {
          return (
            <SidebarListItem
              key={index}
              type="organization"
              name={organizationNameViewer({
                organizationName: organization?.organizationName,
                capitalization: false,
              })}
              description={`Member Count: ${organization?.userCount}`}
              url={`/${organizationNameViewer({
                organizationName: organization?.organizationName,
                capitalization: false,
              })}`}
              data={organization}
              selected={
                organization.organizationName ===
                selectedState?.organization?.organizationName
              }
            />
          );
        })
      )}
    </Fragment>
  );
}

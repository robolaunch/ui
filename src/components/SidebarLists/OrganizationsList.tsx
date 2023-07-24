import React, { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarListItem from "./SidebarListItem";
import { organizationNameViewer } from "../../functions/GeneralFunctions";
import useSidebar from "../../hooks/useSidebar";
import SidebarSelectInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import SidebarListLoader from "../SidebarListLoader/SidebarListLoader";

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
      setItemCount: setItemCount,
    });
  }

  return (
    <Fragment>
      {!Array.isArray(responseOrganizations) ? (
        <SidebarListLoader />
      ) : Array.isArray(responseOrganizations) &&
        !responseOrganizations?.length ? (
        <SidebarSelectInfo text={`Create an Organization.`} />
      ) : (
        responseOrganizations?.map((organization: any, index: number) => {
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

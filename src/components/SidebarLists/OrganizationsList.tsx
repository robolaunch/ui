import React, { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarListItem from "./SidebarListItem";
import { organizationNameViewer } from "../../functions/GeneralFunctions";
import useMain from "../../hooks/useMain";
import SidebarSelectInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import SidebarListLoader from "../SidebarListLoader/SidebarListLoader";
import StateCell from "../Cells/StateCell";
import { IOrganization } from "../../interfaces/organizationInterfaces";

interface IOrganizationList {
  setItemCount: any;
  reload: boolean;
}

export default function OrganizationsList({
  reload,
  setItemCount,
}: IOrganizationList): ReactElement {
  const [responseOrganizations, setResponseOrganizations] = useState<
    IOrganization[] | undefined
  >(undefined);
  const { selectedState } = useMain();
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
        responseOrganizations?.map(
          (organization: IOrganization, index: number) => {
            return (
              <SidebarListItem
                key={index}
                type="organization"
                name={organizationNameViewer({
                  organizationName: organization?.organizationName,
                  capitalization: false,
                })}
                description={<StateCell state={"Ready"} />}
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
          }
        )
      )}
    </Fragment>
  );
}

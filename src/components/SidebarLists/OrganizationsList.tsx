import { organizationNameViewer } from "../../functions/GeneralFunctions";
import { IOrganization } from "../../interfaces/organization.interface";
import SidebarListLoader from "../SidebarListLoader/SidebarListLoader";
import { Fragment, ReactElement, useEffect, useState } from "react";
import StateCell from "../TableInformationCells/StateCell";
import SidebarSelectInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import SidebarListItem from "./SidebarListItem";
import useMain from "../../hooks/useMain";

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
                  organizationName: organization?.name,
                  capitalization: false,
                })}
                description={<StateCell state={"Ready"} />}
                url={`/${organizationNameViewer({
                  organizationName: organization?.name,
                  capitalization: false,
                })}`}
                data={organization}
                selected={
                  organization.name === selectedState?.organization?.name
                }
              />
            );
          },
        )
      )}
    </Fragment>
  );
}

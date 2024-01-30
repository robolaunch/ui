import { IOrganization } from "../../interfaces/organization.interface";
import SidebarListLoader from "../SidebarListLoader/SidebarListLoader";
import { Fragment, ReactElement, useEffect, useState } from "react";
import StateCell from "../TableInformationCells/StateCell";
import SidebarSelectInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import SidebarListItem from "./SidebarListItem";
import useMain from "../../hooks/useMain";
import { orgSplitter } from "../../functions/string.splitter.function";

interface IOrganizationList {
  setItemCount: any;
  reload: boolean;
}

export default function OrganizationsList({
  reload,
  setItemCount,
}: IOrganizationList): ReactElement {
  const [orgs, setOrgs] = useState<IOrganization[] | null>(null);
  const { selectedState } = useMain();
  const { getOrganizations } = useFunctions();

  useEffect(() => {
    handleGetOrganizations();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  function handleGetOrganizations() {
    setOrgs(null);
    getOrganizations({
      ifErrorNavigateTo404: false,
      setResponse: setOrgs,
      setItemCount: setItemCount,
    });
  }

  return (
    <Fragment>
      {!Array.isArray(orgs) ? (
        <SidebarListLoader />
      ) : Array.isArray(orgs) && !orgs?.length ? (
        <SidebarSelectInfo text={`Create an Organization.`} />
      ) : (
        orgs?.map((organization, index: number) => {
          return (
            <SidebarListItem
              key={index}
              type="organization"
              name={orgSplitter(organization.name)}
              description={<StateCell state={"Ready"} />}
              url={`/${orgSplitter(organization.name)}`}
              data={organization}
              selected={organization.name === selectedState?.organization?.name}
            />
          );
        })
      )}
    </Fragment>
  );
}

import { IOrganization } from "../../interfaces/global/organization.interface";
import SidebarListLoader from "../SidebarListLoader/SidebarListLoader";
import { orgSplitter } from "../../functions/string.splitter.function";
import { Fragment, ReactElement, useEffect, useState } from "react";
import StateCell from "../TableInformationCells/StateCell";
import SidebarSelectInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import SidebarListItem from "./SidebarListItem";
import useMain from "../../hooks/useMain";

interface IOrganizationList {
  reload: boolean;
}

export default function OrganizationsList({
  reload,
}: IOrganizationList): ReactElement {
  const [orgs, setOrgs] = useState<IOrganization[] | null>(null);
  const { selectedState } = useMain();
  const { getOrganizationsFC } = useFunctions();

  useEffect(() => {
    setOrgs(null);
    handleGetOrganizations();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  async function handleGetOrganizations() {
    setOrgs(await getOrganizationsFC(false, false));
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

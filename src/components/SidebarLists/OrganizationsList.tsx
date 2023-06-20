import React, { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarListItem from "./SidebarListItem";
import { getOrganizations } from "../../resources/OrganizationSlice";
import { useAppDispatch } from "../../hooks/redux";
import organizationNameViewer from "../../helpers/organizationNameViewer";
import useSidebar from "../../hooks/useSidebar";
import SidebarSelectInfo from "../SidebarInfo/SidebarInfo";

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
  const dispatch = useAppDispatch();

  useEffect(() => {
    setResponseOrganizations(undefined);
    dispatch(getOrganizations()).then((responseOrganizations: any) => {
      setResponseOrganizations(responseOrganizations?.payload?.data || []);
      setItemCount(responseOrganizations?.payload?.data?.length || 0);
    });
  }, [dispatch, setItemCount, reload]);

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

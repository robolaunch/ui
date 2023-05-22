import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { SidebarListItem } from "./SidebarListItem";
import { getOrganizations } from "../../resources/OrganizationSlice";
import { useAppDispatch } from "../../hooks/redux";
import organizationNameViewer from "../../helpers/organizationNameViewer";
import useSidebar from "../../hooks/useSidebar";

interface IOrganizationList {
  reload: boolean;
  setItemCount: any;
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
    dispatch(getOrganizations()).then((responseOrganizations: any) => {
      setResponseOrganizations(responseOrganizations?.payload?.data || []);
      setItemCount(responseOrganizations?.payload?.data?.length || 0);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, setItemCount]);

  return (
    <Fragment>
      {!responseOrganizations?.length ? (
        <img
          className="w-12 mx-auto pt-10"
          src="/svg/general/loading.svg"
          alt="Loading..."
        />
      ) : (
        <Fragment>
          {responseOrganizations.map((organization: any, index: number) => {
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
          })}
        </Fragment>
      )}
    </Fragment>
  );
}

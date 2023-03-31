import React, { Fragment, useContext, useEffect, useState } from "react";
import { SidebarListItem } from "./SidebarListItem";
import { useAppDispatch } from "../../../hooks/redux";
import { getOrganizations } from "../../../resources/OrganizationSlice";
import { SidebarContext } from "../../../contexts/SidebarContext";

interface IOrganizationList {
  reload: boolean;
  setItemCount: any;
}

export const OrganizationsList = ({
  reload,
  setItemCount,
}: IOrganizationList) => {
  const [responseOrganizations, setResponseOrganizations] =
    useState<any>(undefined);
  const { selectedState }: any = useContext(SidebarContext);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrganizations()).then((res: any) => {
      console.log(res);
      setResponseOrganizations(res?.payload?.data);
      setItemCount(res?.payload?.data?.length);
    });
  }, [dispatch, reload, setItemCount]);

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
                name={organization?.organizationName}
                description={`Member Count: ${organization?.userCount}`}
                url={`/${organization?.organizationName}`}
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
};

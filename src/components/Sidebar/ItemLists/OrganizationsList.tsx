import React, { Fragment, useContext, useEffect, useState } from "react";
import { SidebarListItem } from "./SidebarListItem";
import { SidebarContext } from "../../../contexts/SidebarContext";
import { ApiContext } from "../../../contexts/ApiContext";
import { Api } from "../../../types/types";

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

  const { api }: Api = useContext(ApiContext);

  useEffect(() => {
    api.getOrganizations().then((responseOrganizations: any) => {
      setResponseOrganizations(responseOrganizations?.data?.data || []);
      setItemCount(responseOrganizations?.data?.data?.length);
    });
  }, []);

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

import React, { Fragment, useContext, useEffect, useState } from "react";
import { SidebarListItem } from "./SidebarListItem";
import { useAppDispatch } from "../../../hooks/redux";
import { getOrganizations } from "../../../app/OrganizationSlice";
import { SidebarContext } from "../../../contexts/SidebarContext";

interface IOrganizationList {
  reload: boolean;
}

export const OrganizationsList = ({ reload }: IOrganizationList) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [responseOrganizations, setResponseOrganizations] = useState<any>([]);
  const { selectedState }: any = useContext(SidebarContext);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getOrganizations()).then((res: any) => {
      setResponseOrganizations(res?.payload?.data);
    });
    setTimeout(() => setLoading(false), 2000);
  }, [dispatch, reload]);

  return (
    <div className="flex flex-col gap-4 animate__animated animate__fadeInUp h-full">
      {loading ? (
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
    </div>
  );
};

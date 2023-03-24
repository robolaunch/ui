import React, { Fragment, useEffect, useState } from "react";
import { SidebarListItem } from "./SidebarListItem";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getOrganizations } from "../../../app/OrganizationSlice";

export const OrganizationsList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [responseOrganizations, setResponseOrganizations] = useState<any>([]);
  const dispatch = useAppDispatch();

  const { currentOrganization } = useAppSelector((state) => state.organization);

  useEffect(() => {
    setLoading(true);
    dispatch(getOrganizations()).then((res: any) => {
      setResponseOrganizations(res?.payload?.data?.data || []);
    });
    setTimeout(() => setLoading(false), 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-4 animate__animated animate__fadeInUp max-h-[46rem] overflow-auto">
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
                name={organization?.name}
                description={
                  organization.name === currentOrganization?.name
                    ? "Active Organization"
                    : "Inactive Organization"
                }
                url={`/${organization?.name}`}
                data={organization}
                selected={organization.name === currentOrganization?.name}
                notSelectable
              />
            );
          })}
        </Fragment>
      )}
    </div>
  );
};

import React, { useContext, useEffect, useState } from "react";
import { SidebarListItem } from "./SidebarListItem";
import { useAppDispatch } from "../../../hooks/redux";
import { SidebarContext } from "../../../context/SidebarContext";

export const OrganizationsList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [responseOrganizations, setResponseOrganizations] = useState<any>([]);
  const dispatch = useAppDispatch();
  const { selectedState, setSelectedState }: any = useContext(SidebarContext);
  useEffect(() => {
    setLoading(true);

    setTimeout(() => setLoading(false), 1000);
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
        <>
          {responseOrganizations.map((organization: any, index: number) => {
            return (
              <SidebarListItem
                type="organization"
                name={organization?.name}
                description={
                  organization?.enterprise
                    ? "Enterprise Organization"
                    : "Standard Organization"
                }
                key={index}
                url={`/${organization?.name}`}
                data={organization}
                selected={
                  organization?.name === selectedState?.organization?.name
                }
              />
            );
          })}
        </>
      )}
    </div>
  );
};

import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { SidebarListItem } from "./SidebarListItem";
import { useAppDispatch } from "../../hooks/redux";
import useSidebar from "../../hooks/useSidebar";

interface IFleetsList {
  reload: boolean;
  setItemCount: any;
}

export default function FleetsList({
  reload,
  setItemCount,
}: IFleetsList): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [responseFleets, setResponseFleets] = useState<any>([]);
  const { selectedState }: any = useSidebar();

  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    // dispatch
    setTimeout(() => setLoading(false), 2000);
  }, [dispatch, reload]);

  return (
    <Fragment>
      {loading ? (
        <img
          className="w-12 mx-auto pt-10"
          src="/svg/general/loading.svg"
          alt="Loading..."
        />
      ) : (
        <Fragment>
          {responseFleets.map((fleet: any, index: number) => {
            return (
              <SidebarListItem
                key={index}
                type="fleet"
                name={fleet?.fleetName}
                description={`Robot Count: ${fleet?.robotCount}`}
                url={`/${fleet?.fleetName}`}
                data={fleet}
                selected={fleet.fleetName === selectedState?.fleet?.fleetName}
              />
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
}
import React, { Fragment, useContext, useEffect, useState } from "react";
import { SidebarListItem } from "./SidebarListItem";
import { useAppDispatch } from "../../../hooks/redux";
import { SidebarContext } from "../../../contexts/SidebarContext";

interface IRoboticsCloudsList {
  reload: boolean;
  setItemCount: any;
}

export const RoboticsCloudsList = ({
  reload,
  setItemCount,
}: IRoboticsCloudsList) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [responseRoboticsClouds, setResponseRoboticsClouds] = useState<any>([]);
  const { selectedState }: any = useContext(SidebarContext);

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
          {responseRoboticsClouds.map((rc: any, index: number) => {
            return (
              <SidebarListItem
                key={index}
                type="roboticsCloud"
                name={rc?.roboticsCloudName}
                description={`Fleet Count: ${rc?.fleetCount}`}
                url={`/${rc?.roboticsCloudName}`}
                data={rc}
                selected={
                  rc.roboticsCloudName ===
                  selectedState?.roboticsCloud?.roboticsCloudName
                }
              />
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
};

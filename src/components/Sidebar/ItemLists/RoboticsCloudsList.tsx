import React, { useContext, useEffect, useState } from "react";
import { SidebarListItem } from "./SidebarListItem";
import { SidebarContext } from "../../../context/SidebarContext";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  getRoboticsClouds,
  getRoboticsCloudsByTeam,
} from "../../../app/RoboticsCloudSlice";
import { RootState } from "../../../app/store";

export const RoboticsCloudList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [responseRoboticsClouds, setResponseRoboticsClouds] = useState<any>([]);
  const { selectedState }: any = useContext(SidebarContext);
  const dispatch = useAppDispatch();
  const { currentOrganization } = useAppSelector(
    (state: RootState) => state.organization
  );

  useEffect(() => {
    setLoading(true);

    if (selectedState?.team) {
      dispatch(
        getRoboticsCloudsByTeam({ teamName: selectedState?.team?.name })
      ).then((res: any) => {
        setResponseRoboticsClouds(res?.payload?.data?.data || []);
      });
    } else {
      dispatch(getRoboticsClouds()).then((res: any) => {
        setResponseRoboticsClouds(res?.payload?.data?.data || []);
      });
    }

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
          {responseRoboticsClouds?.map((roboticscloud: any, index: number) => {
            return (
              <SidebarListItem
                type="roboticscloud"
                name={roboticscloud?.name}
                description={roboticscloud?.name}
                key={index}
                url={`/${currentOrganization.name}/${roboticscloud?.teamName}/${roboticscloud?.name}`}
                data={roboticscloud}
                selected={
                  roboticscloud?.name === selectedState?.roboticscloud?.name
                }
              />
            );
          })}
        </>
      )}
    </div>
  );
};

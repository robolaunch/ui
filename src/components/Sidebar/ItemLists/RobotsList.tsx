import React, { useContext, useEffect, useState } from "react";
import { SidebarListItem } from "./SidebarListItem";
import { SidebarContext } from "../../../context/SidebarContext";
import {
  getRobots,
  getRobotsByFleet,
  getRobotsByRoboticsCloud,
  getRobotsByTeam,
} from "../../../app/RobotSlice";
import { useAppDispatch } from "../../../hooks/redux";

export const RobotsList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [responseRobots, setResponseRobots] = React.useState<any>([]);
  const { selectedState }: any = useContext(SidebarContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);

    if (selectedState?.team) {
      if (selectedState?.roboticscloud) {
        if (selectedState?.fleet) {
          dispatch(
            getRobotsByFleet({
              fleetName: selectedState?.fleet?.name,
              roboticsCloudName: selectedState?.roboticscloud?.name,
              teamName: selectedState?.team?.name,
            })
          ).then((res: any) => {
            setResponseRobots(res?.payload?.data?.data || []);
          });
        } else {
          dispatch(
            getRobotsByRoboticsCloud({
              roboticsCloudName: selectedState?.roboticscloud?.name,
              teamName: selectedState?.team?.name,
            })
          );
        }
      } else {
        dispatch(getRobotsByTeam({ teamName: selectedState?.team?.name })).then(
          (res: any) => {
            setResponseRobots(res?.payload?.data?.data || []);
          }
        );
      }
    } else {
      dispatch(getRobots()).then((res: any) => {
        setResponseRobots(res?.payload?.data?.data || []);
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
          {responseRobots.map((robot: any, index: number) => {
            return (
              <SidebarListItem
                type="robot"
                name={robot?.name}
                description={robot?.name}
                key={index}
                url={`##`}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

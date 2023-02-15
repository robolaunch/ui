import React, { useContext, useEffect, useState } from "react";
import { SidebarListItem } from "./SidebarListItem";
import { SidebarContext } from "../../../context/SidebarContext";
import {
  getRobotsFleet,
  getRobotsOrganization,
  getRobotsRoboticsCloud,
  getRobotsTeam,
} from "../../../app/RobotSlice";
import { useAppDispatch } from "../../../hooks/redux";

export const RobotsList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [responseRobots, setResponseRobots] = React.useState<any>([]);
  const { selectedState }: any = useContext(SidebarContext);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setLoading(true);

    if (selectedState.fleet) {
      dispatch(
        getRobotsFleet({
          fleetProcessId: selectedState.fleet.processId,
        })
      ).then((res: any) => {
        setResponseRobots(res.payload.data.responseRobots.data);
      });
    } else if (selectedState.roboticscloud) {
      dispatch(
        getRobotsRoboticsCloud({
          roboticsCloudProcessId: selectedState.roboticscloud.processId,
        })
      ).then((res: any) => {
        setResponseRobots(res.payload.data.responseRobots.data);
      });
    } else if (selectedState.team) {
      dispatch(
        getRobotsTeam({
          teamProcessId: selectedState.team.processId,
        })
      ).then((res: any) => {
        setResponseRobots(res.payload.data.responseRobots.data);
      });
    } else {
      dispatch(
        getRobotsOrganization({
          organizationProcessId: selectedState.organization.processId,
        })
      ).then((res: any) => {
        setResponseRobots(res.payload.data.responseRobots.data);
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

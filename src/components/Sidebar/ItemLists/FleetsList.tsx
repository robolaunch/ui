import React, { useContext, useEffect, useState } from "react";
import { SidebarListItem } from "./SidebarListItem";
import { SidebarContext } from "../../../context/SidebarContext";
import { useAppDispatch } from "../../../hooks/redux";
import { getRoboticsCloudsOrganization } from "../../../app/RoboticsCloudSlice";
import {
  getFleetsOrganization,
  getFleetsRoboticsCloud,
  getFleetsTeam,
} from "../../../app/FleetSlice";

export const FleetsList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [responseFleets, setResponseFleets] = React.useState<any>([
    { name: "FleetName1" },
    { name: "FleetName2" },
    { name: "FleetName3" },
  ]);

  const { selectedState }: any = useContext(SidebarContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    if (selectedState?.team) {
      dispatch(
        getFleetsTeam({
          organization: { name: selectedState.organization.name },
          teamId: selectedState.team.id,
        })
      ).then((res: any) => {
        setResponseFleets(res.payload.data.responseFleets.data);
      });
    } else if (selectedState?.roboticscloud) {
      dispatch(
        getFleetsRoboticsCloud({
          roboticsCloudProcessId: selectedState.roboticscloud.processId,
        })
      ).then((res: any) => {
        setResponseFleets(res.payload.data.responseFleets.data);
      });
    } else {
      dispatch(
        getFleetsOrganization({
          organization: {
            name: selectedState?.organization?.name,
          },
        })
      ).then((res: any) => {
        setResponseFleets(res.payload.data.responseFleets.data);
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
          {responseFleets.map((fleet: any, index: number) => {
            return (
              <SidebarListItem
                type="fleet"
                name={fleet?.name}
                description={fleet?.name}
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

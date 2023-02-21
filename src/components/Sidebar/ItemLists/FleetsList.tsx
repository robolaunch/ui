import React, { useContext, useEffect, useState } from "react";
import { SidebarListItem } from "./SidebarListItem";
import { SidebarContext } from "../../../context/SidebarContext";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  getFleets,
  getFleetsByRoboticsCloud,
  getFleetsByTeam,
} from "../../../app/FleetSlice";
import { RootState } from "../../../app/store";

export const FleetsList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [responseFleets, setResponseFleets] = React.useState<any>([]);
  const { currentOrganization } = useAppSelector(
    (state: RootState) => state.organization
  );

  const { selectedState }: any = useContext(SidebarContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);

    if (selectedState?.team) {
      if (selectedState?.roboticscloud) {
        dispatch(
          getFleetsByRoboticsCloud({
            teamName: selectedState?.team?.name,
            roboticsCloudName: selectedState?.roboticscloud?.name,
          })
        ).then((res: any) => {
          setResponseFleets(res?.payload?.data?.data || []);
        });
      } else {
        dispatch(getFleetsByTeam({ teamName: selectedState?.team?.name })).then(
          (res: any) => {
            setResponseFleets(res?.payload?.data?.data || []);
          }
        );
      }
    } else {
      dispatch(getFleets()).then((res: any) => {
        setResponseFleets(res?.payload?.data?.data || []);
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
                url={`${currentOrganization.name}/${fleet?.teamName}/${fleet?.roboticsCloudName}/${fleet?.name}`}
                data={fleet}
                selected={fleet?.name === selectedState?.fleet?.name}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

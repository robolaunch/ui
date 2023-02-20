import React, { useContext, useEffect, useState } from "react";
import { SidebarListItem } from "./SidebarListItem";
import { SidebarContext } from "../../../context/SidebarContext";
import { useAppDispatch } from "../../../hooks/redux";

export const RoboticsCloudList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [responseRoboticsClouds, setResponseRoboticsClouds] = useState<any>([]);
  const { selectedState }: any = useContext(SidebarContext);
  const dispatch = useAppDispatch();

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
          {responseRoboticsClouds?.map((roboticscloud: any, index: number) => {
            return (
              <SidebarListItem
                type="roboticscloud"
                name={roboticscloud?.name}
                description={roboticscloud?.name}
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

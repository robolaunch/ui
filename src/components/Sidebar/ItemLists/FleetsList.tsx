import React, { useContext, useEffect, useState } from "react";
import { SidebarListItem } from "./SidebarListItem";
import { SidebarContext } from "../../../context/SidebarContext";
import { useAppDispatch } from "../../../hooks/redux";

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

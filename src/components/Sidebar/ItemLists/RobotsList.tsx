import React, { useEffect, useState } from "react";
import { SidebarListItem } from "./SidebarListItem";

export const RobotsList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [responseRobots, setResponseRobots] = React.useState<any>([
    { name: "RobotName1" },
    { name: "RobotName2" },
    { name: "RobotName2" },
  ]);

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

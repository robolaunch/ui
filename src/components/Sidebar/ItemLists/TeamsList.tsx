import React, { useContext, useEffect, useState } from "react";
import { SidebarListItem } from "./SidebarListItem";
import { useAppDispatch } from "../../../hooks/redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { SidebarContext } from "../../../context/SidebarContext";
import { getTeams } from "../../../app/TeamSlice";

export const TeamsList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [responseTeams, setResponseTeams] = useState<any>([]);
  const { selectedState, setSelectedState }: any = useContext(SidebarContext);
  const dispatch = useAppDispatch();
  const { currentOrganization } = useSelector(
    (state: RootState) => state.organization
  );

  useEffect(() => {
    setLoading(true);

    dispatch(getTeams()).then((res: any) => {
      setResponseTeams(res?.payload?.data?.data || []);
    });

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
          {responseTeams.map((team: any, index: number) => {
            return (
              <SidebarListItem
                type="team"
                name={team?.name}
                description={team?.users?.length + " members"}
                key={index}
                url={"/" + currentOrganization.name + "/" + team?.name}
                data={team}
                selected={team?.name === selectedState?.team?.name}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

import { useContext } from "react";
import { IuseMission } from "../interfaces/hook/mission.hook.interface";
import { MissionContext } from "../contexts/MissionContext";

const useMission = () => {
  const useMission: IuseMission = useContext(MissionContext);

  return useMission;
};

export default useMission;

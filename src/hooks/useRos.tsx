import { useContext } from "react";
import { RosContext } from "../contexts/RosContext";

interface IuseRos {
  scale: number;
  rosMap: {
    map: string;
    meta: {
      originX_YAML: number;
      originY_YAML: number;
      resolution_YAML: number;
      mapWidthMeter: number;
      mapHeightMeter: number;
      mapWidthPixel: number;
      mapHeightPixel: number;
    };
  };
}

const useRos = () => {
  const useRos: IuseRos = useContext(RosContext);

  return useRos;
};

export default useRos;

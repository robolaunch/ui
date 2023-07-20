import { useContext } from "react";
import { TrialContext } from "../contexts/TrialContext";
import { IuseTrial } from "../interfaces/useTrialInterfaces";

const useTrial = () => {
  const useTrial: IuseTrial = useContext(TrialContext);

  return useTrial;
};

export default useTrial;

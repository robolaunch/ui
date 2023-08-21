import { useContext } from "react";
import { IuseProfile } from "../interfaces/profileInterfaces";
import { ProfileContext } from "../contexts/ProfileContext";

const useProfile = () => {
  const useProfile: IuseProfile = useContext(ProfileContext);

  return useProfile;
};

export default useProfile;

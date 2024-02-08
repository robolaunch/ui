import { useContext } from "react";
import { ProfileContext } from "../contexts/ProfileContext";
import { IuseProfile } from "../interfaces/hook/profile.hook.interface";

const useProfile = () => {
  const useProfile: IuseProfile = useContext(ProfileContext);

  return useProfile;
};

export default useProfile;

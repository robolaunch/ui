import { Itabs, ProfileActiveTab } from "../global/profile.interface";

export interface IuseProfile {
  activeTab: ProfileActiveTab;
  setActiveTab: React.Dispatch<React.SetStateAction<ProfileActiveTab>>;
  tabs: Itabs;
}

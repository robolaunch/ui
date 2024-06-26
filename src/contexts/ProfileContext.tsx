import {
  Itabs,
  ProfileActiveTab,
} from "../interfaces/global/profile.interface";
import { createContext, useState } from "react";

export const ProfileContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [activeTab, setActiveTab] = useState<ProfileActiveTab>("Overview");

  const tabs: Itabs = [
    "Overview",
    "Profile Info",
    // "Connected Apps",
    // "Email Preferences",
    // "Notifications",
    "Change Password",
    "Deactivate Account",
  ];

  return (
    <ProfileContext.Provider
      value={{
        tabs,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

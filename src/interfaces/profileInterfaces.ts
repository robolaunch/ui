export interface IuseProfile {
  activeTab: ProfileActiveTab;
  setActiveTab: React.Dispatch<React.SetStateAction<ProfileActiveTab>>;
  tabs: Itabs;
}

export type Itabs = [
  "Overview",
  "Profile Info",
  "Connected Apps",
  "Email Preferences",
  "Notifications",
  "Change Password",
  "Deactivate Account"
];

export type ProfileActiveTab =
  | "Overview"
  | "Profile Info"
  | "Connected Apps"
  | "Email Preferences"
  | "Notifications"
  | "Change Password"
  | "Deactivate Account";

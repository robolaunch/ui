import React, { ReactElement, useState } from "react";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import ProfileConnectedApps from "../../components/ProfileConnectedApps/ProfileConnectedApps";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import ProfileEmailPreferances from "../../components/ProfileEmailPreferances/ProfileEmailPreferances";
import ProfileDeactive from "../../components/ProfileDeactive/ProfileDeactive";
import ProfileNotifications from "../../components/ProfileNotifications/ProfileNotifications";
import ProfileChangePassword from "../../components/ProfileChangePassword/ProfileChangePassword";
import ProfileOverview from "../../components/ProfileOverview/ProfileOverview";

export default function Profile(): ReactElement {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="grid grid-cols-2 gap-6">
      <ProfileHeader
        className="col-span-2"
        activeTab={activeTab}
        handleChangeActiveTab={setActiveTab}
      />
      {(() => {
        switch (activeTab) {
          case "Overview":
            return <ProfileOverview />;
          case "Profile Info":
            return <ProfileInfo className="col-span-2" />;
          case "Connected Apps":
            return <ProfileConnectedApps className="col-span-2" />;
          case "Email Preferances":
            return <ProfileEmailPreferances className="col-span-2" />;
          case "Notifications":
            return <ProfileNotifications className="col-span-2" />;
          case "Change Password":
            return <ProfileChangePassword className="col-span-2" />;
          case "Deactive Account":
            return <ProfileDeactive className="col-span-2" />;
        }
      })()}
    </div>
  );
}

import { Fragment, ReactElement } from "react";
import ProfileChangePassword from "../components/ProfileChangePassword/ProfileChangePassword";
import ProfileDeactivate from "../components/ProfileDeactivate/ProfileDeactivate";
import ProfileOverview from "../components/ProfileOverview/ProfileOverview";
import ProfileInfo from "../components/ProfileInfo/ProfileInfo";
import useProfile from "../hooks/useProfile";

export default function ProfileSubPageLayout(): ReactElement {
  const { activeTab } = useProfile();

  return (
    <Fragment>
      {(() => {
        switch (activeTab) {
          case "Overview":
            return <ProfileOverview />;
          case "Profile Info":
            return <ProfileInfo className="col-span-2" />;
          // case "Connected Apps":
          //   return <ProfileConnectedApps className="col-span-2" />;
          // case "Email Preferences":
          //   return <ProfileEmailPreferances className="col-span-2" />;
          // case "Notifications":
          //   return <ProfileNotifications className="col-span-2" />;
          case "Change Password":
            return <ProfileChangePassword className="col-span-2" />;
          case "Deactivate Account":
            return <ProfileDeactivate className="col-span-2" />;
        }
      })()}
    </Fragment>
  );
}

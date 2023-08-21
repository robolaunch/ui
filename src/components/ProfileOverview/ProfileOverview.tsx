import React, { Fragment, ReactElement } from "react";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import ProfileChangePassword from "../ProfileChangePassword/ProfileChangePassword";
import ProfileEmailPreferances from "../ProfileEmailPreferances/ProfileEmailPreferances";
import ProfileConnectedApps from "../ProfileConnectedApps/ProfileConnectedApps";
import ProfileNotifications from "../ProfileNotifications/ProfileNotifications";
import ProfileDeactive from "../ProfileDeactivate/ProfileDeactivate";

export default function ProfileOverview(): ReactElement {
  return (
    <Fragment>
      <div className="col-span-1 flex flex-col gap-6">
        <ProfileInfo className="col-span-1" />
        <ProfileChangePassword className="col-span-1" />
        <ProfileEmailPreferances className="col-span-1" />
      </div>
      <div className="col-span-1 flex flex-col gap-6">
        <ProfileConnectedApps className="col-span-1" />
        <ProfileNotifications className="col-span-1" />
        <ProfileDeactive className="col-span-1" />
      </div>
    </Fragment>
  );
}

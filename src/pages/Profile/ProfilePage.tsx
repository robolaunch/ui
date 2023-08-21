import React, { ReactElement } from "react";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import ProfileSubPageLayout from "../../layouts/ProfileSubPageLayout";

export default function Profile(): ReactElement {
  return (
    <div className="grid grid-cols-2 gap-6">
      <ProfileHeader />
      <ProfileSubPageLayout />
    </div>
  );
}

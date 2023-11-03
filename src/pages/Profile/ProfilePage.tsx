import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import ProfileSubPageLayout from "../../layouts/ProfileSubPageLayout";
import ProfileContext from "../../contexts/ProfileContext";
import React, { ReactElement } from "react";

export default function Profile(): ReactElement {
  return (
    <ProfileContext>
      <div className="grid grid-cols-2 gap-6">
        <ProfileHeader />
        <ProfileSubPageLayout />
      </div>
    </ProfileContext>
  );
}

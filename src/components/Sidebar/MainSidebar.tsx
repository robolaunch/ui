import React, { FC } from "react";
import { SideBarMenuItem } from "./SideBarMenuItem";

export const MainSidebar: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <SideBarMenuItem type="organization" />
      <SideBarMenuItem type="roboticscloud" />
      <SideBarMenuItem type="fleet" />
      <SideBarMenuItem type="robot" />
    </div>
  );
};

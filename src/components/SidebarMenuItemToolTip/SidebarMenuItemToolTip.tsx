import React, { ReactElement } from "react";

interface ISideBarMenuItemToolTip {
  title: string;
  description: string | undefined;
}

export default function SidebarMenuItemToolTip({
  title,
  description,
}: ISideBarMenuItemToolTip): ReactElement {
  return (
    <div
      className={`absolute top-2 flex flex-col gap-1 py-1.5 px-2.5 text-[0.66rem] rounded text-layer-light-100 z-50 border border-layer-light-500 bg-layer-dark-500 opacity-90 animate__animated animate__fadeIn left-14 ${
        description && description?.length > 42 ? "w-64" : "w-max"
      }`}
    >
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs">{description}</div>
    </div>
  );
}

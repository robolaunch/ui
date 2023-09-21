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
      className={`animate__animated animate__fadeIn absolute left-14 top-2 z-50 flex flex-col gap-1 rounded border border-layer-light-500 bg-layer-dark-500 px-2.5 py-1.5 text-[0.66rem] text-layer-light-100 opacity-90 ${
        description && description?.length > 42 ? "w-64" : "w-max"
      }`}
    >
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs">{description}</div>
    </div>
  );
}

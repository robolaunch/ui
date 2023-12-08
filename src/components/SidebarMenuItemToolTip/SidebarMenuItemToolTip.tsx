import { ReactElement } from "react";

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
      className={`animate__animated animate__fadeIn border-light-500 text-light-100 bg-light-500 absolute left-14 top-2 z-50 flex flex-col gap-1 rounded border px-2.5 py-1.5 text-[0.66rem] opacity-90 ${
        description && description?.length > 42 ? "w-64" : "w-max"
      }`}
    >
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs">{description}</div>
    </div>
  );
}

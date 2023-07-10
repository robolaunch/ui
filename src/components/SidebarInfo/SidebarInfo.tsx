import React, { ReactElement } from "react";

interface ISidebarInfo {
  text: string;
  component?: ReactElement;
}

export default function SidebarInfo({
  text,
  component,
}: ISidebarInfo): ReactElement {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2">
      <div className="text-base font-bold text-layer-dark-100 text-center animate__animated animate__fadeIn">
        {text}
      </div>
      {component && <div>{component}</div>}
    </div>
  );
}

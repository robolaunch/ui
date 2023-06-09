import React, { ReactElement } from "react";

interface ISidebarInfo {
  text: string;
}

export default function SidebarInfo({ text }: ISidebarInfo): ReactElement {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="text-base font-bold text-layer-dark-100 text-center animate__animated animate__fadeIn">
        {text}
      </div>
    </div>
  );
}

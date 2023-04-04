import React, { ReactElement } from "react";
import RemoteDesktopTabs from "../../../../components/RemoteDesktopTabs/RemoteDesktopTabs.tsx";
import CardLayout from "../../../../layouts/CardLayout";
import RemoteDesktopScene from "../../../../components/RemoteDesktopScene/RemoteDesktopScene.tsx";

export default function RemoteDesktop(): ReactElement {
  return (
    <CardLayout>
      <div className="grid grid-cols-12">
        <div className="col-span-7 md:col-span-8 lg:col-span-9 2xl:col-span-10 relative flex justify-center  bg-layer-dark-900 min-h-[52rem]">
          <RemoteDesktopScene isControllerActive={true} />
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-3 2xl:col-span-2 flex flex-col">
          <RemoteDesktopTabs />
        </div>
      </div>
    </CardLayout>
  );
}

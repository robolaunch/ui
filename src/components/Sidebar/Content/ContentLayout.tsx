import React, { ReactNode, useContext, useState } from "react";
import { OrganizationsList } from "../ItemLists/OrganizationsList";
import { RoboticsCloudList } from "../ItemLists/RoboticsCloudsList";
import { FleetsList } from "../ItemLists/FleetsList";
import { RobotsList } from "../ItemLists/RobotsList";
import { CreateOrganizationForm } from "../CreateForms/CreateOrganizationForm";
import { CreateRoboticsCloudForm } from "../CreateForms/CreateRoboticsCloudForm";
import { CreateFleetForm } from "../CreateForms/CreateFleetForm";
import { CreateRobotForm } from "../CreateForms/CreateRobotForm";

import { SidebarContext } from "../../../contexts/SidebarContext";
import Button from "../../Button/Button";
import FilteredTags from "../FilteredTags";

interface ContentLayoutProps {
  children?: ReactNode;
}

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  const { sidebarState, setSidebarState }: any = useContext(SidebarContext);
  const [reload, setReload] = useState<boolean>(false);

  const handleButtonText = () => {
    if (sidebarState?.isCreateMode) {
      return `Cancel`;
    } else {
      return `Create ${sidebarState?.page}`;
    }
  };

  const handleButtonClassNames = () => {
    if (sidebarState?.isCreateMode) {
      return `mt-3 bg-layer-light-50 text-layer-primary-700 border border-layer-primary-700 hover:text-layer-light-50`;
    }
  };

  return (
    <div className="fixed flex flex-col justify-between left-20 w-[33rem] h-full bg-layer-light-50 shadow-2xl animate__animated animate__fadeInLeftBig animate__fast p-8 z-[32]">
      <div
        className={`flex gap-4 items-center ${
          sidebarState?.isCreateMode ? "pb-16" : " pb-4"
        }`}
      >
        <h2 className="text-3xl font-semibold">{sidebarState?.page + "s"}</h2>
        <span className="bg-layer-primary-300 px-3 py-1 rounded-lg">{0}</span>
        <i
          onClick={() => {
            setReload(!reload);
          }}
          className="pi pi-refresh text-lightLayer-700 hover:scale-90 active:scale-75 cursor-pointer transition-all duration-500 "
          style={{ fontSize: "1rem" }}
        ></i>
      </div>
      <FilteredTags />
      <div className="h-full overflow-auto scrollbar-hide mb-4">
        {(() => {
          switch (sidebarState?.page) {
            case "organization":
              if (sidebarState?.isCreateMode) {
                return <CreateOrganizationForm />;
              }
              return <OrganizationsList reload={reload} />;
            case "roboticscloud":
              if (sidebarState?.isCreateMode) {
                return <CreateRoboticsCloudForm />;
              }
              return <RoboticsCloudList />;
            case "fleet":
              if (sidebarState?.isCreateMode) {
                return <CreateFleetForm />;
              }
              return <FleetsList />;
            case "robot":
              if (sidebarState?.isCreateMode) {
                return <CreateRobotForm />;
              }
              return <RobotsList />;
          }
        })()}
      </div>
      <Button
        className={handleButtonClassNames()}
        text={handleButtonText()}
        onClick={() => {
          if (sidebarState?.isCreateMode) {
            setSidebarState((prev: any) => ({ ...prev, isCreateMode: false }));
          } else {
            setSidebarState((prev: any) => ({ ...prev, isCreateMode: true }));
          }
        }}
      />
    </div>
  );
};

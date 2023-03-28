import React, { ReactNode, useContext, useEffect, useState } from "react";
import { OrganizationsList } from "../ItemLists/OrganizationsList";
import { RoboticsCloudsList } from "../ItemLists/RoboticsCloudsList";
import { FleetsList } from "../ItemLists/FleetsList";
import { RobotsList } from "../ItemLists/RobotsList";
import { CreateOrganizationForm } from "../CreateForms/CreateOrganizationForm";
import { CreateRoboticsCloudForm } from "../CreateForms/CreateRoboticsCloudForm";
import { CreateFleetForm } from "../CreateForms/CreateFleetForm";
import { CreateRobotForm } from "../CreateForms/CreateRobotForm";
import stringCapitalization from "../../../helpers/stringCapitalization";
import { SidebarContext } from "../../../contexts/SidebarContext";
import Button from "../../Button/Button";
import FilteredTags from "../FilteredTags";

interface ContentLayoutProps {
  children?: ReactNode;
}

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  const { sidebarState, setSidebarState }: any = useContext(SidebarContext);
  const [reload, setReload] = useState<boolean>(false);
  const [itemCount, setItemCount] = useState<number>(0);

  useEffect(() => {
    setItemCount(0);
  }, [sidebarState]);

  const handleButtonText = () => {
    if (sidebarState?.isCreateMode) {
      return `Cancel`;
    } else {
      return `Create ${sidebarState?.page}`;
    }
  };

  const handleButtonClassNames = () => {
    if (sidebarState?.isCreateMode) {
      return `!bg-layer-primary-100 hover:!bg-layer-primary-200 mt-3 bg-layer-light-50 text-layer-primary-700 border border-layer-primary-700 transition-all duration-500`;
    }
  };

  return (
    <div className="fixed flex flex-col justify-between left-20 w-[33rem] h-full bg-layer-light-50 shadow-2xl animate__animated animate__fadeInLeftBig animate__fast p-8 z-[32]">
      <div
        className={`flex gap-4 items-center ${
          sidebarState?.isCreateMode ? "pb-8" : " pb-4"
        }`}
      >
        <h2 className="text-2xl font-semibold">
          {stringCapitalization(sidebarState?.page + "s")}
        </h2>
        <span className="bg-layer-primary-300 px-2.5 py-0.5 rounded-lg">
          {itemCount}
        </span>
        <i
          onClick={() => {
            setReload(!reload);
          }}
          className="pi pi-refresh text-lightLayer-700 hover:scale-90 active:scale-75 cursor-pointer transition-all duration-500 "
          style={{ fontSize: "1rem" }}
        ></i>
      </div>
      {!sidebarState?.isCreateMode && <FilteredTags />}
      <div
        className={`h-full overflow-auto scrollbar-hide mb-4 ${
          sidebarState?.page && "py-6 px-2"
        }`}
      >
        <div className="h-full flex flex-col gap-4">
          {(() => {
            switch (sidebarState?.page) {
              case "organization":
                if (sidebarState?.isCreateMode) {
                  return <CreateOrganizationForm />;
                }
                return (
                  <OrganizationsList
                    reload={reload}
                    setItemCount={setItemCount}
                  />
                );
              case "roboticscloud":
                if (sidebarState?.isCreateMode) {
                  return <CreateRoboticsCloudForm />;
                }
                return (
                  <RoboticsCloudsList
                    reload={reload}
                    setItemCount={setItemCount}
                  />
                );
              case "fleet":
                if (sidebarState?.isCreateMode) {
                  return <CreateFleetForm />;
                }
                return (
                  <FleetsList reload={reload} setItemCount={setItemCount} />
                );
              case "robot":
                if (sidebarState?.isCreateMode) {
                  return <CreateRobotForm />;
                }
                return (
                  <RobotsList reload={reload} setItemCount={setItemCount} />
                );
            }
          })()}
        </div>
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

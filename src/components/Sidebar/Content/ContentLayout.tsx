import React, { ReactNode, useContext } from "react";

import { OrganizationsList } from "../ItemLists/OrganizationsList";
import { TeamsList } from "../ItemLists/TeamsList";
import { RoboticsCloudList } from "../ItemLists/RoboticsCloudsList";
import { FleetsList } from "../ItemLists/FleetsList";
import { RobotsList } from "../ItemLists/RobotsList";

import { CreateOrganizationForm } from "../CreateForms/CreateOrganizationForm";
import { CreateTeamForm } from "../CreateForms/CreateTeamForm";
import { CreateRoboticsCloudForm } from "../CreateForms/CreateRoboticsCloudForm";
import { CreateFleetForm } from "../CreateForms/CreateFleetForm";
import { CreateRobotForm } from "../CreateForms/CreateRobotForm";

import { SidebarContext } from "../../../context/SidebarContext";
import { Button } from "../../Button/Button";
interface ContentLayoutProps {
  children?: ReactNode;
}

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  const { sidebarState, setSidebarState }: any = useContext(SidebarContext);

  const handleButtonText = () => {
    if (sidebarState?.isCreateMode) {
      return `Cancel`;
    } else {
      return `Create ${sidebarState?.page}`;
    }
  };

  return (
    <div className="absolute flex flex-col justify-between left-24 w-[36rem] h-screen bg-lightLayer-100 shadow-2xl animate__animated animate__fadeInLeftBig animate__fast p-8 z-[3]">
      <div className="animate__animated animate__fadeInLeftBig">
        <div
          className={`flex gap-4 items-center ${
            sidebarState?.isCreateMode ? "pb-16" : " pb-10"
          }`}
        >
          <h2 className="text-3xl font-semibold">{sidebarState?.page + "s"}</h2>
          <span className="bg-secondaryLayers-300 px-3 py-1 rounded-lg">
            {0}
          </span>
          <i
            className="pi pi-refresh text-lightLayer-700"
            style={{ fontSize: "1rem" }}
          ></i>
        </div>
        {(() => {
          switch (sidebarState?.page) {
            case "organization":
              if (sidebarState?.isCreateMode) {
                return <CreateOrganizationForm />;
              }
              return <OrganizationsList />;
            case "team":
              if (sidebarState?.isCreateMode) {
                return <CreateTeamForm />;
              }
              return <TeamsList />;
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

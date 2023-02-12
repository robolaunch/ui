import React, { ReactNode, useContext } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import { stringCapitalize } from "@ricardojrmcom/string-capitalize";
import { RobotsList } from "../ItemLists/RobotsList";
import { Button } from "../../Button/Button";
import { FleetsList } from "../ItemLists/FleetsList";
import { OrganizationsList } from "../ItemLists/OrganizationsList";
import { TeamsList } from "../ItemLists/TeamsList";
import { RoboticsCloudList } from "../ItemLists/RoboticsCloudsList";
import { CreateOrganizationForm } from "../CreateForms/CreateOrganizationForm";
import { CreateTeamForm } from "../CreateForms/CreateTeamForm";
interface ContentLayoutProps {
  children?: ReactNode;
}

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  const { sidebarState, setSidebarState }: any = useContext(SidebarContext);

  const handleButtonText = () => {
    if (sidebarState?.mode) {
      return `Cancel`;
    } else {
      return `Create ${stringCapitalize(sidebarState?.page, true)}`;
    }
  };

  return (
    <div className="absolute flex flex-col justify-between left-24 w-[36rem] h-screen bg-lightLayer-100 shadow-2xl animate__animated animate__fadeInLeftBig animate__fast p-8">
      <div className="animate__animated animate__fadeInLeftBig">
        <div
          className={`flex gap-4 items-center ${
            sidebarState?.mode ? "pb-16" : " pb-10"
          }`}
        >
          <h2 className="text-3xl font-semibold">
            {stringCapitalize(sidebarState?.page + "s", true)}
          </h2>
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
              if (sidebarState?.mode) {
                return <CreateOrganizationForm />;
              }
              return <OrganizationsList />;
            case "team":
              if (sidebarState?.mode) {
                return <CreateTeamForm />;
              }
              return <TeamsList />;
            case "roboticscloud":
              return <RoboticsCloudList />;
            case "fleet":
              return <FleetsList />;
            case "robot":
              return <RobotsList />;
          }
        })()}
      </div>
      <Button
        text={handleButtonText()}
        onClick={() => {
          if (sidebarState?.mode) {
            setSidebarState((prev: any) => ({ ...prev, mode: false }));
          } else {
            setSidebarState((prev: any) => ({ ...prev, mode: true }));
          }
        }}
      />
    </div>
  );
};

import React, { Fragment, ReactNode, useEffect, useState } from "react";
import OrganizationsList from "../components/SidebarLists/OrganizationsList";
import RoboticsCloudsList from "../components/SidebarLists/RoboticsCloudsList";
import FleetsList from "../components/SidebarLists/FleetsList";
import RobotsList from "../components/SidebarLists/RobotsList";
import CreateOrganizationForm from "../components/CreateForms/CreateOrganizationForm";
import CreateRoboticsCloudForm from "../components/CreateForms/CreateRoboticsCloudForm";
import CreateFleetForm from "../components/CreateForms/CreateFleetForm";
import CreateRobotLayout from "./CreateRobotLayout";
import stringCapitalization from "../helpers/stringCapitalization";
import Button from "../components/Button/Button";
import FilteredTags from "../components/FilteredTags/FilteredTags";
import useSidebar from "../hooks/useSidebar";
import CreateCloudInstancesForm from "../components/CreateForms/CreateInstancesForm";
import InstancesList from "../components/SidebarLists/InstancesList";
import { toast } from "sonner";

interface IContentLayout {
  children?: ReactNode;
}

export const ContentLayout = ({ children }: IContentLayout) => {
  const { sidebarState, setSidebarState, selectedState } = useSidebar();
  const [reload, setReload] = useState<boolean>(false);
  const [itemCount, setItemCount] = useState<number>(0);

  useEffect(() => {
    setItemCount(0);
  }, [sidebarState]);

  function buttonTextGenerator() {
    switch (sidebarState?.isCreateMode) {
      case true:
        return `Cancel ${(() => {
          if (sidebarState?.page === "roboticscloud") {
            return "Robotics Cloud";
          }
          if (sidebarState?.page === "instance") {
            return "Cloud Instance";
          }
          return stringCapitalization({
            str: sidebarState?.page as string,
          });
        })()} creation`;
      case false:
        return `Create ${(() => {
          if (sidebarState?.page === "roboticscloud") {
            return "Robotics Cloud";
          }
          if (sidebarState?.page === "instance") {
            return "Cloud Instance";
          }
          return stringCapitalization({
            str: sidebarState?.page as string,
          });
        })()}`;
    }
  }

  function titleGenerator() {
    if (sidebarState?.page === "roboticscloud") {
      return "Robotics Clouds";
    }
    if (sidebarState?.page === "instance") {
      return "Instances";
    }

    switch (sidebarState?.page) {
      case "robot":
        return sidebarState?.isCreateMode ? "Robot Details" : "Robots";
      case "workspacesmanager":
        return "Robot Workspace Configuration";
      case "buildsmanager":
        return "Robot Build Configuration";
    }

    return stringCapitalization({
      str: sidebarState?.page + "s",
    });
  }

  function handleCreateButton() {
    if (sidebarState?.isCreateMode) {
      setSidebarState((prev: any) => ({
        ...prev,
        isCreateMode: false,
      }));
    } else {
      switch (sidebarState?.page) {
        case "roboticscloud":
          if (!selectedState?.organization) {
            setSidebarState((prev: any) => ({ ...prev, page: "organization" }));
            return toast.error(
              "If you want to create a robotics cloud, you need to select an organization first."
            );
          }
          break;
        case "instance":
          if (!selectedState?.organization || !selectedState?.roboticsCloud) {
            setSidebarState((prev: any) => ({
              ...prev,
              page: !selectedState?.organization
                ? "organization"
                : "robotics cloud",
            }));
            return toast.error(
              `If you want to create a cloud instance, you need to select a ${
                !selectedState?.organization ? "organization" : "robotics cloud"
              } first.`
            );
          }
          break;
        case "fleet":
          if (
            !selectedState?.organization ||
            !selectedState?.roboticsCloud ||
            !selectedState?.instance
          ) {
            setSidebarState((prev: any) => ({
              ...prev,
              page: !selectedState?.organization
                ? "organization"
                : !selectedState?.roboticsCloud
                ? "robotics cloud"
                : "instance",
            }));
            return toast.error(
              `
              If you want to create a fleet, you need to select a ${
                !selectedState?.organization
                  ? "organization"
                  : !selectedState?.roboticsCloud
                  ? "robotics cloud"
                  : "instance"
              } first.
              `
            );
          }
      }

      setSidebarState((prev: any) => ({ ...prev, isCreateMode: true }));
    }
  }

  return (
    <div className="fixed flex flex-col justify-between left-20 w-[40rem] h-full bg-layer-light-50 shadow-2xl animate__animated animate__fadeInLeftBig animate__fast p-8 z-[32]">
      <div
        className={`flex gap-4 items-center ${
          sidebarState?.isCreateMode ? "pb-8" : " pb-4"
        }`}
      >
        <h2 className="text-[1.75rem] font-semibold">{titleGenerator()}</h2>
        {!sidebarState?.isCreateMode && (
          <Fragment>
            <span className="bg-layer-primary-300 px-2.5 py-0.5 rounded-lg">
              {itemCount}
            </span>
            <i
              onClick={() => {
                setReload(!reload);
              }}
              className="pi pi-refresh text-lightLayer-700 hover:scale-90 active:scale-75 cursor-pointer transition-all duration-500 "
              style={{ fontSize: "1rem" }}
            />
          </Fragment>
        )}
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

              case "instance":
                if (sidebarState?.isCreateMode) {
                  return <CreateCloudInstancesForm />;
                }
                return (
                  <InstancesList reload={reload} setItemCount={setItemCount} />
                );

              case "fleet":
                if (sidebarState?.isCreateMode) {
                  return <CreateFleetForm />;
                }
                return (
                  <FleetsList reload={reload} setItemCount={setItemCount} />
                );
              case "robot":
              case "workspacesmanager":
              case "buildsmanager":
                if (sidebarState?.isCreateMode) {
                  return <CreateRobotLayout />;
                }
                return (
                  <RobotsList reload={reload} setItemCount={setItemCount} />
                );
            }
          })()}
        </div>
      </div>
      <Button
        className={`${
          sidebarState?.isCreateMode &&
          "!bg-layer-light-50 !text-layer-primary-700 hover:!bg-layer-primary-100 border border-layer-primary-700 mt-3 capitalize transition-all duration-500"
        }`}
        text={buttonTextGenerator()}
        onClick={() => handleCreateButton()}
      />
    </div>
  );
};

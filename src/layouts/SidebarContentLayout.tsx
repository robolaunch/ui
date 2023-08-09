import React, { ReactElement, useEffect, useState } from "react";
import WorkspaceUpdateForm from "../components/UpdateRobotWorkspacesForm/UpdateRobotWorkspacesForm";
import UpdateRobotLaunchsForm from "../components/UpdateRobotLaunchsForm/UpdateRobotLaunchsForm";
import UpdateRobotDetailsForm from "../components/UpdateRobotDetailsForm/UpdateRobotDetailsForm";
import ConnectPhysicalInstanceForm from "../components/CreateForms/ConnectPhysicalInstanceForm";
import UpdateRobotBuildsForm from "../components/UpdateRobotBuildsForm/UpdateRobotBuildsForm";
import SidebarContentHeader from "../components/SidebarContentHeader/SidebarContentHeader";
import CreateRoboticsCloudForm from "../components/CreateForms/CreateRoboticsCloudForm";
import CreateOrganizationForm from "../components/CreateForms/CreateOrganizationForm";
import CreateCloudInstancesForm from "../components/CreateForms/CreateCloudInstancesForm";
import PhysicalInstancesList from "../components/SidebarLists/PhysicalInstancesList";
import CloudInstancesList from "../components/SidebarLists/CloudInstancesList";
import RoboticsCloudsList from "../components/SidebarLists/RoboticsCloudsList";
import OrganizationsList from "../components/SidebarLists/OrganizationsList";
import CreateFleetForm from "../components/CreateForms/CreateFleetForm";
import { stringCapitalization } from "../functions/GeneralFunctions";
import FilteredTags from "../components/FilteredTags/FilteredTags";
import RobotsList from "../components/SidebarLists/RobotsList";
import FleetsList from "../components/SidebarLists/FleetsList";
import useRobot from "../hooks/useRobot";
import CreateRobotLayout from "./CreateRobotLayout";
import Button from "../components/Button/Button";
import { useParams } from "react-router-dom";
import useMain from "../hooks/useMain";
import { toast } from "sonner";
import { envOnPremise } from "../helpers/envProvider";

export default function SidebarContentLayout(): ReactElement {
  const { sidebarState, setSidebarState, selectedState } = useMain();
  const [loading, setLoading] = useState<boolean>(false);
  const [itemCount, setItemCount] = useState<number>(0);
  const [reload, setReload] = useState<boolean>(false);
  const { handleResetRobotForm } = useRobot();
  const url = useParams();

  useEffect(() => {
    setItemCount(0);
  }, [sidebarState]);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      setLoading(false);
    };
  }, [reload]);

  function buttonTextGenerator() {
    switch (sidebarState?.isCreateMode) {
      case true:
        return "Cancel";
      case false:
        return `${
          sidebarState?.instanceTab === "Physical Instances" &&
          sidebarState?.page === "instance"
            ? "Add"
            : "Create"
        } ${(() => {
          if (sidebarState?.page === "instance") {
            if (sidebarState?.instanceTab === "Cloud Instances") {
              return "Cloud Instance";
            } else {
              return "Physical Instance";
            }
          }

          if (sidebarState?.page === "roboticscloud") {
            return "Region";
          }

          if (sidebarState?.page === "fleet" && envOnPremise) {
            return "Namespace";
          }

          if (sidebarState?.page === "robot" && envOnPremise) {
            return "Application";
          }

          return stringCapitalization({
            str: sidebarState?.page as string,
          });
        })()}`;
    }
  }

  function handleCreateButton() {
    if (sidebarState?.isCreateMode) {
      setSidebarState((prev: any) => ({
        ...prev,
        page:
          prev?.page === "workspacesmanager" ||
          prev?.page === "buildsmanager" ||
          prev?.page === "launchsmanager"
            ? "robot"
            : prev?.page,
        isCreateMode: false,
      }));
    } else {
      switch (sidebarState?.page) {
        case "roboticscloud":
          if (!selectedState?.organization) {
            setSidebarState((prev: any) => ({ ...prev, page: "organization" }));
            return toast.error(
              `If you want to create a region, you need to select an organization first.`
            );
          }
          break;
        case "instance":
          if (sidebarState?.instanceTab === "Cloud Instances") {
            if (!selectedState?.organization || !selectedState?.roboticsCloud) {
              setSidebarState((prev: any) => ({
                ...prev,
                page: !selectedState?.organization
                  ? "organization"
                  : "robotics cloud",
              }));
              return toast.error(
                `If you want to create a cloud instance, you need to select a ${
                  !selectedState?.organization
                    ? "organization"
                    : "robotics cloud"
                } first.`
              );
            }
          } else if (sidebarState?.instanceTab === "Physical Instances") {
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
                instanceTab: "Cloud Instances",
              }));

              return toast.error(
                `If you want to create a physical instance, you need to select a ${
                  !selectedState?.organization
                    ? "organization"
                    : !selectedState?.roboticsCloud
                    ? "robotics cloud"
                    : "instance"
                } first.`
              );
            }
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
              `If you want to create a fleet, you need to select a ${
                !selectedState?.organization
                  ? "organization"
                  : !selectedState?.roboticsCloud
                  ? "robotics cloud"
                  : "instance"
              } first.`
            );
          }
          break;
        case "robot":
          if (
            !selectedState?.organization ||
            !selectedState?.roboticsCloud ||
            !selectedState?.instance ||
            !selectedState?.fleet
          ) {
            setSidebarState((prev: any) => ({
              ...prev,
              page: !selectedState?.organization
                ? "organization"
                : !selectedState?.roboticsCloud
                ? "robotics cloud"
                : !selectedState?.instance
                ? "instance"
                : "fleet",
            }));
            return toast.error(
              `If you want to create a robot, you need to select a ${
                !selectedState?.organization
                  ? "organization"
                  : !selectedState?.roboticsCloud
                  ? "robotics cloud"
                  : !selectedState?.instance
                  ? "instance"
                  : "fleet"
              } first.`
            );
          } else {
            handleResetRobotForm();
          }
      }
      setSidebarState((prev: any) => ({
        ...prev,
        isCreateMode: true,
      }));
    }
  }

  function handleShowDetails() {
    if (
      !sidebarState.isCreateMode &&
      (sidebarState.page === "organization" ||
        sidebarState.page === "roboticscloud" ||
        sidebarState.page === "instance" ||
        sidebarState.page === "fleet" ||
        (sidebarState.page === "robot" && !url?.robotName))
    ) {
      return true;
    }
    return false;
  }

  return (
    <div
      className={`fixed flex flex-col justify-between left-20 w-[40rem] h-full bg-layer-light-50 shadow-2xl animate__animated animate__fadeInLeftBig animate__fast z-[32] border-r border-layer-light-200 rounded-r-lg ${
        url?.robotName || sidebarState?.isCreateMode ? "px-8 pt-8 pb-2" : "p-8"
      }`}
    >
      <SidebarContentHeader
        handleReload={() => {
          setReload(!reload);
        }}
        itemCount={itemCount}
        loading={loading}
        handleShowDetails={handleShowDetails}
      />
      {handleShowDetails() && <FilteredTags />}
      <div className={`h-full overflow-auto scrollbar-hide mb-4 p-1`}>
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
                if (sidebarState?.instanceTab === "Cloud Instances") {
                  if (sidebarState?.isCreateMode) {
                    return <CreateCloudInstancesForm />;
                  }
                  return (
                    <CloudInstancesList
                      reload={reload}
                      setItemCount={setItemCount}
                    />
                  );
                } else {
                  if (sidebarState?.isCreateMode) {
                    return <ConnectPhysicalInstanceForm />;
                  }
                  return (
                    <PhysicalInstancesList
                      reload={reload}
                      setItemCount={setItemCount}
                    />
                  );
                }
              case "fleet":
                if (sidebarState?.isCreateMode) {
                  return <CreateFleetForm />;
                }
                return (
                  <FleetsList reload={reload} setItemCount={setItemCount} />
                );
              case "robot":
                if (sidebarState?.isCreateMode) {
                  return <CreateRobotLayout />;
                }
                if (url?.robotName) {
                  return (
                    <UpdateRobotDetailsForm
                      reload={reload}
                      setItemCount={setItemCount}
                    />
                  );
                }
                return (
                  <RobotsList reload={reload} setItemCount={setItemCount} />
                );
              case "workspacesmanager":
                if (sidebarState?.isCreateMode) {
                  return <CreateRobotLayout />;
                }
                return (
                  <WorkspaceUpdateForm
                    reload={reload}
                    setItemCount={setItemCount}
                  />
                );
              case "buildsmanager":
                if (sidebarState?.isCreateMode) {
                  return <CreateRobotLayout />;
                }
                return (
                  <UpdateRobotBuildsForm
                    reload={reload}
                    setItemCount={setItemCount}
                  />
                );
              case "launchsmanager":
                if (sidebarState?.isCreateMode) {
                  return <CreateRobotLayout />;
                }
                return <UpdateRobotLaunchsForm />;
            }
          })()}
        </div>
      </div>
      {(() => {
        if (url.robotName) {
          return;
        }

        if (sidebarState?.isCreateMode) {
          return;
        }

        if (
          envOnPremise &&
          sidebarState?.page !== "fleet" &&
          sidebarState?.page !== "robot"
        ) {
          return;
        }

        if (
          sidebarState?.isCreateMode &&
          (sidebarState?.page === "robot" ||
            sidebarState?.page === "workspacesmanager" ||
            sidebarState?.page === "buildsmanager" ||
            sidebarState?.page === "launchsmanager")
        ) {
          return;
        }

        return (
          <Button
            className={`${
              sidebarState?.isCreateMode
                ? "!bg-layer-light-50 !text-layer-primary-700 hover:!bg-layer-primary-100 border border-layer-primary-700 mt-3 capitalize transition-all duration-500"
                : ""
            }`}
            text={buttonTextGenerator()}
            onClick={() => handleCreateButton()}
          />
        );
      })()}
    </div>
  );
}

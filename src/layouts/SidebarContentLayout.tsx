import { ReactElement, useEffect, useState } from "react";
import {
  envApplication,
  envCreateInstance,
  envCreateOrganization,
  envCreateRegion,
} from "../helpers/envProvider";
import UpdateEnvironmentDetailsForm from "../components/UpdateEnvironmentDetailsForm/UpdateEnvironmentDetailsForm";
import WorkspaceUpdateForm from "../components/UpdateRobotWorkspacesForm/UpdateRobotWorkspacesForm";
import UpdateRobotLaunchsForm from "../components/UpdateRobotLaunchsForm/UpdateRobotLaunchsForm";
import UpdateRobotDetailsForm from "../components/UpdateRobotDetailsForm/UpdateRobotDetailsForm";
import UpdateRobotBuildsForm from "../components/UpdateRobotBuildsForm/UpdateRobotBuildsForm";
import SidebarContentHeader from "../components/SidebarContentHeader/SidebarContentHeader";
import PhysicalInstancesList from "../components/SidebarLists/PhysicalInstancesList";
import CloudInstancesList from "../components/SidebarLists/CloudInstancesList";
import RoboticsCloudsList from "../components/SidebarLists/RoboticsCloudsList";
import OrganizationsList from "../components/SidebarLists/OrganizationsList";
import EnvironmentsList from "../components/SidebarLists/EnvironmentsList";
import NamespacesList from "../components/SidebarLists/NamespacesList";
import CFOrganization from "../components/CreateForms/CFOrganization";
import { stringCapitalization } from "../functions/GeneralFunctions";
import FilteredTags from "../components/FilteredTags/FilteredTags";
import RobotsList from "../components/SidebarLists/RobotsList";
import FleetsList from "../components/SidebarLists/FleetsList";
import CFNamespace from "../components/CreateForms/CFNamespace";
import CFInstance from "../components/CreateForms/CFInstance";
import CFPhysical from "../components/CreateForms/CFPhysical";
import CFRegion from "../components/CreateForms/CFRegion";
import CFFleet from "../components/CreateForms/CFFleet";
import useCreateRobot from "../hooks/useCreateRobot";
import CreateRobotLayout from "./CreateRobotLayout";
import Button from "../components/Button/Button";
import { useParams } from "react-router-dom";
import useMain from "../hooks/useMain";
import { toast } from "sonner";

export default function SidebarContentLayout(): ReactElement {
  const { sidebarState, setSidebarState, selectedState } = useMain();
  const [loading, setLoading] = useState<boolean>(false);
  const [itemCount, setItemCount] = useState<number>(0);
  const [reload, setReload] = useState<boolean>(false);
  const { handleResetRobotForm } = useCreateRobot();
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

  function buttonTextGenerator(): string {
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

          if (sidebarState?.page === "fleet" && envApplication) {
            return "Namespace";
          }

          if (sidebarState?.page === "robot" && envApplication) {
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
              `If you want to create a region, you need to select an organization first.`,
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
                } first.`,
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
                } first.`,
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
              } first.`,
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
              } first.`,
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

  function handleShowDetails(): boolean {
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
      className={`w-fill-available animate__animated animate__fadeInLeftBig animate__faster border-light-200 bg-light-50 fixed left-16 z-[32] flex h-full select-none flex-col justify-between rounded-r-xl border-r shadow-2xl md:w-[38rem] lg:left-20 ${
        url?.robotName || sidebarState?.isCreateMode ? "px-8 pb-2 pt-8" : "p-6"
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
      <div className={`mb-4 h-full overflow-auto p-1 scrollbar-hide`}>
        <div className="flex h-full flex-col gap-2.5">
          {(() => {
            switch (sidebarState?.page) {
              case "organization":
                if (sidebarState?.isCreateMode) {
                  return <CFOrganization />;
                }
                return (
                  <OrganizationsList
                    reload={reload}
                    setItemCount={setItemCount}
                  />
                );
              case "roboticscloud":
                if (sidebarState?.isCreateMode) {
                  return <CFRegion />;
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
                    return <CFInstance />;
                  }
                  return (
                    <CloudInstancesList
                      reload={reload}
                      setItemCount={setItemCount}
                    />
                  );
                } else {
                  if (sidebarState?.isCreateMode) {
                    return <CFPhysical />;
                  }
                  return (
                    <PhysicalInstancesList
                      reload={reload}
                      setItemCount={setItemCount}
                    />
                  );
                }
              case "fleet":
                switch (envApplication) {
                  case true:
                    if (sidebarState?.isCreateMode) {
                      return <CFNamespace />;
                    }

                    return (
                      <NamespacesList
                        reload={reload}
                        setItemCount={setItemCount}
                      />
                    );
                  case false:
                    if (sidebarState?.isCreateMode) {
                      return <CFFleet />;
                    }

                    return (
                      <FleetsList reload={reload} setItemCount={setItemCount} />
                    );
                }
                break;

              case "robot":
                if (sidebarState?.isCreateMode) {
                  return <CreateRobotLayout />;
                }
                if (url?.robotName) {
                  if (envApplication) {
                    return (
                      <UpdateEnvironmentDetailsForm
                        reload={reload}
                        setItemCount={setItemCount}
                      />
                    );
                  }

                  return (
                    <UpdateRobotDetailsForm
                      reload={reload}
                      setItemCount={setItemCount}
                    />
                  );
                }
                return envApplication ? (
                  <EnvironmentsList
                    reload={reload}
                    setItemCount={setItemCount}
                  />
                ) : (
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

        if (!envCreateOrganization && sidebarState?.page === "organization") {
          return;
        }

        if (!envCreateRegion && sidebarState?.page === "roboticscloud") {
          return;
        }

        if (
          !envCreateInstance &&
          sidebarState?.page === "instance" &&
          sidebarState?.instanceTab === "Cloud Instances"
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
            className={
              sidebarState?.isCreateMode
                ? "!bg-light-50 border-primary-700 !text-primary-700 hover:!bg-primary-100 mt-3 border capitalize transition-all duration-500"
                : ""
            }
            text={buttonTextGenerator()}
            onClick={() => handleCreateButton()}
          />
        );
      })()}
    </div>
  );
}

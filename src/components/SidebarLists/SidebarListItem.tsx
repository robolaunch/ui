import React, { ReactElement } from "react";
import organizationNameViewer from "../../helpers/organizationNameViewer";
import { useNavigate } from "react-router-dom";
import useSidebar from "../../hooks/useSidebar";
import { toast } from "sonner";

interface ISidebarListItem {
  name: string;
  description: string | ReactElement | ReactElement[];
  type: "organization" | "roboticscloud" | "instance" | "fleet" | "robot";
  url: string;
  data?: any;
  selected?: boolean;
  notSelectable?: boolean;
}

export default function SidebarListItem({
  name,
  description,
  type,
  url,
  data,
  selected,
  notSelectable,
}: ISidebarListItem): ReactElement {
  const { selectedState, setSelectedState, sidebarState, setSidebarState } =
    useSidebar();
  const navigate = useNavigate();

  const handleSelectItem = () => {
    switch (type) {
      case "organization":
        if (
          selectedState?.organization?.organizationName !==
          data?.organizationName
        ) {
          setSelectedState({ ...selectedState, organization: data });
          setSidebarState({ ...sidebarState, page: "roboticscloud" });
        }
        break;
      case "roboticscloud":
        if (selectedState?.roboticsCloud?.name === data?.name) {
          setSelectedState({
            ...selectedState,
            roboticsCloud: null,
            instance: null,
            fleet: null,
          });
          setSidebarState({ ...sidebarState, page: "organization" });
        } else {
          setSelectedState({ ...selectedState, roboticsCloud: data });
          setSidebarState({ ...sidebarState, page: "instance" });
        }
        break;
      case "instance":
        if (data?.instanceCloudState === "ConnectionHub_Ready") {
          if (selectedState?.instance?.name === data?.name) {
            setSelectedState({
              ...selectedState,
              instance: null,
              fleet: null,
            });
            setSidebarState({ ...sidebarState, page: "roboticscloud" });
          } else {
            setSelectedState({ ...selectedState, instance: data });
            setSidebarState({ ...sidebarState, page: "fleet" });
          }
        } else {
          toast.error(
            "Instance is not selectable now. Please try again later."
          );
        }
        break;
      case "fleet":
        if (
          data?.fleetStatus === "Ready" &&
          data?.physicalInstance?.length === 0
        ) {
          if (selectedState?.fleet?.name === data?.name) {
            setSelectedState({ ...selectedState, fleet: null });
            setSidebarState({ ...sidebarState, page: "instance" });
          } else {
            setSelectedState({ ...selectedState, fleet: data });
            setSidebarState({ ...sidebarState, page: "robot" });
          }
        } else {
          toast.error("Fleet is not selectable now. Please try again later.");
        }
        break;
      case "robot":
        navigate(
          `/${organizationNameViewer({
            organizationName: selectedState?.organization?.organizationName,
            capitalization: false,
          })}/${selectedState?.roboticsCloud?.name}/${
            selectedState?.instance?.name
          }/${selectedState?.fleet?.name}/${data?.name}`
        );
    }
  };

  return (
    <div
      key={name}
      className={`flex cursor-pointer animate__animated animate__fadeIn shadow border rounded-lg ${
        selected
          ? "border-layer-secondary-300 hover:border-layer-secondary-400"
          : "border-layer-primary-300 hover:border-layer-primary-400"
      } transition-300`}
    >
      <div
        onClick={() => handleSelectItem()}
        className={`w-full flex p-3 gap-4 border-r transition-300 ${
          selected
            ? "bg-layer-secondary-200 border-layer-secondary-600 hover:bg-layer-secondary-300"
            : "bg-layer-primary-200 border-layer-primary-600 hover:bg-layer-primary-300"
        } ${notSelectable && "!border-0"}`}
      >
        <img
          draggable="false"
          className="w-8"
          src={`/svg/general/${type}/${type}-${
            selected ? "blue" : "purple"
          }.svg`}
          alt=""
        />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">{name}</span>
          <span className="text-xs font-light">{description}</span>
        </div>
      </div>
      {!notSelectable && (
        <div
          onClick={() => {
            switch (type) {
              case "organization":
                setSelectedState({
                  ...selectedState,
                  organization: data,
                  roboticsCloud: null,
                  instance: null,
                  fleet: null,
                });
                break;
              case "roboticscloud":
                setSelectedState({
                  ...selectedState,
                  roboticsCloud: data,
                  instance: null,
                  fleet: null,
                });
                break;
              case "instance":
                setSelectedState({
                  ...selectedState,
                  instance: data,
                  fleet: null,
                });
                break;
              case "fleet":
                setSelectedState({ ...selectedState, fleet: data });
                break;
            }
            setSidebarState({ ...sidebarState, isOpen: false });
            navigate(url);
          }}
          className={`flex items-center justify-center px-4 rounded-r-lg transition-300 ${
            selected
              ? "bg-layer-secondary-200 hover:bg-layer-secondary-300"
              : "bg-layer-primary-200 hover:bg-layer-primary-300"
          } `}
        >
          <i
            className={`pi pi-angle-right transition-300 ${
              selected ? "text-layer-secondary-700" : "text-layer-primary-700"
            }`}
            style={{ fontSize: "1.25rem" }}
          />
        </div>
      )}
    </div>
  );
}

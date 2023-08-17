import React, { ReactElement } from "react";
import { organizationNameViewer } from "../../functions/GeneralFunctions";
import { useNavigate } from "react-router-dom";
import useMain from "../../hooks/useMain";
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
    useMain();
  const navigate = useNavigate();

  const handleSelectItem = () => {
    switch (type) {
      case "organization":
        if (
          selectedState?.organization?.organizationName ===
          data?.organizationName
        ) {
          setSelectedState({
            ...selectedState,
            organization: null,
            roboticsCloud: null,
            instance: null,
            fleet: null,
          });
        } else {
          setSelectedState({
            ...selectedState,
            organization: data,
            roboticsCloud: null,
            instance: null,
            fleet: null,
          });
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
        } else {
          setSelectedState({
            ...selectedState,
            roboticsCloud: data,
            instance: null,
            fleet: null,
          });
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
          } else {
            setSelectedState({ ...selectedState, instance: data, fleet: null });
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
          data?.namespaceStatus === "Active" ||
          (data?.fleetStatus === "Ready" &&
            data?.physicalInstance?.length === 0)
        ) {
          if (selectedState?.fleet?.name === data?.name) {
            setSelectedState({ ...selectedState, fleet: null });
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
      className={`flex cursor-pointer animate__animated animate__fadeIn  border rounded-lg hover:scale-[0.98] select-none ${
        selected
          ? "bg-layer-light-100 border-layer-light-400 shadow"
          : "bg-layer-light-50 border-layer-light-200 shadow-sm"
      } transition-300`}
    >
      <div
        onClick={() => handleSelectItem()}
        className={`w-full flex p-3 gap-4 rounded-l-lg border-r transition-300 ${
          selected
            ? "hover:bg-layer-light-200 border-layer-light-400"
            : "hover:bg-layer-light-100 border-layer-light-200"
        } ${notSelectable && "!border-0"}`}
      >
        <img
          draggable="false"
          className="w-8"
          src={`/svg/general/${type}/${type}-${selected ? "blue" : "gray"}.svg`}
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
                setSidebarState({ ...sidebarState, isOpen: false });
                navigate(url);
                break;
              case "roboticscloud":
                setSelectedState({
                  ...selectedState,
                  roboticsCloud: data,
                  instance: null,
                  fleet: null,
                });
                setSidebarState({ ...sidebarState, isOpen: false });
                navigate(url);
                break;
              case "instance":
                if (data?.instanceCloudState === "ConnectionHub_Ready") {
                  setSelectedState({
                    ...selectedState,
                    instance: data,
                    fleet: null,
                  });
                  setSidebarState({ ...sidebarState, isOpen: false });
                  navigate(url);
                } else {
                  toast.error(
                    "Instance is not selectable now. Please try again later."
                  );
                }
                break;
              case "fleet":
                if (
                  data?.fleetStatus === "Ready" ||
                  data?.namespaceStatus === "Active"
                ) {
                  setSelectedState({ ...selectedState, fleet: data });
                  setSidebarState({ ...sidebarState, isOpen: false });
                  navigate(url);
                } else {
                  toast.error(
                    "Fleet is not selectable now. Please try again later."
                  );
                }

                break;
            }
          }}
          className={`flex items-center justify-center px-4 rounded-r-lg transition-300 ${
            selected
              ? "hover:bg-layer-light-200 border-layer-light-400"
              : "hover:bg-layer-light-100 border-layer-light-100"
          } `}
        >
          <i
            className={`pi pi-angle-right transition-300 ${
              selected ? "text-layer-light-900" : "text-layer-light-700"
            }`}
            style={{ fontSize: "1.25rem" }}
          />
        </div>
      )}
    </div>
  );
}

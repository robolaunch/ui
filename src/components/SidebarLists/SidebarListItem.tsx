import React, { ReactElement } from "react";
import useSidebar from "../../hooks/useSidebar";
import { Link, useNavigate } from "react-router-dom";
import organizationNameViewer from "../../helpers/organizationNameViewer";

interface SidebarListItemProps {
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
}: SidebarListItemProps): ReactElement {
  const { selectedState, setSelectedState, sidebarState, setSidebarState } =
    useSidebar();
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
        } else {
          setSelectedState({ ...selectedState, roboticsCloud: data });
          setSidebarState({ ...sidebarState, page: "instance" });
        }
        break;
      case "instance":
        if (selectedState?.instance?.name === data?.name) {
          setSelectedState({ ...selectedState, instance: null, fleet: null });
        } else {
          setSelectedState({ ...selectedState, instance: data });
        }
        break;
      case "fleet":
        if (selectedState?.fleet?.name === data?.name) {
          setSelectedState({ ...selectedState, fleet: null });
        } else {
          setSelectedState({ ...selectedState, fleet: data });
          setSidebarState({ ...sidebarState, page: "robot" });
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
    <div key={name} className={`flex animate__animated animate__fadeIn`}>
      <div
        onClick={() => handleSelectItem()}
        className={`w-full cursor-pointer flex p-3 gap-4  border-r rounded-l-lg transition-all duration-300  ${
          selected
            ? "bg-layer-secondary-200 border-layer-secondary-600 hover:bg-layer-secondary-300"
            : "bg-layer-primary-200 border-layer-primary-600 hover:bg-layer-primary-300"
        } ${notSelectable && "!border-0 !rounded-lg"}`}
      >
        <img
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
        <Link
          onClick={() => setSidebarState({ ...sidebarState, isOpen: false })}
          to={url}
          className={`flex items-center justify-center px-4 rounded-r-lg transition-all duration-300 ${
            selected
              ? "bg-layer-secondary-200 hover:bg-layer-secondary-300"
              : "bg-layer-primary-200 hover:bg-layer-primary-300"
          } `}
        >
          <i
            className={`pi pi-angle-right transition-all duration-300 ${
              selected ? "text-layer-secondary-700" : "text-layer-primary-700"
            }`}
            style={{ fontSize: "1.25rem" }}
          />
        </Link>
      )}
    </div>
  );
}

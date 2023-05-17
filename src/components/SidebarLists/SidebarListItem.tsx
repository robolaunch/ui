import React, { ReactElement } from "react";
import useSidebar from "../../hooks/useSidebar";

interface SidebarListItemProps {
  name: string;
  description: string | ReactElement | ReactElement[];
  type: "organization" | "roboticscloud" | "instance" | "fleet" | "robot";
  url: string;
  data?: any;
  selected?: boolean;
  notSelectable?: boolean;
}

export const SidebarListItem = ({
  name,
  description,
  type,
  url,
  data,
  selected,
  notSelectable,
}: SidebarListItemProps) => {
  const { selectedState, setSelectedState } = useSidebar();

  const handleSelectItem = () => {
    switch (type) {
      case "organization":
        if (selectedState?.organization) {
          setSelectedState({ ...selectedState, organization: null });
        } else {
          setSelectedState({ ...selectedState, organization: data });
        }
        break;
      case "roboticscloud":
        if (selectedState?.roboticsCloud) {
          setSelectedState({ ...selectedState, roboticsCloud: null });
        } else {
          setSelectedState({ ...selectedState, roboticsCloud: data });
        }
    }
  };

  return (
    <div key={name} className="flex animate__animated animate__fadeIn">
      <div
        onClick={() => handleSelectItem()}
        className={`w-full cursor-pointer flex p-3 gap-4  border-r rounded-l-lg transition-all duration-300  ${
          selected
            ? "bg-layer-secondary-200 border-layer-secondary-600 hover:bg-layer-secondary-300"
            : "bg-layer-primary-200 border-layer-primary-600 hover:bg-layer-primary-300"
        }`}
      >
        <img
          className="w-8"
          src={`/svg/sidebar/${type}/${type}-${
            selected ? "blue" : "purple"
          }.svg`}
          alt=""
        />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">{name}</span>
          <span className="text-xs font-light">{description}</span>
        </div>
      </div>
      <a
        href={url}
        className={`flex items-center justify-center px-4 rounded-r-lg ${
          selected
            ? "bg-layer-secondary-200 hover:bg-layer-secondary-300"
            : "bg-layer-primary-200 hover:bg-layer-primary-300"
        } `}
      >
        <i
          className={`pi pi-angle-right ${
            selected ? "text-layer-secondary-700" : "text-layer-primary-700"
          }`}
          style={{ fontSize: "1.25rem" }}
        ></i>
      </a>
    </div>
  );
};

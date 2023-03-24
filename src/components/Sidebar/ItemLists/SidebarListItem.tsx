import React, { useContext } from "react";
import { SidebarContext } from "../../../contexts/SidebarContext";
import { toast } from "react-toastify";
import { toastifyProperties } from "../../../tools/Toastify";

interface SidebarListItemProps {
  name: string;
  description: string;
  type: string;
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
  const { selectedState, setSelectedState, setSidebarState }: any =
    useContext(SidebarContext);

  const handleSelectItem = () => {
    switch (type) {
      case "team":
        if (selectedState?.team?.name === data?.name) {
          setSelectedState({
            ...selectedState,
            team: null,
          });
        } else {
          setSelectedState({
            ...selectedState,
            team: data,
          });
          setSidebarState((sidebarState: any) => {
            return {
              ...sidebarState,
              page: "roboticscloud",
            };
          });
        }

        break;
      case "roboticscloud":
        if (selectedState?.team) {
          if (selectedState?.roboticscloud?.name === data?.name) {
            setSelectedState({
              ...selectedState,
              roboticscloud: null,
            });
          } else {
            setSelectedState({
              ...selectedState,
              roboticscloud: data,
            });
            setSidebarState((sidebarState: any) => {
              return {
                ...sidebarState,
                page: "fleet",
              };
            });
          }
        } else {
          toast.warning("Please select a team first.", toastifyProperties);
          setSidebarState((sidebarState: any) => {
            return {
              ...sidebarState,
              page: "team",
            };
          });
        }

        break;
      case "fleet":
        if (selectedState?.team) {
          if (selectedState?.roboticscloud) {
            if (selectedState.fleet === data) {
              setSelectedState({
                ...selectedState,
                fleet: null,
              });
            } else {
              setSelectedState({
                ...selectedState,
                fleet: data,
              });
            }
          } else {
            toast.warning(
              "Please select a robotics cloud first.",
              toastifyProperties
            );
            setSidebarState((sidebarState: any) => {
              return {
                ...sidebarState,
                page: "roboticscloud",
              };
            });
          }
        } else {
          toast.warning("Please select a team first.", toastifyProperties);
          setSidebarState((sidebarState: any) => {
            return {
              ...sidebarState,
              page: "team",
            };
          });
        }

        break;
    }
  };

  return (
    <div key={name} className="flex animate__animated animate__fadeIn">
      <div
        onClick={() => handleSelectItem()}
        className={`w-full cursor-pointer flex p-3 gap-4  border-r rounded-l-lg  ${
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
          <span className="text-sm font-semibold">{name}</span>
          <span className="text-xs">{description}</span>
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

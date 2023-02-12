import React, { useContext } from "react";
import { SidebarContext } from "../../../context/SidebarContext";

interface SidebarListItemProps {
  key: number;
  name: string;
  description: string;
  type: string;
  url: string;
  data?: any;
  selected?: boolean;
}

export const SidebarListItem = ({
  key,
  name,
  description,
  type,
  url,
  data,
  selected,
}: SidebarListItemProps) => {
  const { selectedState, setSelectedState }: any = useContext(SidebarContext);

  const handleSelectItem = () => {
    if (type === "team") {
      if (selectedState.team === data) {
        setSelectedState({
          ...selectedState,
          team: null,
        });
      } else {
        setSelectedState({
          ...selectedState,
          team: data,
        });
      }
    }
  };

  return (
    <div key={key} className="flex animate__animated animate__fadeIn">
      <div
        onClick={() => handleSelectItem()}
        className={`w-full cursor-pointer flex p-3 gap-4  border-r rounded-l-lg  ${
          selected
            ? "bg-secondaryLayers-200 border-secondaryLayers-600 hover:bg-secondaryLayers-300"
            : "bg-primaryLayers-200 border-primaryLayers-600 hover:bg-primaryLayers-300"
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
            ? "bg-secondaryLayers-200 hover:bg-secondaryLayers-300"
            : "bg-primaryLayers-200 hover:bg-primaryLayers-300"
        } `}
      >
        <i
          className={`pi pi-angle-right ${
            selected ? "text-secondaryLayers-700" : "text-primaryLayers-700"
          }`}
          style={{ fontSize: "1.25rem" }}
        ></i>
      </a>
    </div>
  );
};

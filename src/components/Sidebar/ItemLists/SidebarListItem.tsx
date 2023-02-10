import React from "react";

interface SidebarListItemProps {
  key: number;
  name: string;
  description: string;
  type: string;
  url: string;
}

export const SidebarListItem = ({
  key,
  name,
  description,
  type,
  url,
}: SidebarListItemProps) => {
  return (
    <div key={key} className="flex animate__animated animate__fadeIn">
      <div className="w-full cursor-pointer flex p-3 gap-4 bg-primaryLayers-200 border-r rounded-l-lg border-primaryLayers-600 hover:bg-primaryLayers-300">
        <img
          className="w-8"
          src={`/svg/sidebar/${type}/${type}-purple.svg`}
          alt=""
        />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">{name}</span>
          <span className="text-xs">{description}</span>
        </div>
      </div>
      <a
        href={url}
        className="flex items-center justify-center px-4 rounded-r-lg bg-primaryLayers-200 hover:bg-primaryLayers-300"
      >
        <i
          className="pi pi-angle-right text-primaryLayers-700"
          style={{ fontSize: "1.25rem" }}
        ></i>
      </a>
    </div>
  );
};

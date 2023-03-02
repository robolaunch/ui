import React, { ReactElement } from "react";
import { BiTrashAlt } from "react-icons/bi";

interface IWidgetLayout {
  id: number;
  type: string;
  title: any;
  children: ReactElement;
  icon: ReactElement;
  handleRemoveWidget: (id: number) => void;
}

export default function WidgetLayout({
  id,
  type,
  title,
  children,
  icon,
  handleRemoveWidget,
}: IWidgetLayout): ReactElement {
  return (
    <div
      id={type}
      className="flex flex-col gap-3 h-full bg-layer-light-50 rounded-lg p-2"
    >
      <div className="flex justify-between items-center gap-4 ">
        {icon}
        <span className="text-sm font-medium  text-layer-dark-700">
          {title}
        </span>
        <BiTrashAlt
          onClick={() => handleRemoveWidget(id)}
          size={24}
          className="text-layer-light-400"
        />
      </div>
      {children}
    </div>
  );
}

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
      className="flex flex-col gap-3 h-full bg-layer-light-50 rounded-lg p-4"
    >
      <div className="flex justify-between items-center gap-4 ">
        {icon}
        <span className="text-sm font-medium text-layer-dark-700">{title}</span>
        <BiTrashAlt
          onClick={() => handleRemoveWidget(id)}
          size={20}
          className="cursor-pointer text-layer-light-400 hover:text-layer-primary-400 hover:scale-90 transition-all duration-200"
        />
      </div>
      {children}
    </div>
  );
}

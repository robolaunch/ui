import React, { ReactElement, useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";

interface IRosWidgetLayout {
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
}: IRosWidgetLayout): ReactElement {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      item-id={id}
      id={type}
      className={`flex h-full flex-col rounded-lg border border-layer-light-200 ${
        isVisible ? "bg-transparent" : "bg-layer-light-50"
      }  `}
    >
      <div className="flex items-center justify-between gap-4 p-2">
        <div className={`${isVisible && "invisible"}`}>{icon}</div>
        <span
          className={`cursor-pointer text-sm font-medium text-layer-dark-300 ${
            isVisible && "hidden"
          }`}
        >
          {title}
        </span>
        <div className="flex gap-2">
          <AiOutlineEyeInvisible
            onClick={() => setIsVisible(!isVisible)}
            size={20}
            className="cursor-pointer text-layer-light-400 transition-all duration-200 hover:scale-90 hover:text-layer-primary-400"
          />
          <BiTrashAlt
            onClick={() => handleRemoveWidget(id)}
            size={20}
            className={`cursor-pointer text-layer-light-400 transition-all duration-200 hover:scale-90 hover:text-layer-primary-400 ${
              isVisible && "hidden"
            }`}
          />
        </div>
      </div>
      {children}
    </div>
  );
}

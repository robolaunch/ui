import React, { ReactElement, useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
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
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      item-id={id}
      id={type}
      className={`flex flex-col h-full rounded-lg ${
        isVisible ? "bg-transparent" : "bg-layer-light-50"
      }  `}
    >
      <div className="flex justify-between items-center gap-4 p-2">
        <div className={`${isVisible && "invisible"}`}>{icon}</div>
        <span
          className={`text-sm font-medium text-layer-dark-700 cursor-pointer ${
            isVisible && "hidden"
          }`}
        >
          {title}
        </span>
        <div className="flex gap-2">
          <AiOutlineEyeInvisible
            onClick={() => setIsVisible(!isVisible)}
            size={20}
            className="cursor-pointer text-layer-light-400 hover:text-layer-primary-400 hover:scale-90 transition-all duration-200"
          />
          <BiTrashAlt
            onClick={() => handleRemoveWidget(id)}
            size={20}
            className={`cursor-pointer text-layer-light-400 hover:text-layer-primary-400 hover:scale-90 transition-all duration-200 ${
              isVisible && "hidden"
            }`}
          />
        </div>
      </div>
      {children}
    </div>
  );
}

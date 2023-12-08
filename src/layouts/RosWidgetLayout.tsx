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
      className={`border-light-200 flex h-full flex-col rounded-lg border ${
        isVisible ? "bg-transparent" : "bg-light-50"
      }  `}
    >
      <div className="flex items-center justify-between gap-4 p-2">
        <div className={`${isVisible && "invisible"}`}>{icon}</div>
        <span
          className={`text-light-300 cursor-pointer text-sm font-medium ${
            isVisible && "hidden"
          }`}
        >
          {title}
        </span>
        <div className="flex gap-2">
          <AiOutlineEyeInvisible
            onClick={() => setIsVisible(!isVisible)}
            size={20}
            className="text-light-400 hover:text-primary-400 cursor-pointer transition-all duration-200 hover:scale-90"
          />
          <BiTrashAlt
            onClick={() => handleRemoveWidget(id)}
            size={20}
            className={`text-light-400 hover:text-primary-400 cursor-pointer transition-all duration-200 hover:scale-90 ${
              isVisible && "hidden"
            }`}
          />
        </div>
      </div>
      {children}
    </div>
  );
}

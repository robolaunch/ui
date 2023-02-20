import { ReactElement } from "react";

interface WidgetProps {
  icon?: ReactElement;
  title: string;
  subtitle?: string;
  children?: ReactElement | ReactElement[];
}

export default function Widget({
  icon,
  title,
  subtitle,
  children,
}: WidgetProps): ReactElement {
  return (
    <div className="flex flex-col shadow-lg rounded-lg bg-layer-light-50 h-full">
      <div
        id="widgetHeader"
        className="flex sm:flex-col sm:gap-2 justify-between items-center p-4 border-b border-layer-light-100"
      >
        <div className="flex  gap-2 items-center">
          {icon}
          <span className="font-semibold text-sm text-layer-light-800 ">
            {title}
          </span>
        </div>
        <span className="font-medium text-xs text-layer-dark-200">
          {subtitle}
        </span>
      </div>
      <div id="widgetBody" className=" px-2 pb-3 ">
        {children}
      </div>
    </div>
  );
}

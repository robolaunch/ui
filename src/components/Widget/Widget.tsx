import { ReactElement } from "react";

interface WidgetProps {
  icon?: ReactElement;
  title: string;
  subtitle?: string;
  children?: ReactElement | ReactElement[];
  options?: ReactElement;
}

export default function Widget({
  icon,
  title,
  subtitle,
  children,
  options,
}: WidgetProps): ReactElement {
  return (
    <div className="flex flex-col shadow-lg rounded-lg bg-layer-light-50 h-full">
      <div className="flex justify-between items-center p-4 border-b border-layer-light-100">
        {icon}
        <div className="flex flex-col items-center">
          <span className="font-semibold text-sm text-layer-light-800 ">
            {title}
          </span>
          <span className="font-medium text-xs text-layer-dark-200">
            {subtitle}
          </span>
        </div>
        <div>{options}</div>
      </div>
      <div id="widgetBody" className=" px-2 pb-1 ">
        {children}
      </div>
    </div>
  );
}

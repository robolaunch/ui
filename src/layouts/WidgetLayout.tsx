import { ReactElement } from "react";

interface WidgetLayoutProps {
  icon?: ReactElement;
  title: string;
  subtitle?: string;
  children?: ReactElement | ReactElement[];
  options?: ReactElement;
}

export default function WidgetLayout({
  icon,
  title,
  subtitle,
  children,
  options,
}: WidgetLayoutProps): ReactElement {
  return (
    <div
      className="flex flex-col shadow-lg rounded-lg bg-layer-light-50 h-full"
      style={{
        backgroundImage: `url("/images/abstract-white.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex justify-between items-center p-3 border-b border-layer-light-100">
        {icon}
        <div className="flex flex-col gap-1 items-center">
          <span className="font-semibold text-sm text-layer-dark-600 ">
            {title}
          </span>
          <span className="font-medium text-xs text-layer-dark-300">
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

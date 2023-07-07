import { ReactElement } from "react";

interface WidgetLayoutProps {
  icon?: ReactElement;
  title: string;
  subtitle?: string | ReactElement | ReactElement[];
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
      className="flex flex-col shadow-lg rounded-lg bg-layer-light-50 h-full animate__animated animate__fadeIn border border-layer-light-200"
      style={{
        backgroundImage: `url("/images/abstract-white.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex justify-between items-center p-4 border-b border-layer-light-100">
        {icon}
        <div className="flex flex-col gap-1 items-center">
          <span className="font-medium text-base text-layer-dark-600 ">
            {title}
          </span>
          <span className=" text-xs text-layer-dark-300">{subtitle}</span>
        </div>
        <div>{options}</div>
      </div>
      <div id="widgetBody" className="h-full px-8 pb-2 ">
        {children}
      </div>
    </div>
  );
}

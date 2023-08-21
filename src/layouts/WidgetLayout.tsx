import { ReactElement } from "react";

interface IWidgetLayout {
  icon?: ReactElement;
  title: string;
  subtitle?: string | ReactElement | ReactElement[];
  children?: ReactElement | ReactElement[];
  options?: ReactElement;
  className?: string;
}

export default function WidgetLayout({
  icon,
  title,
  subtitle,
  children,
  options,
  className,
}: IWidgetLayout): ReactElement {
  return (
    <div
      className="flex flex-col shadow-lg rounded-lg bg-layer-light-50 h-[21rem] animate__animated animate__fadeIn border border-layer-light-200"
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
          <span className="font-medium text-sm text-layer-dark-500">
            {title}
          </span>
          <span className="text-xs font-light text-layer-dark-400">
            {subtitle}
          </span>
        </div>
        <div>{options}</div>
      </div>
      <div id="widgetBody" className={`h-full px-8 pb-2 ${className}`}>
        {children}
      </div>
    </div>
  );
}

import { ReactElement } from "react";

interface IWidgetLayout {
  icon?: ReactElement;
  title: string;
  subtitle?: string | ReactElement | ReactElement[];
  children?: ReactElement | ReactElement[];
  options?: ReactElement;
  className?: string;
  dataTut?: string;
}

export default function WidgetLayout({
  icon,
  title,
  subtitle,
  children,
  options,
  className,
  dataTut,
}: IWidgetLayout): ReactElement {
  return (
    <div
      data-tut={dataTut}
      className="animate__animated animate__fadeIn flex h-80 flex-col rounded-lg border border-light-200 bg-light-50 shadow-md"
      style={{
        backgroundImage: `url("/images/abstract-white.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex items-center justify-between border-b border-light-100 p-4">
        {icon}
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-medium text-light-500">{title}</span>
          <span className="text-xs font-light text-light-400">{subtitle}</span>
        </div>
        <div>{options}</div>
      </div>
      <div id="widgetBody" className={`h-full w-full px-8 pb-2 ${className}`}>
        {children}
      </div>
    </div>
  );
}

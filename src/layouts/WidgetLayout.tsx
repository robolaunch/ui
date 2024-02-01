import { ReactElement } from "react";
import Card from "../components/Card/Card";

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
    <Card
      background
      dataTut={dataTut}
      className="animate-fadeIn flex !h-80 flex-col rounded-lg border border-light-200 bg-light-50 shadow-md"
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
    </Card>
  );
}

import { ReactElement } from "react";
import Card from "../Card/Card";

interface IInformationWidget {
  title: string;
  subtitle: string;
  component: ReactElement;
  className?: string;
}

export default function InformationWidget({
  title,
  subtitle,
  component,
  className,
}: IInformationWidget): ReactElement {
  return (
    <Card
      className={`animate-fadeIn flex h-80 w-full flex-col justify-around rounded-lg border border-light-200 bg-light-50 p-8 shadow-md ${className}`}
      background
    >
      <div className="flex flex-col gap-6">
        <span className="text-xl font-semibold text-light-900">{title}</span>
        <p className="text-xs !leading-6 text-light-500">{subtitle}</p>
      </div>
      {component}
    </Card>
  );
}

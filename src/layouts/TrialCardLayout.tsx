import React, { ReactElement } from "react";
import CardLayout from "./CardLayout";

interface ITrialCardLayout {
  title: string;
  children: ReactElement | ReactElement[];

  className?: string;
}

export default function TrialCardLayout({
  title,
  children,
  className,
}: ITrialCardLayout): ReactElement {
  return (
    <CardLayout className={`w-full h-full flex flex-col ${className} `}>
      <div className="flex justify-between items-center px-4 py-1.5 border-primary border-b mx-auto text-sm font-medium text-layer-dark-600 ">
        {title}
      </div>
      <div className="h-full w-full p-4">{children}</div>
    </CardLayout>
  );
}

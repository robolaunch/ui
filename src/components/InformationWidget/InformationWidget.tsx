import React, { ReactElement } from "react";

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
    <div
      data-tut="information-widget"
      className={`animate__animated animate__fadeIn border-light-200 bg-light-50 flex h-[21rem] w-full flex-col justify-around rounded-lg border p-8 shadow-md ${className}`}
      style={{
        backgroundImage: `url("/images/abstract-white.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col gap-6">
        <span className="text-light-600 text-2xl font-semibold ">{title}</span>
        <p className="text-light-500 text-xs !leading-6">{subtitle}</p>
      </div>
      {component}
    </div>
  );
}

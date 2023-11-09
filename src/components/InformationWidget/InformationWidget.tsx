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
      className={`animate__animated animate__fadeIn flex h-[21rem] w-full flex-col justify-around rounded-lg border border-layer-light-200 bg-layer-light-50 p-8 shadow-md ${className}`}
      style={{
        backgroundImage: `url("/images/abstract-white.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col gap-6">
        <span className="text-2xl font-semibold text-layer-dark-600 ">
          {title}
        </span>
        <p className="text-xs !leading-6 text-layer-dark-500">{subtitle}</p>
      </div>
      {component}
    </div>
  );
}

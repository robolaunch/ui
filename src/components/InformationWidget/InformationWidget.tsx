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
      className={`w-full flex flex-col justify-around rounded-lg bg-layer-light-50 shadow-lg p-8 animate__animated animate__fadeIn border border-layer-light-200 h-[21rem] ${className}`}
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
        <p className="text-xs text-layer-dark-500 !leading-6">{subtitle}</p>
      </div>
      {component}
    </div>
  );
}

import React, { ReactElement } from "react";

interface IInformationWidget {
  title: string;
  subtitle: string;
  actiontitle: string;
  component: ReactElement;
}

export default function InformationWidget({
  title,
  subtitle,
  actiontitle,
  component,
}: IInformationWidget): ReactElement {
  return (
    <div
      className="w-full h-full flex flex-col justify-around rounded-lg bg-layer-light-50 shadow-lg p-8"
      style={{
        backgroundImage: `url("/images/abstract-white.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col gap-6">
        <span className="text-2xl font-semibold text-layer-dark-600 ">
          {title} Page
        </span>
        <p className="text-xs text-layer-dark-500 !leading-6">{subtitle}</p>
      </div>
      <div className="flex flex-col gap-6 text-xs text-layer-dark-500 ">
        <p>{actiontitle}</p>
        {component}
      </div>
    </div>
  );
}

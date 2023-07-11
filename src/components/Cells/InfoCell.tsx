import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

interface IInfoCell {
  title: string;
  titleURL?: string;
  subtitle: string;
  onClick?: () => void;
}

export default function InfoCell({
  title,
  titleURL,
  subtitle,
  onClick,
}: IInfoCell): ReactElement {
  const iconComponent = (
    <div className="flex items-center justify-center font-bold h-10 w-10 text-sm bg-layer-primary-200 text-layer-primary-600 rounded-full uppercase">
      {title ? title[0] : ""}
    </div>
  );

  const titleComponent = <span className="text-sm font-semibold">{title}</span>;

  return (
    <div className="flex items-center gap-4">
      {onClick ? (
        <div className="cursor-pointer" onClick={() => onClick && onClick()}>
          {iconComponent}
        </div>
      ) : titleURL ? (
        <Link to={titleURL ? titleURL : "#"}>{iconComponent}</Link>
      ) : (
        <span className="cursor-default">{iconComponent}</span>
      )}
      <div className="flex flex-col gap-1">
        {onClick ? (
          <div className="cursor-pointer" onClick={() => onClick && onClick()}>
            {titleComponent}
          </div>
        ) : titleURL ? (
          <Link to={titleURL ? titleURL : "#"}>{titleComponent}</Link>
        ) : (
          <span className="cursor-default">{titleComponent}</span>
        )}
        <span className="text-xs">{subtitle}</span>
      </div>
    </div>
  );
}

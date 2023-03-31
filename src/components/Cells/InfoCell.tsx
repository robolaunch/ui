import React, { FC } from "react";
import { Link } from "react-router-dom";

interface InfoCellProps {
  title: string;
  titleURL?: string;
  subtitle: string;
}

export const InfoCell: FC<InfoCellProps> = ({
  title,
  titleURL,
  subtitle,
}: InfoCellProps) => {
  return (
    <div className="flex items-center gap-4">
      <Link to={titleURL ? titleURL : "#"}>
        <div className="flex items-center justify-center font-bold h-12 w-12 text-base bg-layer-primary-200 text-layer-primary-600 rounded-full">
          {title[0].toUpperCase()}
        </div>
      </Link>
      <div className="flex flex-col gap-1">
        <Link to={titleURL ? titleURL : "#"}>
          <span className="text-sm font-semibold">{title}</span>
        </Link>
        <span className="text-xs">{subtitle}</span>
      </div>
    </div>
  );
};

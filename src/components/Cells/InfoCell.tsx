import React, { FC } from "react";

interface InfoCellProps {
  title: string;
  subtitle: string;
}

export const InfoCell: FC<InfoCellProps> = ({
  title,
  subtitle,
}: InfoCellProps) => {
  console.log(title, subtitle);
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-center font-bold h-14 w-14 text-base bg-primaryLayers-200 text-primaryLayers-600 rounded-full">
        {title[0].toUpperCase()}
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">{title}</span>
        <span className="text-xs">{subtitle}</span>
      </div>
    </div>
  );
};

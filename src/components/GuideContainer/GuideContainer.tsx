import React, { ReactElement } from "react";

interface IGuideContainer {
  title: string;
  text: string;
}

export default function GuideContainer({
  title,
  text,
}: IGuideContainer): ReactElement {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-lg font-bold">{title}</span>
      <p className="text-sm font-medium ">{text}</p>
    </div>
  );
}

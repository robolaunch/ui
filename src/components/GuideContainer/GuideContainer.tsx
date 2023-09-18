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
      <span className="text-lg font-medium">{title}</span>
      <p className="text-sm">{text}</p>
    </div>
  );
}

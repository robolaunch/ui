import React, { ReactElement } from "react";

interface ITextwithTitle {
  title: string;
  text: string;
}

export default function TextwithTitle({
  title,
  text,
}: ITextwithTitle): ReactElement {
  return (
    <div className="flex gap-1 text-xs">
      <span className="font-medium">{title}</span>
      <span>{text}</span>
    </div>
  );
}

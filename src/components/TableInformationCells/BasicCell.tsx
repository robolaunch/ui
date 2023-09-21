import React from "react";

interface IBasicCell {
  text: string | number;
}

export default function BasicCell({ text }: IBasicCell) {
  return <div className="px-2 text-xs">{text}</div>;
}

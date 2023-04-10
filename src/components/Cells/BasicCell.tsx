import React from "react";

interface IBasicCell {
  text: string | number;
}

export default function BasicCell({ text }: IBasicCell) {
  return <div className="text-xs">{text}</div>;
}

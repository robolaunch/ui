import React, { ReactElement } from "react";

interface ICreateRobotFormDeleteButton {
  onClick: () => void;
  text: string;
}

export default function CreateRobotFormDeleteButton({
  onClick,
  text,
}: ICreateRobotFormDeleteButton): ReactElement {
  return (
    <span
      onClick={onClick}
      className="text-[0.68rem] font-semibold text-red-500 cursor-pointer mx-auto hover:underline"
    >
      {text}
    </span>
  );
}

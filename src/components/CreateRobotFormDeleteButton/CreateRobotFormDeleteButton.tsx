import React, { ReactElement } from "react";

interface ICreateRobotFormDeleteButton {
  onClick: () => void;
  text: string;
  disabled?: boolean;
}

export default function CreateRobotFormDeleteButton({
  onClick,
  text,
  disabled,
}: ICreateRobotFormDeleteButton): ReactElement {
  return (
    <span
      onClick={disabled ? () => {} : onClick}
      className={`text-[0.68rem] font-semibold cursor-pointer mx-auto  ${
        disabled
          ? "text-layer-light-600 hover:cursor-not-allowed"
          : "text-red-500 hover:underline"
      }`}
    >
      {text}
    </span>
  );
}

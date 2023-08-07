import React, { ReactElement } from "react";
import { BsPlusCircle } from "react-icons/bs";

interface ICreateRobotFormAddButton {
  onClick: () => void;
  description?: string;
  disabled?: boolean;
}

export default function CreateRobotFormAddButton({
  onClick,
  description,
  disabled,
}: ICreateRobotFormAddButton): ReactElement {
  return (
    <BsPlusCircle
      title={description}
      onClick={disabled ? () => {} : onClick}
      size={22}
      className={`mx-auto transition-all duration-500 cursor-pointer mt-4 animate__animated animate__fadeIn ${
        disabled
          ? "text-layer-light-600 hover:cursor-not-allowed"
          : "text-layer-primary-700 hover:text-layer-primary-500 hover:scale-90"
      }`}
    />
  );
}

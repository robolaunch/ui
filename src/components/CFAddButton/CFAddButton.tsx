import React, { ReactElement } from "react";
import { BsPlusCircle } from "react-icons/bs";

interface ICFAddButton {
  onClick: () => void;
  description?: string;
  disabled?: boolean;
  className?: string;
  size?: number;
}

export default function CFAddButton({
  onClick,
  description,
  disabled,
  className,
  size,
}: ICFAddButton): ReactElement {
  return (
    <BsPlusCircle
      title={description}
      onClick={disabled ? () => {} : onClick}
      size={size || 18}
      className={`animate-fadeIn mx-auto mt-4 cursor-pointer transition-all duration-500 ${
        disabled
          ? "text-light-600 hover:cursor-not-allowed"
          : "text-primary-700 hover:scale-90 hover:text-primary-500"
      } ${className}`}
    />
  );
}

import React, { ReactElement } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  text: any;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  type,
  text,
  onClick,
  loading,
  disabled,
  className,
}: ButtonProps): ReactElement {
  return (
    <button
      type={type || "button"}
      disabled={disabled}
      onClick={() => (onClick ? onClick() : null)}
      className={`w-full h-12 flex items-center justify-center bg-primary hover:bg-layer-primary-700 active:bg-purple-900 focus:ring-4 focus:ring-layer-primary-300 disabled:bg-layer-primary-400 font-medium text-white rounded-md transition-300 hover:scale-[0.99] text-xs ${className}`}
    >
      {loading ? (
        <i
          className="pi pi-spin pi-spinner"
          style={{ fontSize: "1.25rem" }}
        ></i>
      ) : (
        text
      )}
    </button>
  );
}

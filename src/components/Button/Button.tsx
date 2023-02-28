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
      className={`w-full h-12 bg-primary hover:bg-layer-primary-700 active:bg-purple-900 focus:ring-4 focus:ring-layer-primary-300 disabled:bg-layer-primary-400 text-sm font-medium text-white rounded-md transition-all ${className}`}
    >
      {loading ? (
        <i className="pi pi-spin pi-spinner" style={{ fontSize: "1.5rem" }}></i>
      ) : (
        text
      )}
    </button>
  );
}

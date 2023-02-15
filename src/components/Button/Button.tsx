import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const Button = ({
  type,
  text,
  onClick,
  loading,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={() => (onClick ? onClick() : null)}
      className="w-full h-10 bg-primary hover:bg-layer-primary-700 active:bg-purple-900 focus:ring-4 focus:ring-layer-primary-300 disabled:bg-layer-primary-400 text-sm font-semibold text-white rounded-md transition-all"
    >
      {loading ? (
        <i className="pi pi-spin pi-spinner" style={{ fontSize: "1.5rem" }}></i>
      ) : (
        text
      )}
    </button>
  );
};

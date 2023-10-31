import React, { ReactElement } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  text: any;
  onClick?: () => void;
  loading?: boolean | null;
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
      className={`transition-300 flex h-12 w-full items-center justify-center rounded-md bg-primary text-xs font-medium text-white hover:scale-[0.99] hover:bg-layer-primary-700 focus:ring-4 focus:ring-layer-primary-300 active:bg-purple-900 disabled:bg-layer-primary-400 ${className}`}
    >
      {loading ? (
        <img
          className="h-10 w-10"
          src="/svg/general/loading.svg"
          alt="loading"
        />
      ) : (
        text
      )}
    </button>
  );
}

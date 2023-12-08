import React, { ReactElement } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  text: any;
  onClick?: () => void;
  loading?: boolean | null;
  disabled?: boolean;
  className?: string;
  tooltip?: string;
}

export default function Button({
  type,
  text,
  onClick,
  loading,
  disabled,
  className,
  tooltip,
}: ButtonProps): ReactElement {
  return (
    <button
      title={tooltip}
      type={type || "button"}
      disabled={disabled}
      onClick={() => (onClick ? onClick() : null)}
      className={`transition-300 bg-primary-500 hover:bg-primary-700 focus:ring-primary-300 disabled:bg-primary-400 flex h-12 w-full items-center justify-center rounded-md text-xs font-medium text-white hover:scale-[0.99] focus:ring-4 active:bg-purple-900 ${className}`}
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
